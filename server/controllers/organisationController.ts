import { type Response, type NextFunction, type Request } from "express";
import { type AuthorisedRequest } from "../middlewares/auth";
import z from "zod";
import { Organisation } from "../models/Organisation";
import { AppError } from "../middlewares/errorHandler";

// TODO: make a separate function method to get organisation by id?

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
    res.status(200).json(organisation);
  } catch (error) {
    next(error);
  }
}

/** Get organisation that user is owner of
 * @route GET /api/organisation
 * @access private
 */
export async function getOwnerOrganisation(
  req: AuthorisedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const organisation = await Organisation.findOne({
      owner: req.administrator!._id,
    }).populate("administrators", "-password");

    if (!organisation) throw new AppError("Organisation not found", 404);

    res.status(200).json(organisation);
  } catch (error) {
    next(error);
  }
}

/** Get an organisation (with its reservations and administrators)
 * @route GET /api/organisation/:organisationId
 * @access private
 */
export async function getOrganisation(
  req: AuthorisedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { organisationId } = req.params;
    const organisation = await Organisation.findById(organisationId).populate(
      "administrators",
      "-password"
    );

    if (!organisation) throw new AppError("Organisation not found", 404);

    res.status(200).json(organisation);
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
 * @route POST /api/organisation/:organisationId
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

    const _id = new Date().getTime().toString();

    const reservation = {
      _id,
      name,
      surname,
      email,
      registeredBy: req.administrator!._id,
      timestamp,
    };

    organisation.reservations.push(reservation);
    organisation.save();

    res.status(200).json(reservation);
  } catch (error) {
    next(error);
  }
}

export const updateReservationTimeRequestSchema = z.object({
  reservationId: z.string(),
  timestamp: z.number(),
});

/** Update time reservation
 * @route PUT /api/organisation/:organisationId
 * @access private
 */
export async function updateReservationTime(
  req: AuthorisedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const validatedBody = updateReservationTimeRequestSchema.safeParse(
      req.body
    );
    if (!validatedBody.success) throw new AppError("Invalid body", 400);

    const { reservationId } = req.body;

    const { organisationId } = req.params;
    const organisation = await Organisation.findById(organisationId);

    if (!organisation) throw new AppError("Organisation not found", 404);

    const reservation = organisation.reservations.id(reservationId);
    if (!reservation) throw new AppError("Reservation not found", 404);

    reservation.timestamp = req.body.timestamp;
    organisation.save();

    res.status(200).json(reservation);
  } catch (error) {
    next(error);
  }
}

export const deleteReservationRequestSchema = z.object({
  reservationId: z.string(),
});

/** Delete a reservation
 * @route DELETE /api/organisation/:organisationId
 * @access private
 */
export async function deleteReservation(
  req: AuthorisedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const validatedBody = deleteReservationRequestSchema.safeParse(req.body);
    if (!validatedBody.success) throw new AppError("Invalid body", 400);

    const { reservationId } = req.body;

    const { organisationId } = req.params;
    const organisation = await Organisation.findById(organisationId);

    if (!organisation) throw new AppError("Organisation not found", 404);

    const reservation = organisation.reservations.find((reservation) => {
      return reservation._id.toString() === reservationId;
    });

    if (!reservation) throw new AppError("Reservation not found", 404);

    organisation.reservations.pull(reservation);

    organisation.save();

    res.status(200).json({ reservationId });
  } catch (error) {
    next(error);
  }
}
