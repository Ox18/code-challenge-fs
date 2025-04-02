import {Router} from "express";
import {AuthController} from "./controller";
import {loginMiddleware} from "./middlewares/login.middleware";
import {AuthServiceImpl} from "./services/implements/auth.service.impl";
import {CredentialsRepositoryImpl} from "./repositories/implements/credentials.repository.impl";
import {AgentsRepositoryImpl} from "../../infra/db/mongodb/repositories/agents.repository.impl";
import {authMiddleware} from "../../shared/middlewares/auth.middleware";
import {RandomUserProviderImpl} from "./providers/implements/randomuser.provider.impl";
import { registerMiddleware } from "./middlewares/register.middleware";

const agentsRepository = new AgentsRepositoryImpl();
const credentialsRepository = new CredentialsRepositoryImpl();
const randomuserProvider = new RandomUserProviderImpl();
const authService = new AuthServiceImpl(
  credentialsRepository,
  agentsRepository,
  randomuserProvider,
);
const controller = new AuthController(authService);

const router = Router();

router.post("/auth/login", loginMiddleware, controller.login.bind(controller));
router.get("/auth/me", authMiddleware, controller.me.bind(controller));
router.post("/auth/register", registerMiddleware, controller.register.bind(controller));

export default router;
