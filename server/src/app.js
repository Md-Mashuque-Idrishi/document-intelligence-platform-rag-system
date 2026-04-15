
const express = require("express");
const cors = require("cors");

const app = express();

// 1. MIDDLEWARE FIRST
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes");
const documentRoutes = require("./routes/documentRoutes");

const authMiddleware = require("./middleware/authMiddleware");

// 2. ROUTES AFTER MIDDLEWARE
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/documents", documentRoutes);

// test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// protected route
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user,
  });
});

module.exports = app;