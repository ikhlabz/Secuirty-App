import mongoose from "mongoose";
import { softDeleteMiddleware } from "../middleware/softDeleteMiddleware.js";
const Schema = mongoose.Schema;

const securityGuardSchema = new Schema({
  firstName: {
    type: String,
    default: "",
    required: true,
  },
  lastName: {
    type: String,
    default: "",
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  securityGuardImage: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  defaultGeoLocation: {
    latitude: {
      type: Number,
      default: 0,
    },
    longitude: {
      type: Number,
      default: 0,
    },
  },
  defaultRadius: {
    type: Number,
    default: 0,
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
  status: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Active",
  },
  shiftSwapRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ShiftSwapNotification",
    },
  ],
  employeePdf: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
});

securityGuardSchema.plugin(softDeleteMiddleware);

const SecurityGuard = mongoose.model("SecurityGuard", securityGuardSchema);
export default SecurityGuard;
