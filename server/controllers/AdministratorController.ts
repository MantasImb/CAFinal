import { type Response, type NextFunction } from "express"
import {
  createAdministrator,
  createOwner,
  approveAdministrator,
} from "../database/methods/administrator"

export type createAdministratorRequest = {
  body: {
    email: string
    name: string
    surname: string
    password: string
    isOwner: boolean
  }
}

export async function registerAdministrator(
  req: createAdministratorRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, name, surname, password, isOwner } = req.body
    isOwner
      ? await createAdministrator(email, name, surname, password)
      : await createOwner(email, name, surname, password)
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
}
