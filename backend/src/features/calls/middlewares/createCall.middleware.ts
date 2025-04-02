import {NextFunction, Request, Response} from "express";
import {CreateCallRequestSchema} from "../schemas/calls.schema";

export const getCallsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const result = CreateCallRequestSchema.safeParse(req.query);

  if (!result.success) {
    return res.status(400).json({
      error: JSON.parse(result.error.message),
    });
  }

  req.query = result.data;

  next();
};
