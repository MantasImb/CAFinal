import { type Response } from "express";
import { createOrganisation } from "../database/methods/organisation";

export type createOrganisationRequest = {
  body: {
    name: string;
    address: string;
    city: string;
    country: string;
    email: string;
    phone: string;
    password: string;
  };
};
