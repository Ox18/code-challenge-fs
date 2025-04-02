import { httpClient } from "@/shared/utils/httpClient";
import { Call, CallsRequest } from "../types";

export const useCallsService = () => {
  const getAll = async (data?: CallsRequest): Promise<Call[]> =>
    httpClient.get("/calls", { params: data });

  return {
    getAll,
  };
};
