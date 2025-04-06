require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const DBConnection = require("./config/db");

const authRoutes = require("./routes/auth");
//const applicationRoutes = require("./routes/applications");
//const announcementRoutes = require("./routes/announcements");
//const juryRoutes = require("./routes/jury");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", authRoutes);
//app.use("/api/applications", applicationRoutes);
//app.use("/api/announcements", announcementRoutes);
//app.use("/api/jury", juryRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
