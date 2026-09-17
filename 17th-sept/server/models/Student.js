const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    firebaseUid: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    registerNo: {
      type: String,
      required: true
    },
    department: {
      type: String,
      required: true
    },
    year: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Student", studentSchema);