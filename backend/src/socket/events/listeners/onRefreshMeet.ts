import {Listener} from "../../types";
import {meetEvents} from "../meetEventEmitter";
import {io, meets, participants} from "../../";

type RefreshMeet = Listener & {
  call_id: string;
};

meetEvents.on("refresh_meet", (data: RefreshMeet) => {
  const meet = meets.find((meet) => meet.call.id === data.call_id);

  const participantsFromMeet = participants.filter(
    (participant) => participant.meet_id === meet?.call.id,
  );

  const socketIds = participants.map((participant) => participant.socket_id);

  io.to(socketIds).emit("refresh_meet", participantsFromMeet);
});
