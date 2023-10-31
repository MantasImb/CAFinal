import { type Types } from "mongoose"
import { Organisation } from "../models/Organisation"

export async function createOrganisation(
  organisationName: string,
  organisationOwner: string
) {
  return await Organisation.create({
    organisationName,
    owner: organisationOwner,
  })
}

export async function getOrganisation(organisationId: Types.ObjectId) {
  const organisation = await Organisation.findById(organisationId)
  if (!organisation) throw new Error("Organisation not found")
  return organisation
}

// Administrators
export async function getOrganisationAdministrators(
  organisationId: Types.ObjectId
) {
  const organisation = await Organisation.findById(organisationId).populate(
    "administrators"
  )
  if (!organisation) throw new Error("Organisation not found")
  return organisation.administrators
}

export async function assignAdministrator(
  organisationId: Types.ObjectId,
  administratorId: Types.ObjectId
) {
  const organisation = await Organisation.findById(organisationId)
  if (!organisation) throw new Error("Organisation not found")
  organisation.administrators.push(administratorId)
}

// Reservations
export async function getOrganisationReservations(
  organisationId: Types.ObjectId
) {
  const organisation = await Organisation.findById(organisationId).populate(
    "reservations"
  )
  if (!organisation) throw new Error("Organisation not found")
  return organisation.reservations
}
