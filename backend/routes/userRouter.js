const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = express.Router();

// Only logged-in users can access these:
router.use(authController.protect);

router
  .route("/profile")
  .get(userController.getMe)
  .patch(userController.updateMe); //Partially update user data.

// Only admins can access these:
router.use(authController.restrictTo("admin"));

router.route("/list").get(userController.listUsers);

router.route("/create").post(userController.createUser);

router.route("/:id").get(userController.getUser);

module.exports = router;
