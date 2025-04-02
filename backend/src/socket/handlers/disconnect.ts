import {agents, io, meets, participants} from "..";
import {Socket} from "socket.io";
import {Meet} from "../types";

export class DisconnectHandler {
  constructor() {}

  async execute(socket: Socket) {
    const socketId = socket.id;

    const agent = agents.find((agent) => agent.socket_id === socketId);

    if (agent) {
      agents.splice(agents.indexOf(agent), 1);
    }

    const myParticipants = participants.filter((participant) => participant.socket_id === socketId);

    const myMeets: Meet[] = [];

    myParticipants.forEach((participant) => {
      const meet = meets.find((meet) => meet.call.id === participant.meet_id);

      if (meet) {
        myMeets.push(meet);
      }
    });

    myParticipants.forEach((participant) => {
      participants.splice(participants.indexOf(participant), 1);
    });

    myMeets.forEach((meet) => {
      const participantsFromMeet = participants.filter(
        (participant) => participant.meet_id === meet.call.id,
      );
      const ids = participantsFromMeet.map((participant) => participant.socket_id);
      io.to(ids).emit("left", socketId);
    });
  }
}
