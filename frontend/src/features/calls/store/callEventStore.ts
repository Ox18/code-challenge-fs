import { create } from "zustand";
import { CallEvent } from "../types";

interface CallEventStore {
  events: CallEvent[];
  loading: boolean;
  isOpen: boolean;
  setEvents: (events: CallEvent[]) => void;
  setLoading: (loading: boolean) => void;
  setIsOpen: (isOpen: boolean) => void;
}

export const useCallEventStore = create<CallEventStore>((set) => ({
  events: [],
  loading: false,
  isOpen: false,
  setEvents: (events) => set({ events }),
  setLoading: (loading) => set({ loading }),
  setIsOpen: (isOpen) => set({ isOpen }),
}));
