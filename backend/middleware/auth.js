// middleware/auth.js

// A sample middleware for admin authentication
exports.isAdmin = (req, res, next) => {
  // Assuming the user is stored in req.user (after JWT verification)
  if (req.user && req.user.role === "admin") {
    return next(); // Allow request to proceed
  }
  return res.status(403).json({ error: "Access denied" });
};
