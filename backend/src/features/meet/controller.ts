import {Request, Response} from "express";
import {MeetService} from "./services/meet.service";

export class MeetController {
  constructor(private readonly meetService: MeetService) {}

  async create(req: Request, res: Response) {
    const meet = await this.meetService.create(req.body);

    res.json(meet);
  }

  async get(req: Request, res: Response) {
    const meet = await this.meetService.get(req.params.meet_id);

    res.json(meet);
  }
}
