import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: [true, "Id is required"],
  },
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  surname: {
    type: String,
    required: [true, "Surname is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  registeredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Administrator",
    required: [true, "Registered by is required"],
  },
  timestamp: {
    type: Number,
    required: [true, "Timestamp is required"],
  },
});

const organisationSchema = new mongoose.Schema({
  organisationName: {
    type: String,
    required: [true, "Organisation name is required"],
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
    required: [true, "Owner is required"],
  },
});

export const Organisation = mongoose.model("Organisation", organisationSchema);
