import {Socket} from "socket.io";
import {Call} from "../domain/models/call";

export type Meet = {
  call: Call;
  hold: boolean;
};

export type Participant = {
  socket_id: string;
  is_host: boolean;
  agent_id?: string;
  name: string;
  photo_url: string;
  meet_id?: string;
  is_muted: boolean;
  is_camera_on: boolean;
};

export type Session = {
  auth_id: string;
};

export type Listener = {
  socket: Socket;
  participant: Participant;
};

export type HandlerRequest = {
  socket: Socket;
};

export type Agent = {
  id: string;
  socket_id: string;
  available: boolean;
  queue_id: string;
  name: string;
  photo_url: string;
};

export type Handler<T = any> = {
  execute: (socket: Socket, data?: T) => Promise<void> | void;
};
