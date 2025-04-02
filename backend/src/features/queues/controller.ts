import {Request, Response} from "express";
import {QueuesService} from "./services/queues.service";

export class QueuesController {
  constructor(private readonly queuesService: QueuesService) {}

  async getAll(req: Request, res: Response) {
    const queues = await this.queuesService.getAll();

    res.json(queues);
  }
}
