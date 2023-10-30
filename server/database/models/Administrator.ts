import mongoose from "mongoose"

const administratorSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  organisation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organisation",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
})

export const Administrator = mongoose.model(
  "Administrator",
  administratorSchema
)
