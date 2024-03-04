import mongoose from "mongoose";
import { softDeleteMiddleware } from "../middleware/softDeleteMiddleware.js";

const { Schema } = mongoose;

// Location Schema

const LocationSchema = new Schema({
  locationName: {
    type: String,
    default: "",
    required: true,
  },
  locationAddress: {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  },
  locationStatus: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Active",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

LocationSchema.plugin(softDeleteMiddleware);

const Location = mongoose.model("Location", LocationSchema);

export default Location;
