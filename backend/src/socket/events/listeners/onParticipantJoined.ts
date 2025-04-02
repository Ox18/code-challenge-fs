import {io, participants} from "../../";
import {meetEvents} from "../meetEventEmitter";

meetEvents.on("participant_joined", ({socket, meetId, participant}) => {
  const participantsFromMeet = participants.filter((participant) => participant.meet_id === meetId);


  const ids = participantsFromMeet.map((participant) => participant.socket_id);

  io.to(ids).emit("participant_joined", participant);
});
