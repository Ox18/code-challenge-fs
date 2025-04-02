import {Express, Router} from "express";
import callsRoutes from "./features/calls/routes";
import authRoutes from "./features/auth/routes";
import queuesRoutes from "./features/queues/routes";
import meetRoutes from "./features/meet/routes";

export const setupRoutes = (app: Express) => {
  const router = Router();

  app.use("/api", router)

  router.use(callsRoutes);
  router.use(authRoutes);
  router.use(queuesRoutes);
  router.use(meetRoutes);
}