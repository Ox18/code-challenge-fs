import {CallEventRepository, CreateCallEvent, GetCallEvents} from "../../../../domain/repositories/callEvent.repository";
import {MongoClientDB} from "../client";
import { CallEvent } from "../../../../domain/models/callEvent";

export class CallEventRepositoryImpl implements CallEventRepository {
  async create(data: CreateCallEvent.Params): Promise<void> {
    await MongoClientDB.getCollection("call_events").insertOne({
      ...data,
      timestamp: new Date(),
    });
  }

  async getEvents(params: GetCallEvents.Params): Promise<CallEvent[]> {
    const events = await MongoClientDB.getCollection("call_events").find({
      call_id: params.call_id,
    }).toArray();

    return MongoClientDB.mapCollection(events);
  }
}
