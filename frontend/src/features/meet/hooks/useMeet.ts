import { useSocket } from "@/shared/hooks/useSocket";
import { Participant } from "@/shared/types/participant";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { useMeetService } from "../services/meet";
import { useUserTemporalStore } from "@/shared/store/userTemporalStore";
import { useMeetStore } from "@/shared/store/meetStore";
import { toast } from "react-hot-toast";
import { CALL_STATUS } from "@/features/calls/constants";

export const useMeet = () => {
  const { id: call_id } = useParams();
  const meetService = useMeetService();
  const router = useRouter();
  const userTemporalStore = useUserTemporalStore();
  const meetStore = useMeetStore();
  const [socketId, setSocketId] = useState<string>("");
  const socket = useSocket("http://localhost:3001");
  const [participants, setParticipants] = useState<Participant[]>([]);
  const hasInitiated = useRef(false);
  const hasJoined = useRef(false);
  const [hold, setHold] = useState(false);
  const [enabledButtonHold, setEnabledButtonHold] = useState(false);
  const [enabledButtonEnd, setEnabledButtonEnd] = useState(false);
  const [startTime, setStartTime] = useState<Date>();
  const [meetStatus, setMeetStatus] = useState<string | null>(null);

  useEffect(() => {
    if (!socket.current?.id) return;
    setSocketId(socket.current.id);
  }, [participants]);

  const displayName = useMemo(
    () => userTemporalStore.name || "",
    [userTemporalStore.name]
  );

  const meet = useMemo(() => {
    return {
      call_id,
      name: displayName,
      socket_id: socketId,
      type: meetStore.type,
      queue_id: meetStore.queueId,
      photo_url: userTemporalStore.photo_url,
    };
  }, [
    call_id,
    displayName,
    socketId,
    meetStore.type,
    meetStore.queueId,
    userTemporalStore.photo_url,
  ]);

  useEffect(() => {
    if (!socket.current || hasJoined.current) return;

    const sc = socket.current;

    const handleConnect = () => {
      sc.emit("join", { call_id, name: displayName });
      hasJoined.current = true;
    };

    sc.on("connect", handleConnect);

    sc.on("participant_joined", (participant) => {
      setParticipants((prev) => [...prev, participant]);
    });

    sc.on("refresh_meet", (data) => {
      setParticipants(data);
    });

    sc.on("left", (socketId) => {
      setParticipants((prev) => prev.filter((p) => p.socket_id !== socketId));
    });

    sc.on("toggle_hold", (data) => {
      setHold(data);
    });

    sc.on("notify_hold_exceeded", () => {
      toast.error("Se ha agotado el tiempo de espera");
    });

    sc.on("call_ended", (data) => {
      router.push(`/meet/completed`);
    });

    return () => {
      sc.off("connect", handleConnect);
      sc.off("notify_hold_exceeded");
    };
  }, [socket.current, call_id, displayName]);

  const toggleMute = () => {
    socket.current?.emit("toggle_mute");
  };

  const toggleCamera = () => {
    socket.current?.emit("toggle_camera");
  };

  const toggleHold = () => {
    socket.current?.emit("call_hold", {
      hold_duration: 45,
    });
  };

  const endCall = () => {
    if (!startTime) return;

    const duration = Math.floor((Date.now() - startTime.getTime()) / 1000);

    socket.current?.emit("call_ended", {
      end_reason: "completed",
      duration,
    });

    router.push("/calls");
  };

  useEffect(() => {
    if (!socketId || participants.length === 0) {
      setEnabledButtonHold(false);
      return;
    }

    const me = participants.find((p) => p.socket_id === socketId);

    if (me) {
      setEnabledButtonHold(me.is_host);
      setEnabledButtonEnd(me.is_host);
    } else {
      setEnabledButtonHold(false);
      setEnabledButtonEnd(false);
    }
  }, [socketId, participants]);

  useEffect(() => {
    if (!meet.call_id) return;

    meetService
      .get(meet.call_id as string)
      .then((data) => {
        if (data.status === CALL_STATUS.ENDED) {
          router.push("/meet");
          return;
        }

        setStartTime(new Date(data.start_time));
        setMeetStatus(data.status);
      })
      .catch(() => {
        router.push("/meet");
      });
  }, [meet.call_id]);

  useEffect(() => {
    const isReady =
      !!meet.call_id &&
      !!meet.name &&
      !!meet.socket_id &&
      !!meet.type &&
      !!meet.queue_id;

    if (!isReady || !socket.current || hasInitiated.current) return;

    if (!meetStatus) {
      socket.current?.emit("call_initiated", {
        queue_id: meet.queue_id,
        type: meet.type,
        call_id: meet.call_id,
      });
      hasInitiated.current = true;
    }
  }, [meet, socket.current]);

  return {
    participants,
    socketId,
    hold,
    enabledButtonHold,
    enabledButtonEnd,
    endCall,
    toggleHold,
    toggleMute,
    toggleCamera,
  };
};
