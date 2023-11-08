import mongoose, { InferSchemaType } from "mongoose";

const administratorSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  surname: {
    type: String,
    required: [true, "Surname is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    // TODO: add password validation somewhere
  },
  isOwner: {
    type: Boolean,
    default: false,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
});

export const Administrator = mongoose.model(
  "Administrator",
  administratorSchema
);

export type AdministratorType = InferSchemaType<typeof administratorSchema>;
