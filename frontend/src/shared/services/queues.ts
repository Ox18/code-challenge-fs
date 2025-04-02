import { Queue } from "../types/queues";
import { httpClient } from "../utils/httpClient";

export const useQueuesService = () => {
  const getAll = async (): Promise<Queue[]> => httpClient.get("/queues");

  return {
    getAll,
  };
};
