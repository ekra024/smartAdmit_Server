// src/models/Department.js

const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema(
  {
    departmentName: {
      type: String,
      required: [true, "Department name is required"],
      trim: true,
    },

    departmentCode: {
      type: String,
      required: [true, "Department code is required"],
      uppercase: true,
      trim: true,
    },

    faculty: {
      type: String,
      required: [true, "Faculty name is required"],
      trim: true,
    },

    totalSeats: {
      type: Number,
      required: true,
      min: 0,
    },

    availableSeats: {
      type: Number,
      required: true,
      min: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
departmentSchema.index({ departmentName: 1 });
departmentSchema.index({ departmentCode: 1 }, { unique: true });

module.exports = mongoose.model("Department", departmentSchema);