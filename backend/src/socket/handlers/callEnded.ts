import {CallsRepository} from "../../domain/repositories/calls.repository";
import {io, meets, participants} from "../";
import {Socket} from "socket.io";
import {STATUS_CALL} from "../../shared/consts/statusCalls";
import {CLIENT_EVENTS} from "../consts/events";
import {CallEventRepository} from "domain/repositories/callEvent.repository";

type CallEndedRequest = {
  end_reason: string;
  duration: number;
};

export class CallEndedHandler {
  constructor(
    private readonly callsRepository: CallsRepository,
    private readonly callEventRepository: CallEventRepository,
  ) {}

  async execute(socket: Socket, data: CallEndedRequest) {
    const participant = participants.find((participant) => participant.socket_id === socket.id);

    if (!participant) {
      return;
    }

    const meet = meets.find((meet) => meet.call.id === participant.meet_id);

    if (!meet) {
      return;
    }

    const call = await this.callsRepository.findById({id: meet.call.id});

    if (!call) {
      return;
    }

    const endTime = new Date(call.start_time.getTime() + data.duration * 1000);

    await this.callsRepository.update(meet.call.id, {
      status: STATUS_CALL.ENDED,
      end_time: endTime,
    });

    await this.callEventRepository.create({
      call_id: meet.call.id,
      type: "call_ended",
      metadata: {
        end_reason: data.end_reason,
        duration: data.duration,
      },
    });

    io.emit(CLIENT_EVENTS.DASHBOARD_UPDATE_CALL, {
      ...call,
      status: STATUS_CALL.ENDED,
      end_time: endTime,
    });

    const participantsFromMeet = participants
      .filter((participant) => participant.meet_id === meet.call.id)
      .filter((participant) => participant.socket_id !== socket.id);

    io.to(participantsFromMeet.map((participant) => participant.socket_id)).emit("call_ended");

    participantsFromMeet.forEach((participant) => {
      participants.splice(participants.indexOf(participant), 1);
    });
  }
}
