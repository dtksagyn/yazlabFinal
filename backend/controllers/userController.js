const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");

// 1) Get logged-in user's profile
exports.getMe = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    status: "success",
    data: { user },
  });
});

// 2) Update logged-in user's profile
exports.updateMe = catchAsync(async (req, res, next) => {
  const updates = {
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    education: req.body.education,
    cv: req.body.cv,
    profilePicture: req.body.profilePicture,
  };

  const updatedUser = await User.findByIdAndUpdate(req.user.id, updates, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: { user: updatedUser },
  });
});

// 3) Admin: List all users
exports.listUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    results: users.length,
    data: { users },
  });
});

// 4) Admin: Create a user manually
exports.createUser = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  res.status(201).json({
    status: "success",
    data: { user: newUser },
  });
});

// 5) Admin: Get a specific user by ID
exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError("No user found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: { user },
  });
});
