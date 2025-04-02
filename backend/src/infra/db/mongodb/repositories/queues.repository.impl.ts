import {Queeu} from "domain/models/queue";
import {QueuesRepository} from "../../../../domain/repositories/queues.repository";
import {MongoClientDB} from "../client";
import {ObjectId} from "mongodb";

export class QueuesRepositoryImpl implements QueuesRepository {
  async getAll(): Promise<Queeu[]> {
    const queuesCollection = MongoClientDB.getCollection("queues");
    const queues = await queuesCollection.find().toArray();

    return MongoClientDB.mapCollection(queues);
  }

  async findById(id: string): Promise<Queeu | null> {
    const queuesCollection = MongoClientDB.getCollection("queues");

    const queue = await queuesCollection.findOne({
      _id: new ObjectId(id),
    });

    return queue ? MongoClientDB.mapOne(queue) : null;
  }
}
