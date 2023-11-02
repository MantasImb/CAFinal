import { type Response, type NextFunction, type Request } from "express";
import { type AuthorisedRequest } from "../middlewares/auth";
import z from "zod";
import { Organisation } from "../models/Organisation";
import { AppError } from "../middlewares/errorHandler";

// TODO: make a separate function method to get organisation by id?
// TODO: add zod validation

// main organisation functionality

export const createOrganisationRequestSchema = z.object({
  organisationName: z.string(),
});

/** Register a new organisation
 * @route POST /api/organisation
 * @access private
 */
export async function registerOrganisation(
  req: AuthorisedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const validatedBody = createOrganisationRequestSchema.safeParse(req.body);
    if (!validatedBody.success) throw new AppError("Invalid body", 400);

    const { organisationName } = req.body;
    const organisationNameTaken = await Organisation.exists({
      organisationName,
    });
    if (organisationNameTaken)
      throw new AppError("Organisation name already exists", 400);

    const organisation = await Organisation.create({
      organisationName,
      owner: req.administrator!._id,
    });
    res.status(200).json(organisation._id);
  } catch (error) {
    next(error);
  }
}

// reservations

export const createReservationRequestSchema = z.object({
  name: z.string(),
  surname: z.string(),
  email: z.string().email(),
  timestamp: z.number(),
});

/** Create a new reservation
 * @route POST /api/organisation/:organisationId/reservation
 * @access private
 */
export async function createReservation(
  req: AuthorisedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const validatedBody = createReservationRequestSchema.safeParse(req.body);
    if (!validatedBody.success) throw new AppError("Invalid body", 400);

    const { name, surname, email, timestamp } = req.body;

    const { organisationId } = req.params;
    const organisation = await Organisation.findById(organisationId);

    if (!organisation) throw new AppError("Organisation not found", 404);

    organisation.reservations.push({
      name,
      surname,
      email,
      registeredBy: req.administrator!._id,
      timestamp,
    });
    organisation.save();

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
}

/** Get all reservations for an organisation
 * @route GET /api/organisation/:organisationId/reservation
 * @access private
 */
export async function getReservations(
  req: AuthorisedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { organisationId } = req.params;
    const organisation = await Organisation.findById(organisationId);

    if (!organisation) throw new AppError("Organisation not found", 404);

    res.status(200).json(organisation.reservations);
  } catch (error) {
    next(error);
  }
}
