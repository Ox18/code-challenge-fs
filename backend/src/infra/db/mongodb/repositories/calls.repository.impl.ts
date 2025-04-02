import {ObjectId} from "mongodb";
import {
  CallsRepository,
  Create,
  FindById,
  GetCalls,
} from "../../../../domain/repositories/calls.repository";
import {MongoClientDB} from "../client";
import {Call} from "../../../../domain/models/call";
import {ResourceNotFoundException} from "../../../../shared/exceptions/resourceNotFound.exception";

export class CallsRepositoryImpl implements CallsRepository {
  async getCalls(params: GetCalls.Params): Promise<GetCalls.Result> {
    const callsCollection = MongoClientDB.getCollection("calls");

    const filter: Record<string, any> = {};

    if (params.status) {
      filter.status = Array.isArray(params.status) ? {$in: params.status} : params.status;
    }

    if (params.queue) {
      filter.queue_id = Array.isArray(params.queue) ? {$in: params.queue} : params.queue;
    }

    const calls = await callsCollection.find(filter).toArray();

    return MongoClientDB.mapCollection(calls);
  }
  async create(params: Create.Params): Promise<Create.Result> {
    const callsCollection = MongoClientDB.getCollection("calls");

    const record = await callsCollection.insertOne({
      queue_id: params.queue_id,
      start_time: null,
      end_time: null,
    });

    const recordedCall = await callsCollection.findOne({
      _id: record.insertedId,
    });

    return MongoClientDB.mapOne(recordedCall);
  }

  async findById(params: FindById.Params): Promise<FindById.Result> {
    const callsCollection = MongoClientDB.getCollection("calls");

    const call = await callsCollection.findOne({
      _id: new ObjectId(params.id),
    });

    return call ? MongoClientDB.mapOne(call) : null;
  }

  async update(id: string, data: Partial<Call>): Promise<void> {
    const callsCollection = MongoClientDB.getCollection("calls");

    const call = await callsCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!call) {
      throw new ResourceNotFoundException();
    }

    await callsCollection.updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: data,
      },
    );
  }
}
