import {CallsService} from "../services/calls.service";
import {Request, Response} from "express";

export class CallsController {
  constructor(private readonly callService: CallsService) {}

  async getCalls(req: Request, res: Response) {
    const calls = await this.callService.getCalls(req.query);

    res.json(calls);
  }

  async create(req: Request, res: Response) {
    const call = await this.callService.create(req.body);

    res.status(201).json(call);
  }
}
