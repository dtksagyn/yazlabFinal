const Application = require("../models/Application");
const User = require("../models/User");
const Announcement = require("../models/Announcement");
const { validationResult } = require("express-validator");
const catchAsync = require("../utils/catchAsync");
const { calculateApplicationScore } = require("../services/scoringService");

// CREATE Application (Start a new application)
exports.createApplication = catchAsync(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const newApplication = new Application({
    applicant: req.user.id,
    announcement: req.body.announcement,
    data: req.body.data,
    status: "draft",
  });

  await newApplication.save();
  res.status(201).json({
    message: "Application created successfully!",
    application: newApplication,
  });
});

// UPDATE Application (Edit before submission)
exports.updateApplication = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body.data;

  const application = await Application.findById(id);
  if (!application) {
    return res.status(404).json({ error: "Application not found" });
  }

  if (application.applicant.toString() !== req.user.id) {
    return res
      .status(403)
      .json({ error: "Not authorized to edit this application" });
  }

  if (application.status !== "draft") {
    return res
      .status(400)
      .json({ error: "Only draft applications can be edited" });
  }

  application.data = updatedData;
  await application.save();

  res.status(200).json({ message: "Application updated", application });
});

// SUBMIT Application (Lock editing, make it "submitted")
exports.submitApplication = catchAsync(async (req, res) => {
  const { id } = req.params;

  const application = await Application.findById(id);
  if (!application) {
    return res.status(404).json({ error: "Application not found" });
  }

  if (application.applicant.toString() !== req.user.id) {
    return res
      .status(403)
      .json({ error: "Not authorized to submit this application" });
  }

  if (application.status !== "draft") {
    return res
      .status(400)
      .json({ error: "Only draft applications can be submitted" });
  }

  application.status = "submitted";
  await application.save();

  res.status(200).json({ message: "Application submitted", application });
});

// GET Single Application
exports.getApplication = catchAsync(async (req, res) => {
  const { id } = req.params;

  const application = await Application.findById(id)
    .populate("applicant", "name email")
    .populate("announcement", "title");

  if (!application) {
    return res.status(404).json({ error: "Application not found" });
  }

  // Only applicant or manager can view
  if (
    application.applicant._id.toString() !== req.user.id &&
    req.user.role !== "manager"
  ) {
    return res
      .status(403)
      .json({ error: "Not authorized to view this application" });
  }

  res.status(200).json({ application });
});

// GET All Applications (Manager/admin view)
exports.getAllApplications = catchAsync(async (req, res) => {
  const { status, applicant, position } = req.query;

  let filter = {};
  if (status) filter.status = status;
  if (applicant) filter.applicant = applicant;
  if (position) filter.announcement = position;

  const applications = await Application.find(filter)
    .populate("applicant", "name email")
    .populate("announcement", "title");

  res.status(200).json({ applications });
});

// UPLOAD Jury Evaluation File
exports.uploadEvaluation = catchAsync(async (req, res) => {
  const { id } = req.params;

  const application = await Application.findById(id);
  if (!application) {
    return res.status(404).json({ error: "Application not found" });
  }

  // Assume you use multer to upload PDF and save the file path as req.file.path
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  application.juryEvaluations.push({
    jury: req.user.id,
    evaluationFile: req.file.path,
    submittedAt: new Date(),
  });

  await application.save();
  res.status(200).json({ message: "Evaluation uploaded", application });
});

// CALCULATE SCORE (Auto)
exports.calculateScore = catchAsync(async (req, res) => {
  const { id } = req.params;

  const application = await Application.findById(id);
  if (!application) {
    return res.status(404).json({ error: "Application not found" });
  }

  const scoreData = calculateApplicationScore(application);

  application.scores = scoreData;
  await application.save();

  return res
    .status(200)
    .json({ message: "Score calculated", score: scoreData.total });
});

// UPDATE Application Status
exports.updateApplicationStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["pending", "approved", "rejected"].includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  const application = await Application.findById(id);
  if (!application) {
    return res.status(404).json({ error: "Application not found" });
  }

  application.status = status;
  await application.save();

  res
    .status(200)
    .json({ message: `Application status updated to ${status}`, application });
});
