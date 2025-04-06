const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const validator = require("validator");
const { parsePhoneNumberFromString } = require("libphonenumber-js");

const userSchema = new mongoose.Schema(
  {
    tcNo: {
      type: String,
      required: [true, "TC Kimlik No is required"],
      unique: true,
      validate: {
        validator: function (v) {
          return /^[1-9]{1}[0-9]{10}$/.test(v);
        } /*This means:

        Starts with any digit from 1–9 (so TC can't start with 0)
        
        Followed by 10 digits (any digits from 0–9)
        
        So total = 11 digits
        
        Only digits, no letters or symbols.*/,

        message: (props) => `${props.value} is not a valid TC Kimlik No!`,
      },
      immutable: true, //a field's value cannot be changed after it has been set
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    surname: {
      type: String,
      required: [true, "Surname is required"],
      trim: true,
      maxlength: [50, "Surname cannot exceed 50 characters"],
    },
    birthYear: {
      type: Number,
      required: [true, "Birth year is required"],
      min: [1900, "Birth year must be after 1900"],
      max: [new Date().getFullYear(), "Birth year cannot be in the future"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      validate: {
        validator: function (v) {
          const phoneNumber = parsePhoneNumberFromString(v);
          return phoneNumber ? phoneNumber.isValid() : false;
        },
        message: (props) =>
          `${props.value} is not a valid international phone number!`,
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false,
    },
    role: {
      type: String,
      enum: ["applicant", "jury", "manager", "admin"],
      default: "applicant",
    },
    passwordChangedAt: Date,
    lastLogin: Date,
    isActive: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes
userSchema.index({ email: 1 });
userSchema.index({ tcNo: 1 });

// Password hashing middleware
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  if (!this.isNew) this.passwordChangedAt = Date.now() - 1000;
  next();
});

// Check password method
userSchema.methods.correctPassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Check if password changed after token was issued
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

// Generate auth token
userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { id: this._id, role: this.role, tcNo: this.tcNo },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

// Generate refresh token
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign({ id: this._id }, process.env.REFRESH_SECRET, {
    expiresIn: process.env.REFRESH_EXPIRES_IN,
  });
};

// Filter out inactive users by default
userSchema.pre(/^find/, function (next) {
  this.find({ isActive: { $ne: false } });
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
