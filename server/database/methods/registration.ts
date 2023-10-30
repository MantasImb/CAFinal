import { Registration } from "../models/Registration"

export async function createRegistration(
  firstName: string,
  lastName: string,
  email: string,
  organisationId: string,
  registeredBy: string
) {
  return Registration.create({
    firstName,
    lastName,
    email,
    organisation: organisationId,
    registeredBy,
    time: new Date(),
  })
}

export async function deleteRegistration(registrationId: string) {
  return Registration.findByIdAndDelete(registrationId)
}
