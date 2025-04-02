import {NextFunction, Request, Response} from "express";
import {LoginRequestSchema} from "../schemas/auth.schema";

export const loginMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const result = LoginRequestSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: JSON.parse(result.error.message),
    });
  }

  next();
};
