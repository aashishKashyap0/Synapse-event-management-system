// src/server.js

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");

// Load env from parent directory
dotenv.config({ path: path.join(__dirname, '../.env') });

// Connect DB
connectDB();

// Import routes
const authRoutes = require("./routes/authRoutes");

const app = express();

// CORS configuration for hosted frontend
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
};

console.log('🔧 CORS Origin:', corsOptions.origin); // Debug log

app.use(cors(corsOptions));
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("College Event Management API is running 🚀");
});

// Auth routes
app.use("/api/auth", authRoutes);

// (Later)
// app.use("/api/events", eventRoutes);
// app.use("/api/audi", bookingRoutes);
// app.use("/api/hod", hodRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
