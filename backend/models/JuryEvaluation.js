const mongoose = require("mongoose");

const evaluationSchema = new mongoose.Schema({
  application: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Application",
    required: true,
  },
  juryMember: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  scores: {
    type: Map,
    of: Number, // Section-wise scores given by jury
  },
  comments: String,
  decision: {
    type: String,
    enum: ["positive", "negative", "pending"],
    default: "pending",
  },
  submittedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("JuryEvaluation", evaluationSchema);
