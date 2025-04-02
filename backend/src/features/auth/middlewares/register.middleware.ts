import {NextFunction, Request, Response} from "express";
import {RegisterRequestSchema} from "../schemas/auth.schema";

export const registerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const result = RegisterRequestSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: JSON.parse(result.error.message),
    });
  }

  next();
};
