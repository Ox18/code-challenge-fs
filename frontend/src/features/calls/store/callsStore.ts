import { create } from "zustand";
import { Call } from "../types";

interface CallsStore {
  calls: Call[];
  loading: boolean;
  setCalls: (calls: Call[]) => void;
  setLoading: (loading: boolean) => void;
  replaceOrAdd: (call: Call) => void;
}

export const useCallsStore = create<CallsStore>((set) => ({
  calls: [],
  loading: false,
  setCalls: (calls) => set({ calls }),
  setLoading: (loading) => set({ loading }),
  replaceOrAdd: (call: Call) => {
    set((state) => {
      const exists = state.calls.some((c) => c.id === call.id);
  
      return {
        calls: exists
          ? state.calls.map((c) => (c.id === call.id ? call : c))
          : [...state.calls, call],
      };
    });
  }
}));
