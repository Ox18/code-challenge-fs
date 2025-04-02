import axios, {AxiosInstance} from "axios";
import {RandomUserResponseDTO} from "../../schemas/randomuser.schema";
import {RandomUserProvider} from "../randomuser.provider";

export class RandomUserProviderImpl implements RandomUserProvider {
  private httpClient: AxiosInstance;

  constructor() {
    this.httpClient = axios.create({
      baseURL: "https://randomuser.me/api/",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async get(): Promise<RandomUserResponseDTO> {
    try {
      const response = await this.httpClient.get<RandomUserResponseDTO>("/");
      return response.data;
    } catch (error) {
      console.error("Error fetching random user:", error);
      throw new Error("No se pudo obtener un usuario aleatorio");
    }
  }
}
