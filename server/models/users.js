import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { softDeleteMiddleware } from "../middleware/softDeleteMiddleware.js";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
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
  userRole: {
    type: String,
    default: "Admin",
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
  securityGuards: [
    {
      type: Schema.Types.ObjectId,
      ref: "SecurityGuard",
    },
  ],
  userStatus: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Active",
  },
  userImage: {
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
  passwordResetToken: String,
  passwordResetExpires: Date,
});

// Add soft delete middleware to the User Schema
UserSchema.plugin(softDeleteMiddleware);

// Method to generate password reset token

UserSchema.methods.generatePasswordResetToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // Token expires in 10 minutes
  return resetToken;
};

// Compare Password with the password in database using bcryptjs library

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.passwordHash);
};

// Encrypt Password before saving user to database using bcryptjs library

UserSchema.pre("save", async function (next) {
  if (!this.isModified("passwordHash")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
});

export const User = mongoose.model("User", UserSchema);
