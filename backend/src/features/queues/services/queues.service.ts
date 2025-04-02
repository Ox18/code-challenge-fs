import {Queeu} from "domain/models/queue";

export interface QueuesService {
  getAll(): Promise<Queeu[]>;
}
