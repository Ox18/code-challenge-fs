import {Agent} from "../../../../domain/models/agent";
import {AgentsRepository} from "../../../../domain/repositories/agents.repository";
import {MongoClientDB} from "../client";

export class AgentsRepositoryImpl implements AgentsRepository {
  async findByAuthId(authId: string): Promise<Agent | null> {
    const agent = await MongoClientDB.getCollection("agents").findOne({auth_id: authId});

    return agent ? MongoClientDB.mapOne(agent) : null;
  }

  async create(agent: Partial<Agent>): Promise<void> {
    await MongoClientDB.getCollection("agents").insertOne(agent);
  }
}
