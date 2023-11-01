import { type Response, type NextFunction } from "express"
import { Organisation } from "../models/Organisation"

// main organisation functionality

export type createOrganisationRequest = {
  body: {
    organisationName: string
    owner: string
  }
}

export async function registerOrganisation(
  req: createOrganisationRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { organisationName, owner } = req.body
    const organisation = await Organisation.create({ organisationName, owner })
    res.status(200).json(organisation._id)
  } catch (error) {
    next(error)
  }
}

// registrations

export type createReservationRequest = {
  body: {
    organisationId: string
    name: string
    surname: string
    email: string
    registeredBy: string
    timestamp: number
  }
}

export async function createReservation(
  req: createReservationRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { organisationId, name, surname, email, registeredBy, timestamp } =
      req.body
    const organisation = await Organisation.findById(organisationId)

    if (!organisation) {
      res.status(404).json("Organisation not found")
      return
    }

    organisation.reservations.push({
      name,
      surname,
      email,
      registeredBy,
      timestamp,
    })
    res.status(200)
  } catch (error) {
    next(error)
  }
}
