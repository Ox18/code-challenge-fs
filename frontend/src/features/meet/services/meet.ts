import { httpClient } from "@/shared/utils/httpClient";
import { CreateMeetRequest, GetMeetResponse } from "../types";

export const useMeetService = () => {
  const create = async (data: CreateMeetRequest): Promise<string> =>
    httpClient.post("/meet", data);

  const get = async (id: string): Promise<GetMeetResponse> =>
    httpClient.get(`/meet/${id}`);

  return {
    create,
    get,
  };
};
