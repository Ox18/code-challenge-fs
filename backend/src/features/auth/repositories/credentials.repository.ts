import {Credential} from "../domain/credential";
import {CreateRequestDTO} from "../schemas/auth.schema";

export interface CredentialsRepository {
  findByEmail(email: string): Promise<Credential | null>;
  create(credential: CreateRequestDTO): Promise<Credential>;
}
