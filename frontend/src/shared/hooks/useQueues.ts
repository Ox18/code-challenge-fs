"use client"
import { useEffect } from "react";
import { useQueuesStore } from "../store/queuesStore";
import { useQueuesService } from "../services/queues";

export const useQueues = () => {
  const queuesStore = useQueuesStore();
  const queuesService = useQueuesService();

  useEffect(() => {
    if (queuesStore.queues.length === 0) {
      queuesStore.setLoading(true);
      queuesService
        .getAll()
        .then((queues) => {
          queuesStore.setQueues(queues);
          queuesStore.setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          queuesStore.setLoading(false);
        });
    }
  }, []);

  return {
    queues: queuesStore.queues,
    loading: queuesStore.loading,
    setQueues: queuesStore.setQueues,
    setLoading: queuesStore.setLoading,
  };
};
