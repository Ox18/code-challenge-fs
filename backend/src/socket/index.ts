import "./events/listeners/onParticipantJoined";
import "./events/listeners/onLeftMeet";
import "./events/listeners/onRefreshMeet";

import {Server} from "socket.io";
import http from "http";
import {Agent, Meet, Participant} from "./types";
import {JoinHandler} from "./handlers/join";
import {CallsRepositoryImpl} from "../infra/db/mongodb/repositories/calls.repository.impl";
import {DisconnectHandler} from "./handlers/disconnect";
import {ToggleMuteHandler} from "./handlers/toggleMute";
import {ToggleCameraHandler} from "./handlers/toggleCamera";
import {CallInitiatedHandler} from "./handlers/callInitiated";
import {QueuesRepositoryImpl} from "../infra/db/mongodb/repositories/queues.repository.impl";
import {handleError} from "./middlewares/handleError";
import {AgentConnectedHandler} from "./handlers/agentConnected";
import {AgentsRepositoryImpl} from "../infra/db/mongodb/repositories/agents.repository.impl";
import {HoldHandler} from "./handlers/hold";
import {CallEndedHandler} from "./handlers/callEnded";
import {CallEventRepositoryImpl} from "../infra/db/mongodb/repositories/callEvent.repository.impl";

export let io: Server;
export let meets: Meet[] = [];
export let participants: Participant[] = [];
export let agents: Agent[] = [];

const callsRepository = new CallsRepositoryImpl();
const queuesRepository = new QueuesRepositoryImpl();
const agentsRepository = new AgentsRepositoryImpl();
const callEventRepository = new CallEventRepositoryImpl();

const joinHandler = new JoinHandler(callsRepository, agentsRepository);
const disconnectHandler = new DisconnectHandler();
const toggleMuteHandler = new ToggleMuteHandler();
const toggleCameraHandler = new ToggleCameraHandler();
const callInitiatedHandle = new CallInitiatedHandler(
  queuesRepository,
  callsRepository,
  callEventRepository,
);
const agentConnected = new AgentConnectedHandler(agentsRepository);
const hold = new HoldHandler(callsRepository, callEventRepository);
const callEndedHandler = new CallEndedHandler(callsRepository, callEventRepository);

export const setupSocket = (server: http.Server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    socket.on("disconnect", handleError(socket, disconnectHandler));
    socket.on("join", handleError(socket, joinHandler));
    socket.on("toggle_mute", handleError(socket, toggleMuteHandler));
    socket.on("toggle_camera", handleError(socket, toggleCameraHandler));
    socket.on("call_initiated", handleError(socket, callInitiatedHandle));
    socket.on("agent_connected", handleError(socket, agentConnected));
    socket.on("call_hold", handleError(socket, hold));
    socket.on("call_ended", handleError(socket, callEndedHandler));
  });
};
