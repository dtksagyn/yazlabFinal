// services/scoringService.js

const Category = require("../models/Category"); // Assuming you have a Category model
const Application = require("../models/Application"); // Assuming Application model stores applicants' data

/**
 * Calculate the score for an application based on categories and K coefficient
 * @param {Object} application - The application to calculate score for.
 * @returns {Number} - The total score for the application.
 */
async function calculateScore(application) {
  let totalScore = 0;

  // Loop through all the categories
  for (let categoryCode in application.scores) {
    // Fetch category details
    const category = await Category.findOne({ code: categoryCode });

    if (category) {
      const categoryScore = application.scores[categoryCode] || 0;

      // Check if K coefficient applies to this category
      const kCoefficient = category.items.some(
        (item) => item.appliesKCoefficient
      )
        ? 1.2
        : 1;

      // Add the weighted category score
      totalScore += categoryScore * kCoefficient;
    }
  }

  return totalScore;
}

module.exports = { calculateScore };
