const User = require("../models/User");
const jwt = require("jsonwebtoken");
const verifyTCKimlikNo = require("../utils/verifyTCKimlikNo");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// Helper function to create and send tokens
const createSendToken = (user, statusCode, res) => {
  const accessToken = user.generateAuthToken();
  const refreshToken = user.generateRefreshToken();

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    accessToken,
    refreshToken,
    data: {
      user
    }
  });
};

// Register with TC Kimlik verification
exports.register = catchAsync(async (req, res, next) => {
  const { tcNo, name, surname, birthYear, email, phoneNumber, password, role } = req.body;

  // 1) Check if user exists
  const existingUser = await User.findOne({ $or: [{ email }, { tcNo }] });
  if (existingUser) {
    return next(new AppError("Email or TC Kimlik No already registered", 400));
  }

  // 2) Verify TC Kimlik No
  const isTCValid = await verifyTCKimlikNo(tcNo, name, surname, birthYear);
  if (!isTCValid) {
    return next(new AppError("TC Kimlik No verification failed", 400));
  }

  // 3) Create new user
  const newUser = await User.create({
    tcNo,
    name,
    surname,
    birthYear,
    email,
    phoneNumber,
    password,
    role: role || "applicant"
  });

  // 4) Log the user in immediately
  createSendToken(newUser, 201, res);
});

// Login
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  // 2) Check if user exists and password is correct
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  // 3) Update last login
  user.lastLogin = Date.now();
  await user.save();

  // 4) Send token to client
  createSendToken(user, 200, res);
});

// Refresh token
exports.refreshToken = catchAsync(async (req, res, next) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return next(new AppError("No refresh token provided", 401));
  }

  try {
    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    
    // Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(new AppError("The user belonging to this token no longer exists", 401));
    }

    // Generate new access token
    const newAccessToken = currentUser.generateAuthToken();

    res.status(200).json({
      status: "success",
      accessToken: newAccessToken
    });
  } catch (err) {
    return next(new AppError("Invalid or expired refresh token", 401));
  }
});

// Protect routes - require authentication
exports.protect = catchAsync(async (req, res, next) => {
  // 1) Get token and check if it's there
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("You are not logged in! Please log in to get access", 401));
  }

  // 2) Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError("The user belonging to this token no longer exists", 401));
  }

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(new AppError("User recently changed password! Please log in again", 401));
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
});

// Restrict to certain roles
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError("You do not have permission to perform this action", 403));
    }
    next();
  };
};

// Update password
exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findById(req.user.id).select("+password");

  // 2) Check if POSTed current password is correct
  if (!(await user.correctPassword(req.body.currentPassword, user.password))) {
    return next(new AppError("Your current password is wrong", 401));
  }

  // 3) If so, update password
  user.password = req.body.newPassword;
  await user.save();

  // 4) Log user in, send JWT
  createSendToken(user, 200, res);
});