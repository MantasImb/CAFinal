import express from "express";
import {
  registerOrganisation,
  createReservation,
  getReservations,
} from "../controllers/organisationController";

export const router = express.Router();

router.route("/").post(registerOrganisation);

router
  .route("/:organisationId/reservation")
  .post(createReservation)
  .get(getReservations);
