const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const jwt = require("jsonwebtoken");

// Registration route (you might want to add your logic for registration here)
router.post("/register", authController.register);

// Login route
router.post("/login", authController.login);
router.post("/logout", authController.logout);

module.exports = router;
