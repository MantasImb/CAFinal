import jwt from "jsonwebtoken";
import { type Request, type Response, type NextFunction } from "express";
import { type AdministratorType } from "../models/Administrator";
import { env } from "../config/env";
import { Administrator } from "../models/Administrator";
import { AppError } from "./errorHandler";

export interface AuthorisedRequest extends Request {
  administrator?: AdministratorType & { _id: string };
}

export async function protect(
  req: AuthorisedRequest,
  _res: Response,
  next: NextFunction
) {
  let token: string;

  if (req.headers.authorization?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // verify token
      const decoded = jwt.verify(token, env.JWT_SECRET) as jwt.JwtPayload;
      if (!decoded) throw new AppError("Invalid token", 401);

      const fetchedAdministrator = await Administrator.findById(
        decoded.id
      ).select("-password");
      if (!fetchedAdministrator)
        throw new AppError("Something went wrong", 400);

      req.administrator = fetchedAdministrator.toObject();
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next(new AppError("Unauthorised, no token", 401));
  }
}
