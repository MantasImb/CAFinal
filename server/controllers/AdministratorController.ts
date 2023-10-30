import { type Response } from "express";
import {
  createAdministrator,
  createOwner,
  approveAdministrator,
} from "../database/methods/administrator";

export type createAdministratorRequest = {
  body: {
    email: string;
    name: string;
    surname: string;
    password: string;
    organisationId: string;
  };
};

export async function registerAdministrator(
  req: createAdministratorRequest,
  res: Response
) {
  const { email, name, surname, password, organisationId } = req.body;
  await createAdministrator(email, name, surname, password, organisationId);
  res.sendStatus(200);
}

export async function registerOwner(
  req: createAdministratorRequest,
  res: Response
) {
  const { email, name, surname, password, organisationId } = req.body;
  await createOwner(email, name, surname, password, organisationId);
  res.sendStatus(200);
}
