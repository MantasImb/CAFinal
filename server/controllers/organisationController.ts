import { type Response, type NextFunction, type Request } from "express";
import { Organisation } from "../models/Organisation";

// main organisation functionality

export interface createOrganisationRequest extends Request {
  body: {
    organisationName: string;
    owner: string;
  };
}

export async function registerOrganisation(
  req: createOrganisationRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { organisationName, owner } = req.body;
    const organisation = await Organisation.create({ organisationName, owner });
    res.status(200).json(organisation._id);
  } catch (error) {
    next(error);
  }
}

// reservations

export interface createReservationRequest extends Request {
  body: {
    name: string;
    surname: string;
    email: string;
    registeredBy: string;
    timestamp: number;
  };
  params: {
    organisationId: string;
  };
}

export async function createReservation(
  req: createReservationRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { name, surname, email, registeredBy, timestamp } = req.body;

    const { organisationId } = req.params;
    const organisation = await Organisation.findById(organisationId);

    if (!organisation) {
      res.status(404).json("Organisation not found");
      return;
    }

    organisation.reservations.push({
      name,
      surname,
      email,
      registeredBy,
      timestamp,
    });
    organisation.save();

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
}

export interface getReservationsRequest extends Request {
  params: {
    organisationId: string;
  };
}

export async function getReservations(
  req: getReservationsRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { organisationId } = req.params;
    const organisation = await Organisation.findById(organisationId);

    if (!organisation) return res.status(404).json("Organisation not found");

    res.status(200).json(organisation.reservations);
  } catch (error) {
    next(error);
  }
}
