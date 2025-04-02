import {agents} from "../";
import {AgentsRepository} from "../../domain/repositories/agents.repository";
import {JWT} from "../../shared/utils/jwt";
import {Socket} from "socket.io";

export class AgentConnectedHandler {
  constructor(private readonly agentsRepository: AgentsRepository) {}

  async execute(socket: Socket) {
    const token = socket.handshake.auth.token;

    if (!token) {
      return;
    }

    JWT.verify(token);

    const session = JWT.decode<{id: string}>(token);

    const agent = await this.agentsRepository.findByAuthId(session.id);

    if (!agent) {
      return;
    }

    const existInAgents = agents.find((a) => a.id === agent.id);

    if (existInAgents) {
      existInAgents.socket_id = socket.id;
    } else {
      agents.push({
        id: agent.id,
        socket_id: socket.id,
        available: true,
        queue_id: agent.queue_id ?? "",
        name: agent.name,
        photo_url: agent.photo_url,
      });
    }
  }
}
