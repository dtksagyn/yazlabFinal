const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    announcement: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Announcement",
      required: true,
    },
    data: { type: Object, required: true }, // Form data
    status: {
      type: String,
      enum: ["draft", "submitted", "pending", "approved", "rejected"],
      default: "draft",
    },
    scores: {
      total: Number,
      details: Object, // Section-wise scores
    },
    juryEvaluations: [
      {
        jury: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        evaluation: Object,
        submittedAt: Date,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", applicationSchema);
