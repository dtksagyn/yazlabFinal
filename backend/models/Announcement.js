const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    faculty: {
      type: String,
      enum: ["Technology", "Medicine", "Arts", "Science"],
      required: true,
    },
    positions: [
      {
        type: String,
        enum: ["Dr. Öğr. Üyesi", "Doçent", "Profesör"],
        required: true,
      },
    ],
    requirements: {
      // Dynamic requirements storage
      type: Map,
      of: {
        asgari: Number,
        azami: Number,
        kCoefficient: Boolean, // If author count affects scoring
      },
    },
    deadline: { type: Date, required: true },
    isActive: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    juryMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    juryEvaluations: [
      {
        juryId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        result: { type: String, enum: ["pass", "fail"], required: true },
        feedbackFile: { type: String }, // file path to uploaded PDF
        submittedAt: { type: Date, default: Date.now },
      },
    ],
    finalDecisionFile: { type: String }, // path to Nihai Karar PDF
    finalizedAt: { type: Date },
  },
  { timestamps: true } // Ensure timestamps are properly placed
);

module.exports = mongoose.model("Announcement", announcementSchema);
