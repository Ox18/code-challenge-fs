import {Queeu} from "domain/models/queue";

export interface QueuesRepository {
  getAll(): Promise<Queeu[]>;
  findById(id: string): Promise<Queeu | null>;
}
