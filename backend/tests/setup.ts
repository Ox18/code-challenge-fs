import {MongoMemoryServer} from "mongodb-memory-server";
import {MongoClientDB} from "../src/infra/db/mongodb/client";
import credentials from "./data/calls.credentials.json";
import callEvents from "./data/calls.call_events.json";
import queues from "./data/calls.queues.json";
import calls from "./data/calls.calls.json";

let mongo: MongoMemoryServer;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  await MongoClientDB.connect(uri);

  await MongoClientDB.getCollection("credentials").insertMany(credentials);
  await MongoClientDB.getCollection("call_events").insertMany(callEvents);
  await MongoClientDB.getCollection("queues").insertMany(queues);
  await MongoClientDB.getCollection("calls").insertMany(calls);
});

afterAll(async () => {
  await MongoClientDB.disconnect();
  await mongo.stop();
});
