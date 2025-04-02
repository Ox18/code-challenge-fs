import { create } from "zustand";
import { Queue } from "../types/queues";

interface QueuesStore {
  queues: Queue[];
  loading: boolean;
  setQueues: (queues: Queue[]) => void;
  setLoading: (loading: boolean) => void;
}

export const useQueuesStore = create<QueuesStore>((set) => ({
  queues: [],
  loading: false,
  setQueues: (queues) => set({ queues }),
  setLoading: (loading) => set({ loading }),
}));
