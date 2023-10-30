import { Organisation } from "../models/Organisation";

export async function createOrganisation(organisationName: string) {
  return await Organisation.create({ organisationName });
}

export async function getOrganisation(organisationId: string) {
  const organisation = await Organisation.findById(organisationId);
  if (!organisation) throw new Error("Organisation not found");
  return organisation;
}

// Administrators
export async function getOrganisationAdministrators(organisationId: string) {
  const organisation = await Organisation.findById(organisationId).populate(
    "administrators"
  );
  if (!organisation) throw new Error("Organisation not found");
  return organisation.administrators;
}

// Reservations
export async function getOrganisationReservations(organisationId: string) {
  const organisation = await Organisation.findById(organisationId).populate(
    "reservations"
  );
  if (!organisation) throw new Error("Organisation not found");
  return organisation.reservations;
}
