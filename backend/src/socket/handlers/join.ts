import {Socket} from "socket.io";
import {io, meets, participants} from "../";
import {HandlerRequest, Meet, Participant} from "../types";
import {CallsRepository} from "../../domain/repositories/calls.repository";
import {AgentsRepository} from "../../domain/repositories/agents.repository";
import {JWT} from "../../shared/utils/jwt";
import {STATUS_CALL} from "../../shared/consts/statusCalls";

type JoinRequest = HandlerRequest & {
  call_id: string;
  name: string;
};

export class JoinHandler {
  constructor(
    private readonly callsRepository: CallsRepository,
    private readonly agentsRepository: AgentsRepository,
  ) {}
  async execute(socket: Socket, data: JoinRequest) {
    const call = await this.callsRepository.findById({id: data.call_id});

    if (!call) {
      return;
    }

    if (call.status === STATUS_CALL.ENDED) {
      return;
    }

    const participant: Participant = {
      socket_id: socket.id,
      is_host: false,
      name: data.name,
      photo_url:
        "https://st4.depositphotos.com/7877830/25337/v/450/depositphotos_253374286-stock-illustration-vector-illustration-male-doctor-avatar.jpg",
      meet_id: data.call_id,
      is_muted: true,
      is_camera_on: false,
    };

    const token = socket.handshake.auth.token;

    if (token) {
      const session = JWT.decode<{id: string}>(token);

      const agent = await this.agentsRepository.findByAuthId(session.id);

      if (agent) {
        participant.photo_url = agent.photo_url;
        participant.name = agent.name;
        participant.is_host = true;
      }
    }

    const meet = meets.find((meet) => meet?.call?.id === data.call_id);

    if (!meet) {
      const newMeet: Meet = {
        call,
        hold: false,
      };
      meets.push(newMeet);
    }

    participants.push(participant);

    const participantsFromMeet = participants.filter(
      (participant) => participant.meet_id === data.call_id,
    );

    const idsParticipantFromMeet = participantsFromMeet.map((participant) => participant.socket_id);

    io.to(idsParticipantFromMeet).emit("refresh_meet", participantsFromMeet);

    socket.emit("toggle_hold", meet?.hold);
  }
}
