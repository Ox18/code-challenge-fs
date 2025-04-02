import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/authStore";
import { setCookie } from "../utils/cookie";

export const useAuth = () => {
  const router = useRouter()
  const authStore = useAuthStore();

  const setToken = (newToken: string) => {
    setCookie("token", newToken);
  };

  const logout = () => {
    document.cookie = "token=; path=/; max-age=0";
    router.push("/auth/login");
  };

  return {
    token: authStore.token,
    isAuthenticated: authStore.isAuthenticated,
    me: authStore.me,
    setToken,
    setMe: authStore.setMe,
    logout,
  };
};
