import mongoose from "mongoose";

const { Schema } = mongoose;

// Incident Report Field Schema

const IncidentReportFieldSchema = new Schema(
  {
    fieldName: {
      type: String,
      required: true,
    },
    fieldType: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const IncidentReportField = mongoose.model(
  "IncidentReportField",
  IncidentReportFieldSchema
);

export default IncidentReportField;
