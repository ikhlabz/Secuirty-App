import mongoose from "mongoose";

const { Schema } = mongoose;

// Brief Schema

const BriefSchema = new Schema(
  {
    message: {
      type: String,
      required: true,
    },
    postedBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "SecurityGuard",
    },
    shiftID: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Shift",
    },
  },
  {
    timestamps: true,
  }
);

const Brief = mongoose.model("Brief", BriefSchema);

export default Brief;
