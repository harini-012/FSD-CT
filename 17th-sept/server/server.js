const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const { initializeApp, cert } = require("firebase-admin/app");

const serviceAccount = require("./config/serviceAccountKey.json");

const Student = require("./models/Student");
const verifyToken = require("./middleware/authMiddleware");

// ------------------------------------
// Firebase Admin
// ------------------------------------

initializeApp({
  credential: cert(serviceAccount)
});

console.log("Firebase Admin initialized");

// ------------------------------------
// Express
// ------------------------------------

const app = express();

app.use(cors());
app.use(express.json());

// ------------------------------------
// Test routes
// ------------------------------------

app.get("/", (req, res) => {
  res.json({
    message: "Student API running"
  });
});

app.get("/test", (req, res) => {
  res.json({
    message: "This is the correct server"
  });
});

// ------------------------------------
// Save Student
// ------------------------------------

app.post("/students", verifyToken, async (req, res) => {
  try {
    console.log("POST /students");
    console.log("Received data:", req.body);
    console.log("Firebase user:", req.user.uid);

    const student = new Student({
      firebaseUid: req.user.uid,
      name: req.body.name,
      registerNo: req.body.registerNo,
      department: req.body.department,
      year: req.body.year
    });

    const savedStudent = await student.save();

    console.log("Student saved:", savedStudent);

    res.status(201).json({
      message: "Student saved successfully",
      student: savedStudent
    });

  } catch (error) {
    console.error("Student save error:", error.message);

    res.status(500).json({
      message: error.message
    });
  }
});

// ------------------------------------
// Start Server
// ------------------------------------

const PORT = 5000;

app.listen(PORT, "127.0.0.1", () => {
  console.log("=================================");
  console.log(`SERVER RUNNING ON PORT ${PORT}`);
  console.log("=================================");
});

// ------------------------------------
// MongoDB
// ------------------------------------

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
  });
