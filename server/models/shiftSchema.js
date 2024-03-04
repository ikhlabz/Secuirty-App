import mongoose from "mongoose";
import { softDeleteMiddleware } from "../middleware/softDeleteMiddleware.js";
const { Schema } = mongoose;

// Shift Schema

const ShiftSchema = new Schema(
  {
    shiftName: {
      type: String,
      default: "",
      required: true,
    },
    shiftStartTime: {
      type: Date,
      required: true,
    },
    shiftEndTime: {
      type: Date,
      required: true,
    },
    shiftStatus: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
    lunchStartTime: {
      type: String,
    },
    lunchEndTime: {
      type: String,
    },
    locations: [
      {
        type: String,
        ref: "Location",
      },
    ],
    createdBy: {
      type: String,
      required: true,
      ref: "User",
    },
    assignedGuards: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SecurityGuard",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const DailyShiftSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    shift: {
      type: Schema.Types.ObjectId,
      ref: "Shift",
      required: true,
    },
    guard: {
      type: Schema.Types.ObjectId,
      ref: "SecurityGuard",
      required: true,
    },
    login: {
      type: Date,
      default: null,
    },
    logout: {
      type: Date,
      default: null,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Apply the soft delete middleware to both schemas
ShiftSchema.plugin(softDeleteMiddleware);

// Export the Shift model and the ShiftAssignment model

const Shift = mongoose.model("Shift", ShiftSchema);
const DailyShift = mongoose.model("DailyShift", DailyShiftSchema);

export { Shift, DailyShift };
