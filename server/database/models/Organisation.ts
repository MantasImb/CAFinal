import mongoose from "mongoose"

const organisationSchema = new mongoose.Schema({
  organisationName: {
    type: String,
    required: true,
  },
  reservations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reservation",
    },
  ],
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
  },
})

export const Organisation = mongoose.model("Organisation", organisationSchema)
