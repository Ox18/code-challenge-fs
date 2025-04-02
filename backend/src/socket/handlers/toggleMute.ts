import {meets, participants} from "../";
import {Socket} from "socket.io";
import {meetEvents} from "../events/meetEventEmitter";

export class ToggleMuteHandler {
  constructor() {}

  async execute(socket: Socket) {
    // const participant = participants.find((participant) => participant.socket_id === socket.id);

    // const meet = meets.find((meet) => meet.call.id === participant?.meet_id);

    // if (!meet) {
    //   return;
    // }

    // participants.forEach((participant) => {
    //   if (participant.meet_id === meet.call.id && participant.socket_id === socket.id) {
    //     participant.is_muted = !participant.is_muted;
    //   }
    // });

    // meetEvents.emit("refresh_meet", {
    //   socket,
    //   participant,
    // });
  }
}
