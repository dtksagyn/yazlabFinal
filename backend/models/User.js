const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userSchema = new mongoose.Schema(
  {
    tcNo: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["applicant", "jury", "manager", "admin"],
      default: "applicant",
    },
    profile: {
      photo: String,
      cv: String,
      education: String,
      personalInfo: String,
    },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userSchema.methods.generateVerificationToken = function () {
  return jwt.sign({ id: this._id }, process.env.VERIFICATION_SECRET, {
    expiresIn: "1d",
  });
};

module.exports = mongoose.model("User", userSchema);
