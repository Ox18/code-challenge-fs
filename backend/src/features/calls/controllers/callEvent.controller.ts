import { callEventService } from "../services/callEvent.service";
import {Request, Response} from "express";

export class CallEventController {
    constructor(
        private readonly callEventService: callEventService
    ) {}

    async get(req: Request, res: Response) {
        const events = await this.callEventService.get(req.params.call_id);
    
        res.json(events);
      }
}