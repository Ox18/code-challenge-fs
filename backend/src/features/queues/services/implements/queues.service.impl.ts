import {Queeu} from "domain/models/queue";
import {QueuesService} from "../queues.service";
import {QueuesRepository} from "../../../../domain/repositories/queues.repository";

export class QueuesServiceImpl implements QueuesService {
  constructor(private readonly queuesRepository: QueuesRepository) {}

  getAll(): Promise<Queeu[]> {
    return this.queuesRepository.getAll();
  }
}
