import { Organisation } from "../models/Organisation";

export async function createOrganisation(organisationName: string) {
  return Organisation.create({ organisationName });
}

export async function getOrganisation(organisationId: string) {
  return Organisation.findById(organisationId);
}

export async function getOrganisationReservations(organisationId: string) {
  return Organisation.findById(organisationId).populate("registrations");
}
