const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const sendVerificationEmail = require("../utils/emailService.js");
require("dotenv").config();

const register = async (req, res) => {
  try {
    const { tcNo, email, password, role } = req.body;

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ error: "Email already registered" });

    const user = new User({
      tcNo,
      email,
      password: bcrypt.hashSync(password, 10),
      role: role || "applicant",
    });

    await user.save();

    const token = user.generateVerificationToken();
    await sendVerificationEmail(user.email, token);

    res.status(201).json({
      success: true,
      message: "User registered. Verification email sent.",
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    if (!user.isVerified)
      return res.status(403).json({ error: "Please verify your email" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const logout = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Logout successful (clear client-side token)",
  });
};

const verifyEmail = async (req, res) => {
  try {
    const token = req.query.token;
    if (!token) return res.status(400).json({ error: "Missing token" });

    const decoded = jwt.verify(token, process.env.VERIFICATION_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (user.isVerified)
      return res.status(400).json({ message: "Email already verified" });

    user.isVerified = true;
    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (err) {
    res.status(400).json({ error: "Invalid or expired token" });
  }
};

// Generate the verification token
const token = User.generateVerificationToken();
console.log(token); // Log the token to the console for testing

// Optionally, send the token in the response (for testing purposes)
res.status(201).json({
  success: true,
  message: "User registered. Verification email sent.",
  token: token, // Send the token in the response
});
const requireVerification = (req, res, next) => {
  if (!req.user.isVerified) {
    return res.status(403).json({
      error: "Email not verified",
      code: "EMAIL_NOT_VERIFIED",
    });
  }
  next();
};

module.exports = {
  register,
  login,
  logout,
  verifyEmail,
  requireVerification,
};
