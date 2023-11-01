import express from "express"
import { registerAdministrator } from "../controllers/AdministratorController"

export const router = express.Router()

router.route("/").post(registerAdministrator)
