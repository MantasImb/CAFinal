import { Administrator } from "../models/Administrator"

export async function createAdministrator(
  email: string,
  name: string,
  surname: string,
  password: string,
  organisationId: string
) {
  Administrator.create({
    email,
    name,
    surname,
    password,
    organisation: organisationId,
  })
}
