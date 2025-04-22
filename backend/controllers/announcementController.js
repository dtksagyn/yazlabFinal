const Announcement = require("../models/Announcement");

// Create announcement
exports.createAnnouncement = async (req, res) => {
  try {
    const { title, description, faculty, positions, requirements, deadline } =
      req.body;

    const newAnnouncement = new Announcement({
      title,
      description,
      faculty,
      positions,
      requirements,
      deadline,
      createdBy: req.user._id, // assuming you have user from auth middleware
    });

    await newAnnouncement.save();
    res
      .status(201)
      .json({ message: "Announcement created", announcement: newAnnouncement });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all announcements
exports.getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.status(200).json({ announcements });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single announcement by ID
exports.getAnnouncementById = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement)
      return res.status(404).json({ error: "Announcement not found" });
    res.status(200).json({ announcement });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update announcement
exports.updateAnnouncement = async (req, res) => {
  try {
    const {
      title,
      description,
      faculty,
      positions,
      requirements,
      deadline,
      isActive,
    } = req.body;

    const updated = await Announcement.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        faculty,
        positions,
        requirements,
        deadline,
        isActive,
      },
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ error: "Announcement not found" });
    res
      .status(200)
      .json({ message: "Announcement updated", announcement: updated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete announcement
exports.deleteAnnouncement = async (req, res) => {
  try {
    const deleted = await Announcement.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ error: "Announcement not found" });
    res.status(200).json({ message: "Announcement deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
