import express from "express"
import {
  registerOrganisation,
  createReservation,
} from "../controllers/organisationController"

export const router = express.Router()

router.route("/").post(registerOrganisation)

router.route("/reservation").post(createReservation)
