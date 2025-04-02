import {Router} from "express";
import {CallsServiceImpl} from "./services/implements/calls.service.impl";
import {getCallsMiddleware} from "./middlewares/getCalls.middleware";
import {CallsRepositoryImpl} from "../../infra/db/mongodb/repositories/calls.repository.impl";
import {authMiddleware} from "../../shared/middlewares/auth.middleware";
import {QueuesRepositoryImpl} from "../../infra/db/mongodb/repositories/queues.repository.impl";
import {CallEventRepositoryImpl} from "../../infra/db/mongodb/repositories/callEvent.repository.impl";
import {CallEventServiceImpl} from "./services/implements/callEvent.service.impl";
import {CallsController} from "./controllers/calls.controller";
import {CallEventController} from "./controllers/callEvent.controller";

const callsRepository = new CallsRepositoryImpl();
const queueRepository = new QueuesRepositoryImpl();
const callEventRepository = new CallEventRepositoryImpl();
const callsService = new CallsServiceImpl(callsRepository, queueRepository);
const callEventService = new CallEventServiceImpl(callEventRepository);

const controller = new CallsController(callsService);
const callEventController = new CallEventController(callEventService);

const router = Router();

router.get("/calls", authMiddleware, getCallsMiddleware, (req, res) =>
  controller.getCalls(req, res),
);
router.post("/calls", authMiddleware, controller.create.bind(controller));

router.get(
  "/calls/:call_id/events",
  authMiddleware,
  callEventController.get.bind(callEventController),
);

export default router;
