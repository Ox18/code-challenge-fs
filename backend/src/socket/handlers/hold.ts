import {CallsRepository} from "../../domain/repositories/calls.repository";
import {io, meets, participants} from "../";
import {Socket} from "socket.io";
import {STATUS_CALL} from "../../shared/consts/statusCalls";
import {CLIENT_EVENTS} from "../consts/events";
import {CallEventRepository} from "domain/repositories/callEvent.repository";

export class HoldHandler {
  constructor(
    private readonly callsRepository: CallsRepository,
    private readonly callEventRepository: CallEventRepository,
  ) {}

  async execute(socket: Socket) {
    const socketId = socket.id;

    const participant = participants.find((participant) => participant.socket_id === socketId);

    if (!participant) {
      return;
    }

    const meet = meets.find((meet) => meet.call.id === participant.meet_id);

    if (!meet) {
      return;
    }

    meet.hold = !meet.hold;

    const call = await this.callsRepository.findById({id: meet.call.id});

    const newStatus = meet.hold ? STATUS_CALL.ON_HOLD : STATUS_CALL.ACTIVE;

    await this.callsRepository.update(meet.call.id, {
      status: newStatus,
    });

    await this.callEventRepository.create({
      call_id: meet.call.id,
      type: "hold",
      metadata: {
        hold_duration: meet.hold ? Date.now() : null,
      },
    });

    io.emit(CLIENT_EVENTS.DASHBOARD_UPDATE_CALL, {
      ...call,
      status: newStatus,
    });

    const participantsFromMeet = participants.filter(
      (participant) => participant.meet_id === participant.meet_id,
    );

    const ids = participantsFromMeet.map((participant) => participant.socket_id);

    io.to(ids).emit("toggle_hold", meet.hold);

    if (meet.hold) {
      const isChanged = await this.waitForChangeHold(socket, 60000);

      if (!isChanged) {
        socket.emit("notify_hold_exceeded", false);
      }
    }
  }

  waitForChangeHold(socket: Socket, timeout: number): Promise<boolean> {
    return new Promise((resolve) => {
      const handler = (payload: any) => {
        socket.off("toggle_hold", handler);
        resolve(true);
      };

      socket.on("toggle_hold", handler);

      setTimeout(() => {
        socket.off("toggle_hold", handler);
        resolve(false);
      }, timeout);
    });
  }
}
