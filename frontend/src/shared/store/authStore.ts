import { create } from "zustand";
import { Me } from "../types/auth";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  me: Me | null;
  setToken: (token: string | null) => void;
  setMe: (me: Me | null) => void;
  reset: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  token: null,
  isAuthenticated: false,
  me: null,
  setToken: (token) => set({ token, isAuthenticated: !!token }),
  setMe: (me) => set({ me }),
  reset: () => set({ token: null, me: null, isAuthenticated: false }),
}));
