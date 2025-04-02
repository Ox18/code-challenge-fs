import {CallEvent} from "../../../../domain/models/callEvent";
import {callEventService} from "../callEvent.service";
import {CallEventRepository} from "../../../../domain/repositories/callEvent.repository";

export class CallEventServiceImpl implements callEventService {
  constructor(private readonly callEventRepository: CallEventRepository) {}

  async get(callId: string): Promise<CallEvent[]> {
    return this.callEventRepository.getEvents({call_id: callId});
  }
}
