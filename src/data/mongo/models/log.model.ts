import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  origin: {
    type: String,
  },
  message: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  level: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "low",
  },
});

export const LogModel = mongoose.model("Log", logSchema);
