import {Router} from "express";
import {QueuesRepositoryImpl} from "../../infra/db/mongodb/repositories/queues.repository.impl";
import {QueuesServiceImpl} from "./services/implements/queues.service.impl";
import {QueuesController} from "./controller";

const queuesRepository = new QueuesRepositoryImpl();
const queuesService = new QueuesServiceImpl(queuesRepository);
const controller = new QueuesController(queuesService);

const router = Router();

router.get("/queues", controller.getAll.bind(controller));

export default router;
