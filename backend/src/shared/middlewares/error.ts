import {BaseException} from "../exceptions/base.exception";
import {Request, Response, NextFunction} from "express";

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if (err instanceof BaseException) {
    return res.status(err.statusCode).json({
      error: err.name,
      message: err.message,
    });
  }

  console.log(err);

  return res.status(500).json({
    error: "InternalServerError",
    message: "Ocurrió un error inesperado",
  });
}
