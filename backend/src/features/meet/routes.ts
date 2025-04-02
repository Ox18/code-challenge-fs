import {Router} from "express";
import {MeetController} from "./controller";
import {MeetServiceImpl} from "./services/implements/meet.service.impl";
import {QueuesRepositoryImpl} from "../../infra/db/mongodb/repositories/queues.repository.impl";
import {createMeetMiddleware} from "./middlewares/createMeet.middleware";
import {CallsRepositoryImpl} from "../../infra/db/mongodb/repositories/calls.repository.impl";

const queueRepository = new QueuesRepositoryImpl();
const callsRepository = new CallsRepositoryImpl();
const meetService = new MeetServiceImpl(queueRepository, callsRepository);
const controller = new MeetController(meetService);

const router = Router();

router.post("/meet", createMeetMiddleware, controller.create.bind(controller));

router.get("/meet/:meet_id", controller.get.bind(controller));

export default router;
