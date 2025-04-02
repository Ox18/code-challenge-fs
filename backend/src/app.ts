import express from "express";
import http from "http";
import { setupMiddlewares } from "./middlewares";
import { setupRoutes } from "./routes";
import { setupSocket } from "./socket";
import { errorHandler } from "./shared/middlewares/error";
export const setupApp = () => {
  const app = express();
  const server = http.createServer(app);
  
  setupMiddlewares(app);
  setupRoutes(app);
  setupSocket(server);
  
  app.use(errorHandler);
  return server;
};
