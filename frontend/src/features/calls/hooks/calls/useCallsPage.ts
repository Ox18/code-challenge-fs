import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCalls } from "./useCalls";
import { useSocket } from "@/shared/hooks/useSocket";
import { useQueues } from "@/shared/hooks/useQueues";
import { useCallsStore } from "../../store/callsStore";
import { useCallEvent } from "../useCallEvent";

export const useCallsPage = () => {
  const router = useRouter();
  const socket = useSocket("http://localhost:3001");
  const { calls, loading } = useCalls();
  const [showInvitation, setShowInvitation] = useState(false);
  const callEvent = useCallEvent();
  const callStore = useCallsStore();
  const { queues } = useQueues();

  const closeInvitation = () => {
    setShowInvitation(false);
  };

  const accept = () => {
    socket.current?.emit("call_answered", {
      wait_time: 25,
    });
  };

  useEffect(() => {
    socket.current?.on("call_routed", (data) => {
      setShowInvitation(true);
    });

    socket.current?.on("change_to_meet", (data) => {
      router.push(`/meet/${data.call_id}`);
    });

    socket.current?.on("dashboard_update_call", (data) => {
      callStore.replaceOrAdd(data);
    });

    socket.current?.emit("agent_connected");
  }, []);

  const clickRow = (id: string) => {
    callEvent.fetch(id);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleString();
  };

  const data = useMemo(() => {
    return calls.map((item) => {
      return {
        id: item.id,
        status: item.status,
        queue: queues.find((queue) => queue.id === item.queue_id)?.name,
        start_time: formatDate(new Date(item.start_time)),
        end_time: item.end_time ? formatDate(new Date(item.end_time)) : "-",
      };
    });
  }, [calls]);

  return {
    calls,
    loading,
    showInvitation,
    data,
    accept,
    closeInvitation,
    clickRow,
  };
};
