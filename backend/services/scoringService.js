// services/scoringService.js
const positionRequirements = require("../utils/positionRequirements");

function checkPositionRequirements(application) {
  const requirements = positionRequirements[application.position];
  if (!requirements) return true;

  return Object.entries(requirements).every(([category, { min }]) => {
    const categoryScore = application.scores[category] || 0;
    return categoryScore >= min;
  });
}
