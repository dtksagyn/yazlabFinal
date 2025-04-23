require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const DBConnection = require("./config/db");
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");

//const applicationRoutes = require("./routes/applications");
//const announcementRoutes = require("./routes/announcements");
//const juryRoutes = require("./routes/jury");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to database
DBConnection();

// Routes
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
//app.use("/api/applications", applicationRoutes);
//app.use("/api/announcements", announcementRoutes);
//app.use("/api/jury", juryRoutes);

// Global error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong!";
  res.status(statusCode).json({ status: "error", message });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
