import {RandomUserResponseDTO} from "../schemas/randomuser.schema";

export interface RandomUserProvider {
  get(): Promise<RandomUserResponseDTO>;
}
