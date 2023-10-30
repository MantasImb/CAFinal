import mongoose from "mongoose"

const organisationSchema = new mongoose.Schema({
  organisationName: {
    type: String,
    required: true,
  },
  administrators: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Administrator",
    },
  ],
  registrations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Registration",
    },
  ],
})

export const Organisation = mongoose.model("Organisation", organisationSchema)
