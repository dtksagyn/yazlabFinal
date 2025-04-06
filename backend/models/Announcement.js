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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Announcement", announcementSchema);
