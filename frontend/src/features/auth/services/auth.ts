import { Login, Me, Register, RegisterRequest } from "@/shared/types/auth";
import { httpClient } from "@/shared/utils/httpClient";

export const useAuthService = () => {
  const login = (email: string, password: string): Promise<Login> =>
    httpClient.post("/auth/login", { email, password });

  const register = (data: RegisterRequest): Promise<Register> =>
    httpClient.post("/auth/register", data);

  const me = (): Promise<Me> => httpClient.get("/auth/me");

  return {
    login,
    register,
    me,
  };
};
