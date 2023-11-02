import express from "express";
import {
  registerAdministrator,
  loginAdministrator,
  getAdministrator,
} from "../controllers/administratorController";
import { protect } from "../middlewares/auth";

export const router = express.Router();

router.route("/").post(registerAdministrator);
router.route("/login").post(loginAdministrator);
// TODO: not sure if needed, delete if not
router.route("/:administratorId").get(protect, getAdministrator);
