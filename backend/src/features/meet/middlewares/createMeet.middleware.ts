import {Request, Response, NextFunction} from "express";
import {CreateMeetRequestSchame} from "../../../features/meet/schemas/meet.schema";

export const createMeetMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const result = CreateMeetRequestSchame.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: JSON.parse(result.error.message),
    });
  }

  next();
};
