import { create } from "zustand";
import { persist } from "zustand/middleware";

interface MeetStore {
  callId: string;
  type: string;
  queueId: string;
  setCallId: (callId: string) => void;
  setType: (type: string) => void;
  setQueueId: (queueId: string) => void;
}

export const useMeetStore = create<MeetStore>()(
  persist(
    (set) => ({
      callId: "",
      type: "",
      queueId: "",
      setCallId: (callId: string) => set({ callId }),
      setType: (type: string) => set({ type }),
      setQueueId: (queueId: string) => set({ queueId }),
    }),
    {
      name: "meet",
    }
  )
);
