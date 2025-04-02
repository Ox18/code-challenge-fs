import { CallEvent } from "../models/callEvent";

export interface CallEventRepository {
  create(data: CreateCallEvent.Params): Promise<void>;
  getEvents(params: GetCallEvents.Params): Promise<CallEvent[]>
}

export namespace CreateCallEvent {
  export type Params = {
    call_id: string;
    type: string;
    metadata?: Record<string, any>;
  };
}

export namespace GetCallEvents {
  export type Params = {
    call_id: string;
  };
}