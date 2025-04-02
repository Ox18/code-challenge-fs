import {Request, Response, NextFunction} from "express";
import {UnauthorizedException} from "../exceptions/unauthorized.exception";
import {JWT} from "../utils/jwt";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    throw new UnauthorizedException();
  }

  if (!authorization.startsWith("Bearer ")) {
    throw new UnauthorizedException();
  }

  const token = authorization.replace("Bearer ", "");

  if (!token) {
    throw new UnauthorizedException();
  }

  JWT.verify(token);

  const decoded = JWT.decode<{
    id: string;
  }>(token);

  const session = {
    auth_id: decoded.id,
  };

  (req as any).session = session;

  next();
};
