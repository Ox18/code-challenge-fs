import {CreateMeetRequestDTO, GetMeetResponseDTO} from "../schemas/meet.schema";

export interface MeetService {
  create(data: CreateMeetRequestDTO): Promise<string>;
  get(meetId: string): Promise<GetMeetResponseDTO>;
}
