import { Reservation } from "../models/Reservation";

export async function createRegistration(
  firstName: string,
  lastName: string,
  email: string,
  organisationId: string,
  registeredBy: string
) {
  return Reservation.create({
    firstName,
    lastName,
    email,
    organisation: organisationId,
    registeredBy,
    time: new Date(),
  });
}

export async function deleteRegistration(registrationId: string) {
  return Reservation.findByIdAndDelete(registrationId);
}
