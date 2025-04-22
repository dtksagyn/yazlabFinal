const express = require("express");
const router = express.Router();
const juryController = require("../controllers/juryController");
const {
  verifyToken,
  verifyManager,
  verifyJury,
} = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware"); // For handling PDF uploads

// Assign a jury member to an announcement (Manager Only)
router.post("/assign", verifyToken, verifyManager, juryController.assignJury);

// Get list of juries assigned to an announcement (Manager Only)
router.get("/list", verifyToken, verifyManager, juryController.listJuries);

// Jury submits evaluation (Jury Only)
router.post(
  "/evaluate/:applicationId",
  verifyToken,
  verifyJury,
  upload.single("feedbackFile"),
  juryController.submitEvaluation
);

// Manager views all jury reports for an announcement
router.get(
  "/reports/:announcementId",
  verifyToken,
  verifyManager,
  juryController.getReports
);

// Manager makes final decision (Nihai Karar)
router.put(
  "/decision/:announcementId",
  verifyToken,
  verifyManager,
  upload.single("finalDecisionFile"),
  juryController.makeFinalDecision
);

module.exports = router;
