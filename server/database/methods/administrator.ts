import { Administrator } from "../models/Administrator";

export async function createAdministrator(
  email: string,
  name: string,
  surname: string,
  password: string,
  organisationId: string
) {
  return await Administrator.create({
    email,
    name,
    surname,
    password,
    organisation: organisationId,
  });
}

export async function createOwner(
  email: string,
  name: string,
  surname: string,
  password: string,
  organisationId: string
) {
  return await Administrator.create({
    email,
    name,
    surname,
    password,
    organisation: organisationId,
    isOwner: true,
    isApproved: true,
  });
}

export async function approveAdministrator(administratorId: string) {
  return await Administrator.findByIdAndUpdate(administratorId, {
    approved: true,
  });
}
