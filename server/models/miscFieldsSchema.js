import mongoose from "mongoose";
const { Schema } = mongoose;

// Misc Fields Schema

const MiscFieldsSchema = new Schema({
  patrollingRadius: {
    type: Number,
    default: 100,
  },
  securityGuardRadius: {
    type: Number,
    default: 3000,
  },
  resetCheckPointHours: {
    type: Number,
    default: 4,
  },
});

const MiscFields = mongoose.model("MiscFields", MiscFieldsSchema);
