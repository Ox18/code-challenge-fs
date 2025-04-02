import {LoginRequestDTO, MeResponseDTO, RegisterRequestDTO} from "../schemas/auth.schema";

export interface AuthService {
  login(data: LoginRequestDTO): Promise<string>;
  me(authId: string): Promise<MeResponseDTO>;
  register(data: RegisterRequestDTO): Promise<string>
}
