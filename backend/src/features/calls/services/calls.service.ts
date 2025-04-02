import { Call } from "../../../domain/models/call";
import {CreateCallRequestDTO, GetCallsRequestDTO} from "../schemas/calls.schema";

export interface CallsService {
  getCalls: (data: GetCallsRequestDTO) => Promise<Call[]>;
  create: (data: CreateCallRequestDTO) => Promise<Call>;
}
