// models/Category.js
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  code: { type: String, required: true }, // A, B, C...L
  name: { type: String, required: true },
  minScore: { type: Number, default: null },
  maxScore: { type: Number, default: null },
  requiresMin: { type: Boolean, default: false },
  items: [
    {
      code: { type: String, required: true }, // A1, A2, B1, etc.
      description: { type: String, required: true },
      basePoints: { type: Number, required: true },
      appliesKCoefficient: { type: Boolean, default: false }, // Whether K coefficient applies
    },
  ],
});

module.exports = mongoose.model("Category", categorySchema);
