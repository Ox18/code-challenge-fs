import request from "supertest";
import {setupApp} from "../../src/app";
import {credentials} from "../__mocks__/credentials";
import {MongoClientDB} from "../../src/infra/db/mongodb/client"; // ajustá la ruta

describe("GET /calls/:id/events", () => {
  const app = setupApp();

  let token: string;
  let queueId: string;

  beforeAll(async () => {
    const result = await MongoClientDB.getCollection("queues").insertOne({
      name: "medical_spanish",
      description: "Test queue for medical interpreters",
    });
    queueId = result.insertedId.toHexString();

    const loginResponse = await request(app)
      .post("/api/auth/login")
      .set("Authorization", `Bearer ${token}`)
      .send(credentials);

    token = loginResponse.body.token;
  });

  it("Debe retornar un 200 y un array", async () => {
    const callId = "67eda6d16bf03d62960d349c";

    const response = await request(app)
      .get(`/api/calls/${callId}/events`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it("Crear un call", async () => {
    const response = await request(app)
      .post("/api/calls")
      .set("Authorization", `Bearer ${token}`)
      .send({
        queue_id: queueId,
      });

    expect(response.status).toBe(201);
    expect(response.body.queue_id).toBe(queueId);
  });

  it("Listado por filtro en calls: waitings", async () => {
    const response = await request(app)
      .get("/api/calls?status=waiting")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it("Listado por filtro en calls: queues", async () => {
    const response = await request(app)
      .get("/api/calls?queue=" + queueId)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });
});
