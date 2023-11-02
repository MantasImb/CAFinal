import { type Request, type Response, type NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import z from "zod";
import { Administrator } from "../models/Administrator";
import { AppError } from "../middlewares/errorHandler";
import { env } from "../config/env";

// JWT
function generateToken(id: string) {
  return jwt.sign({ id }, env.JWT_SECRET, { expiresIn: "30d" });
}

export const createAdministratorRequestSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  surname: z.string(),
  password: z.string(),
  isOwner: z.boolean().optional(),
});

/** Register a new administrator
 * @route POST /api/administrator
 * @access public
 */
export async function registerAdministrator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validatedBody = createAdministratorRequestSchema.safeParse(req.body);
    if (!validatedBody.success) throw new AppError("Invalid body", 400);

    const { email, name, surname, password, isOwner } = req.body;

    const emailExists = await Administrator.exists({ email });
    if (emailExists) throw new AppError("Email already exists", 400);

    // hash password
    const salt = await bcrypt.genSalt(7);
    const hashedPassword = await bcrypt.hash(password, salt);

    const administrator = isOwner
      ? await Administrator.create({
          email,
          name,
          surname,
          password: hashedPassword,
        })
      : await Administrator.create({
          email,
          name,
          surname,
          password: hashedPassword,
          isOwner,
        });

    res.status(201).json({
      name: administrator.name,
      surname: administrator.surname,
      email: administrator.email,
      isOwner: administrator.isOwner,
      isApproved: administrator.isApproved,
      token: generateToken(administrator._id.toString()),
    });
  } catch (error) {
    next(error);
  }
}

export const loginAdministratorRequestSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

/** Login administrator
 * @route POST /api/administrator/login
 * @access public
 */
export async function loginAdministrator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validatedBody = loginAdministratorRequestSchema.safeParse(req.body);
    if (!validatedBody.success) throw new AppError("Invalid body", 400);

    const { email, password } = req.body;

    const administrator = await Administrator.findOne({
      email,
    });
    if (!administrator) throw new AppError("Invalid email", 404);

    const isMatch = await bcrypt.compare(password, administrator.password);
    if (!isMatch) throw new AppError("Invalid password", 400);

    res.status(200).json({
      name: administrator.name,
      surname: administrator.surname,
      email: administrator.email,
      isOwner: administrator.isOwner,
      isApproved: administrator.isApproved,
      token: generateToken(administrator._id.toString()),
    });
  } catch (error) {
    next(error);
  }
}

export const getAdministratorRequestSchema = z.object({
  administratorId: z.string(),
});

/** Get administrator by id
 * @route GET /api/administrator/:administratorId
 * @access private
 */
export async function getAdministrator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const validatedParams = getAdministratorRequestSchema.safeParse(req.params);
    if (!validatedParams.success) throw new AppError("Invalid params", 400);

    const { administratorId } = req.params;
    const administrator = await Administrator.findById(administratorId);

    if (!administrator) throw new AppError("Administrator not found", 404);

    res.status(200).json({
      name: administrator.name,
      surname: administrator.surname,
      email: administrator.email,
      isOwner: administrator.isOwner,
      isApproved: administrator.isApproved,
    });
  } catch (error) {
    next(error);
  }
}
