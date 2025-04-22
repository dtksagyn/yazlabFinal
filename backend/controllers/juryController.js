const Announcement = require("../models/Announcement");
const Application = require("../models/Application");
const User = require("../models/User");

// Assign juries to an announcement
exports.assignJury = async (req, res) => {
  // TODO: implement assigning jury members to announcement
};

// List all juries assigned to an announcement
exports.listJuries = async (req, res) => {
  // TODO: implement fetching juries for a specific announcement
};

// Jury submits evaluation for an application
exports.submitEvaluation = async (req, res) => {
  // TODO: implement jury submitting pass/fail + feedback file
};

// Get all jury reports for an announcement
exports.getReports = async (req, res) => {
  // TODO: implement fetching all evaluations and feedbacks
};

// Manager makes final decision (Nihai Karar)
exports.makeFinalDecision = async (req, res) => {
  // TODO: implement final decision upload and updating applicant statuses
};
