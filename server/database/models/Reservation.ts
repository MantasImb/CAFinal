import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  organisation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organisation",
  },
  registeredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Administrator",
  },
  time: {
    type: Date,
    required: true,
  },
});

export const Reservation = mongoose.model("Reservation", reservationSchema);
