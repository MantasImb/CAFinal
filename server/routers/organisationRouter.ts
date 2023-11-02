import express from "express";
import {
  registerOrganisation,
  createReservation,
  getReservations,
} from "../controllers/organisationController";
import { protect } from "../middlewares/auth";

export const router = express.Router();

router.route("/").post(protect, registerOrganisation);

router
  .route("/:organisationId/reservation")
  .post(protect, createReservation)
  .get(protect, getReservations);
