const express = require("express");
const router = express.Router();
const Application = require("../models/Application");
const positionRequirements = require("../utils/positionRequirements");

router.post("/submit", async (req, res) => {
  const { selections, position, documentLinks } = req.body;

  const scores = {};
  let totalScore = 0;

  Object.entries(selections).forEach(([cat, items]) => {
    scores[cat] = items.reduce((sum, item) => sum + item.points, 0);
    totalScore += scores[cat];
  });

  const requirements = positionRequirements[position];
  const meetsRequirements =
    !requirements ||
    Object.entries(requirements).every(([cat, { min }]) => scores[cat] >= min);

  if (!meetsRequirements) {
    return res.status(400).json({
      error: `Minimum requirements not met for ${position}`,
      requirements,
    });
  }

  const application = new Application({
    applicant: req.user._id,
    position,
    selections,
    scores,
    totalScore,
    documentLinks,
    status: "submitted",
  });

  await application.save();

  res.json({ success: true, application });
});

module.exports = router;
