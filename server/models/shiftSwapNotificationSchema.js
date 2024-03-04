import mongoose from "mongoose";
import { softDeleteMiddleware } from "../middleware/softDeleteMiddleware.js";
const { Schema } = mongoose;

// Shift Swap Notification Schema

const ShiftSwapNotificationSchema = new Schema(
  {
    shiftId1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shift",
      required: true,
    },
    shiftId2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shift",
      required: true,
    },
    requestingGuardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SecurityGuard",
      required: true,
    },
    requestedGuardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SecurityGuard",
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

ShiftSwapNotificationSchema.plugin(softDeleteMiddleware);

const ShiftSwapNotification = mongoose.model(
  "ShiftSwapNotification",
  ShiftSwapNotificationSchema
);

export default ShiftSwapNotification;
