const User = require("../models/User");
require("dotenv").config();

const { sendVerificationEmail } = require("../utils/emailService");

exports.requestVerification = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    const token = user.generateVerificationToken();
    await sendVerificationEmail(user.email, token);

    res.json({ message: "Verification email sent" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    const decoded = jwt.verify(token, process.env.VERIFICATION_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ error: "Invalid token" });

    user.isVerified = true;
    await user.save();

    res.json({ message: "Email verified successfully" });
  } catch (err) {
    res.status(400).json({ error: "Invalid or expired token" });
  }
};
