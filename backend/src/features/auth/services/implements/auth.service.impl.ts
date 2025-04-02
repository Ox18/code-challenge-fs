import {AgentsRepository} from "../../../../domain/repositories/agents.repository";
import {JWT} from "../../../../shared/utils/jwt";
import {LoginInvalidException} from "../../exceptions/LoginInvalid.exception";
import {CredentialsRepository} from "../../repositories/credentials.repository";
import {LoginRequestDTO, MeResponseDTO, RegisterRequestDTO} from "../../schemas/auth.schema";
import {AuthService} from "../auth.service";
import {SupportException} from "../../../../shared/exceptions/support.exception";
import {EmailAlReadyExistException} from "../../../../features/auth/exceptions/EmailAlReadyExist.exception";
import {RandomUserProvider} from "features/auth/providers/randomuser.provider";

export class AuthServiceImpl implements AuthService {
  constructor(
    private readonly credentialsRepository: CredentialsRepository,
    private readonly agentsRepository: AgentsRepository,
    private readonly randomuserProvider: RandomUserProvider,
  ) {}

  async login(data: LoginRequestDTO): Promise<string> {
    const credential = await this.credentialsRepository.findByEmail(data.email);

    if (!credential) {
      throw new LoginInvalidException();
    }

    if (credential.password !== data.password) {
      throw new LoginInvalidException();
    }

    const payload = {
      id: credential.id,
    };

    return JWT.sign(payload);
  }

  async me(authId: string): Promise<MeResponseDTO> {
    const agent = await this.agentsRepository.findByAuthId(authId);

    if (!agent) {
      throw new SupportException();
    }

    return {
      name: agent.name,
      photo_url: agent.photo_url,
    };
  }

  async register(data: RegisterRequestDTO): Promise<string> {
    const credentialByEmail = await this.credentialsRepository.findByEmail(data.email);

    if (credentialByEmail) {
      throw new EmailAlReadyExistException();
    }

    const credential = await this.credentialsRepository.create(data);

    const randomUserResponse = await this.randomuserProvider.get();

    const randomUser = randomUserResponse.results[0];

    await this.agentsRepository.create({
      name: randomUser.name.first + " " + randomUser.name.last,
      photo_url: randomUser.picture.large,
      auth_id: credential.id,
      queue_id: data.queue_id,
    });

    const payload = {
      id: credential.id,
    };

    return JWT.sign(payload);
  }
}
