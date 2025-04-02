import {CallsRepository} from "../../domain/repositories/calls.repository";
import {QueuesRepository} from "../../domain/repositories/queues.repository";
import {Socket} from "socket.io";
import {HandlerRequest} from "../types";
import {STATUS_CALL} from "../../shared/consts/statusCalls";
import {agents, io} from "../";
import {CLIENT_EVENTS} from "../consts/events";
import {CallEventRepository} from "../../domain/repositories/callEvent.repository";
import {CallInitiatedSchema} from "../../socket/schemas/callInitiated.schema";

type CallInitiatedRequest = HandlerRequest & {
  call_id: string;
  type: string;
  queue_id: string;
};

export class CallInitiatedHandler {
  constructor(
    private readonly queuesRepository: QueuesRepository,
    private readonly callsRepository: CallsRepository,
    private readonly callEventRepository: CallEventRepository,
  ) {}

  async execute(socket: Socket, data: CallInitiatedRequest) {
    const validatedSchema = CallInitiatedSchema.safeParse(data);

    if (!validatedSchema.success) {
      socket.disconnect();
      return;
    }

    const queue = await this.queuesRepository.findById(data.queue_id);
    if (!queue) return;

    await this.callsRepository.update(data.call_id, {
      status: STATUS_CALL.WAITING,
      start_time: new Date(),
    });

    const call = await this.callsRepository.findById({id: data.call_id});

    await this.callEventRepository.create({
      call_id: data.call_id,
      type: "call_initiated",
      metadata: {
        type: data.type,
        queue_id: data.queue_id,
      },
    });

    io.emit(CLIENT_EVENTS.DASHBOARD_UPDATE_CALL, {
      ...call,
      status: STATUS_CALL.WAITING,
    });

    const slaStart = Date.now();
    const SLA_LIMIT = 30 * 1000;
    const AGENT_TIMEOUT = 15 * 1000;

    const agentsByQueue = agents.filter((agent) => agent.queue_id === queue.id);

    for (const agent of agentsByQueue) {
      const now = Date.now();
      const totalElapsed = now - slaStart;

      if (totalElapsed > SLA_LIMIT) {
        io.emit("sla_violation", {call_id: data.call_id});
        return;
      }

      const agentSocket = io.sockets.sockets.get(agent.socket_id);
      if (!agentSocket) continue;

      const routingStart = Date.now();

      const routing_time = Math.floor((Date.now() - routingStart) / 1000);

      agentSocket.emit("call_routed", {
        call_id: data.call_id,
        agent_id: agent.id,
        routing_time,
      });

      await this.callEventRepository.create({
        call_id: data.call_id,
        type: "call_routed",
        metadata: {
          agent_id: agent.id,
          routing_time,
        },
      });

      const agentAccepted = await this.waitForAgentToAccept(agentSocket, AGENT_TIMEOUT);

      if (agentAccepted) {
        await this.callEventRepository.create({
          call_id: data.call_id,
          type: "call_answered",
          metadata: {
            agent_id: agent.id,
          },
        });

        await this.callsRepository.update(data.call_id, {
          status: STATUS_CALL.ACTIVE,
        });

        io.emit(CLIENT_EVENTS.DASHBOARD_UPDATE_CALL, {
          ...call,
          status: STATUS_CALL.ACTIVE,
        });

        agentSocket.emit("change_to_meet", {
          call_id: data.call_id,
        });

        return;
      }
    }

    io.emit("sla_violation", {call_id: data.call_id});
  }

  waitForAgentToAccept(socket: Socket, timeout: number): Promise<boolean> {
    return new Promise((resolve) => {
      const handler = (payload: any) => {
        socket.off("call_answered", handler);
        resolve(true);
      };

      socket.on("call_answered", handler);

      setTimeout(() => {
        socket.off("call_answered", handler);
        resolve(false);
      }, timeout);
    });
  }
}
