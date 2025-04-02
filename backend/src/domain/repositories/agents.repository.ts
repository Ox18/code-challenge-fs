import {Agent} from "../models/agent";

export interface AgentsRepository {
  findByAuthId(authId: string): Promise<Agent | null>;
  create(agent: Partial<Agent>): Promise<void>;
}
