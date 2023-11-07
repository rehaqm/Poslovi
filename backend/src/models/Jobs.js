import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
  position: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  qualifications: [
    {
      type: String,
      required: true,
    },
  ],
  responsibilities: {
    type: String,
    required: true,
  },
  imageUrl: { type: String, required: true },
  contract: { type: String, required: true },
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

export const JobModel = mongoose.model("jobs", JobSchema);
