import { type Response, type NextFunction } from "express"
import { createOrganisation } from "../database/methods/organisation"

export type createOrganisationRequest = {
  body: {
    name: string
    owner: string
  }
}

export async function registerOrganisation(
  req: createOrganisationRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { name, owner } = req.body
    await createOrganisation(name, owner)
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
}
