import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserTemporalStore {
  name: string;
  photo_url: string;
  setName: (name: string) => void;
  setPhoto_url: (photo_url: string) => void;
}

export const useUserTemporalStore = create<UserTemporalStore>()(
  persist(
    (set) => ({
      name: "",
      photo_url:
        "https://media.istockphoto.com/id/1171169099/es/foto/hombre-con-brazos-cruzados-aislados-sobre-fondo-gris.jpg?s=612x612&w=0&k=20&c=8qDLKdLMm2i8DHXY6crX6a5omVh2IxqrOxJV2QGzgFg=",
      setName: (name: string) => set({ name }),
      setPhoto_url: (photo_url: string) => set({ photo_url }),
    }),
    {
      name: "user-temporal-storage",
    }
  )
);
