import mongoose from "mongoose"

const reservationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  registeredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Administrator",
  },
  time: {
    type: Date,
    required: true,
  },
})

export const Reservation = mongoose.model("Reservation", reservationSchema)
