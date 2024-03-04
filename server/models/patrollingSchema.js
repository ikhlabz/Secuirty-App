import mongoose from "mongoose";
import { softDeleteMiddleware } from "../middleware/softDeleteMiddleware.js";

const { Schema } = mongoose;

const PatrollingSchema = new Schema({
  patrollingName: {
    type: String,
    default: "",
    required: true,
  },
  patrollingStatus: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Active",
  },
  patrollingArea: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
  },
  patrollingCheckpoints: [
    {
      checkpointName: {
        type: String,
        default: "",
        required: true,
      },
      checkpointStatus: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active",
      },
      checkpointQrCode: {
        secure_url: {
          type: String,
          default: "",
          required: true,
        },
        public_id: {
          type: String,
          default: "",
          required: true,
        },
      },
      completed: {
        type: Boolean,
        default: false,
      },
      completedBy: {
        type: String,
        ref: "SecurityGuard",
      },
    },
  ],
  assingedTo: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SecurityGuard",
    },
  ],
});

// Apply the soft delete middleware to both schemas
PatrollingSchema.plugin(softDeleteMiddleware);

// Create a model using the schema and export it for use by the API routes

const Patrolling = mongoose.model("Patrolling", PatrollingSchema);

export { Patrolling };
