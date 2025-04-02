import {QueuesRepository} from "domain/repositories/queues.repository";
import {MeetService} from "../meet.service";
import {
  CreateMeetRequestDTO,
  GetMeetResponseDTO,
} from "../../../../features/meet/schemas/meet.schema";
import {CallsRepository} from "../../../../domain/repositories/calls.repository";
import {InvalidResourceException} from "../../../../features/meet/exceptions/InvalidResourceException";

export class MeetServiceImpl implements MeetService {
  constructor(
    private readonly queueRepository: QueuesRepository,
    private readonly callsRepository: CallsRepository,
  ) {}

  async create(data: CreateMeetRequestDTO): Promise<string> {
    const call = await this.callsRepository.create(data);

    return call.id;
  }

  async get(callId: string): Promise<GetMeetResponseDTO> {
    const call = await this.callsRepository.findById({id: callId});

    if (!call) {
      throw new InvalidResourceException();
    }

    return {
      status: call.status ?? null,
      start_time: call.start_time ?? null,
    };
  }
}
