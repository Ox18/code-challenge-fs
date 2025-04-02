import {CreateRequestDTO} from "features/auth/schemas/auth.schema";
import {MongoClientDB} from "../../../../infra/db/mongodb/client";
import {Credential} from "../../domain/credential";
import {CredentialsRepository} from "../credentials.repository";

export class CredentialsRepositoryImpl implements CredentialsRepository {
  async findByEmail(email: string): Promise<Credential | null> {
    const credential = await MongoClientDB.getCollection("credentials").findOne({email});

    if (!credential) {
      return null;
    }

    return MongoClientDB.mapOne(credential);
  }

  async create(data: CreateRequestDTO): Promise<Credential> {
    await MongoClientDB.getCollection("credentials").insertOne(data);

    const credential = await MongoClientDB.getCollection("credentials").findOne({email: data.email});

    return MongoClientDB.mapOne(credential);
  }
}
