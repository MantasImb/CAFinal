import { type Response, type NextFunction } from "express"
import { Administrator } from "../models/Administrator"

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
    const administrator = isOwner
      ? await Administrator.create({ email, name, surname, password })
      : await Administrator.create({ email, name, surname, password, isOwner })
    res.status(200).json(administrator._id)
  } catch (error) {
    next(error)
  }
}
