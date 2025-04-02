import { httpClient } from "@/shared/utils/httpClient";
import { CallEvent } from "../types";

export const useCallEventService = () => {
  const get = async (callId: string): Promise<CallEvent[]> =>
    httpClient.get(`/calls/${callId}/events`);

  return {
    get,
  };
};
