import { Administrator } from "../models/Administrator"

export async function createAdministrator(
  email: string,
  name: string,
  surname: string,
  password: string
) {
  return await Administrator.create({
    email,
    name,
    surname,
    password,
  })
}

export async function createOwner(
  email: string,
  name: string,
  surname: string,
  password: string
) {
  return await Administrator.create({
    email,
    name,
    surname,
    password,
    isOwner: true,
    isApproved: true,
  })
}

export async function approveAdministrator(administratorId: string) {
  return await Administrator.findByIdAndUpdate(administratorId, {
    approved: true,
  })
}
