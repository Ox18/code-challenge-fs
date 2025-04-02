import {Request} from "express";

export interface Session {
  auth_id: string;
}

export type HttpRequest = Request & { session: Session };