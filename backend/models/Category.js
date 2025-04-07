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
      code: String,
      description: String,
      basePoints: Number,
      appliesKCoefficient: Boolean,
    },
  ],
});

module.exports = mongoose.model("Category", categorySchema);
