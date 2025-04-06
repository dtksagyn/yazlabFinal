const Application = require("../models/Application");

exports.createApplication = async (req, res) => {
  try {
    const application = new Application({
      applicant: req.user.id,
      ...req.body,
    });
    await application.save();
    res.status(201).json(application);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.calculateScores = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    // Implement your scoring logic here
    const scores = {
      total: 0, // Calculate based on requirements
      details: {}, // Section-wise breakdown
    };

    application.scores = scores;
    await application.save();

    res.json(scores);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
