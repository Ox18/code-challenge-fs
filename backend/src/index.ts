import "express-async-errors";
import env from "./env";
import {MongoClientDB} from "./infra/db/mongodb/client";

export const main = async () => {
  await MongoClientDB.connect(env.MONGODB_URI);

  const {setupApp} = await import("./app");
  const app = setupApp();
  app.listen(env.PORT, () => console.log(`Server running at http://localhost:${env.PORT}`));

  return app;
};

main().catch(console.error);
