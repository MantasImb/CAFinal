import { type Request, type Response, type NextFunction } from "express"

export default function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const errorObj = {
    message: err.message,
    stack: err.stack,
  }
  console.error("Error:", errorObj)
  res.status(500).json(errorObj)
}
