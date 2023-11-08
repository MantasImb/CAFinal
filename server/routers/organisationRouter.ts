import express from "express";
import {
  registerOrganisation,
  createReservation,
  // getOrganisation,
  getOwnerOrganisation,
  updateReservationTime,
  deleteReservation,
} from "../controllers/organisationController";
import { protect } from "../middlewares/auth";

export const router = express.Router();

router
  .route("/")
  .get(protect, getOwnerOrganisation)
  .post(protect, registerOrganisation);

router
  .route("/:organisationId")
  .post(protect, createReservation)
  // .get(protect, getOrganisation)
  .put(protect, updateReservationTime)
  .delete(protect, deleteReservation);
