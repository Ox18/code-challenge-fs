import { CallEvent } from "../../../domain/models/callEvent";

export interface callEventService {
    get(callId: string): Promise<CallEvent[]>
}