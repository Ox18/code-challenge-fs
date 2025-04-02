import {Call} from "../../../../domain/models/call";
import {CreateCallRequestDTO, GetCallsRequestDTO} from "../../schemas/calls.schema";
import {CallsService} from "../calls.service";
import {CallsRepository} from "../../../../domain/repositories/calls.repository";
import {QueuesRepository} from "../../../../domain/repositories/queues.repository";
import {ResourceNotFoundException} from "../../../../shared/exceptions/resourceNotFound.exception";

export class CallsServiceImpl implements CallsService {
  constructor(
    private readonly callsRepository: CallsRepository,
    private readonly queuesRepository: QueuesRepository,
  ) {}

  async getCalls(data: GetCallsRequestDTO): Promise<Call[]> {
    const items = await this.callsRepository.getCalls(data);

    return items;
  }

  async create(data: CreateCallRequestDTO): Promise<Call> {
    const queue = await this.queuesRepository.findById(data.queue_id);


    if (!queue) {
      throw new ResourceNotFoundException();
    }

    const item = await this.callsRepository.create(data);

    return item;
  }
}
