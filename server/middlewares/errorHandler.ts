import { type Request, type Response, type NextFunction } from "express";

export class AppError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

// TODO: do not show stack in production
export default function errorHandler(
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const errorObj = {
    message: err.message,
    stack: err.stack,
  };
  console.error("Error:", errorObj);
  res.status(err.statusCode || 500).json(errorObj);
}
