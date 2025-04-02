import {Request, Response} from "express";
import {AuthService} from "./services/auth.service";
import {HttpRequest} from "../../shared/types/http";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async login(req: Request, res: Response) {
    const token = await this.authService.login(req.body);

    res.json({token});
  }

  async me(req: Request, res: Response) {
    const session = (req as HttpRequest).session;

    const me = await this.authService.me(session.auth_id);

    res.json(me);
  }

  async register(req: Request, res: Response) {
    const token = await this.authService.register(req.body);

    res.json({token});
  }
}
