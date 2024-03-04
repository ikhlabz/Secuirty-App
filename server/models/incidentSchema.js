import mongoose from "mongoose";

const { Schema } = mongoose;

// Incident Schema

const IncidentSchema = new Schema(
  {
    securityGuardID: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "SecurityGuard",
    },
    reportType: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "IncidentReportField",
    },

    location: {
      latitude: {
        type: Number,
        required: true,
      },
      longitude: {
        type: Number,
        required: true,
      },
    },
    locationDetails: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    narrative: {
      type: String,
      required: true,
    },
    incidentAssets: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Incident = mongoose.model("Incident", IncidentSchema);

export default Incident;
