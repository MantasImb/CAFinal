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
  timestamp: {
    type: Number,
    required: true,
  },
})

const organisationSchema = new mongoose.Schema({
  organisationName: {
    type: String,
    required: true,
    unique: true,
  },
  reservations: [reservationSchema],
  administrators: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Administrator",
    },
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Administrator",
    required: true,
    unique: true,
  },
})

export const Organisation = mongoose.model("Organisation", organisationSchema)
