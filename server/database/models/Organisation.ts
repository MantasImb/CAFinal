import mongoose from "mongoose"

const organisationSchema = new mongoose.Schema({
  organisationName: {
    type: String,
    required: true,
  },
  registrations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Registration",
    },
  ],
})

export const Organisation = mongoose.model("Organisation", organisationSchema)
