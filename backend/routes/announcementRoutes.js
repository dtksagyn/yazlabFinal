const express = require("express");
const { isAdmin } = require("../middleware/auth");
const announcementController = require("../controllers/announcementController");

const router = express.Router();

router.post("/create", isAdmin, announcementController.createAnnouncement);
router.get("/", announcementController.getAllAnnouncements);
router.get("/:id", announcementController.getAnnouncementById);
router.put("/:id", isAdmin, announcementController.updateAnnouncement);
router.delete("/:id", isAdmin, announcementController.deleteAnnouncement);

module.exports = router;
