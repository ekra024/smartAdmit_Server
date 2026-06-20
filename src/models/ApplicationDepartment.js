const mongoose = require("mongoose");

const applicationDepartmentSchema = new mongoose.Schema(
  {
    application: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
      required: [true, "Application is required"],
      index: true,
    },

    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: [true, "Department is required"],
    },

    priority: {
      type: Number,
      required: [true, "Priority is required"],
      min: 1,
      max: 3,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate priority for the same application
applicationDepartmentSchema.index(
  { application: 1, priority: 1 },
  { unique: true }
);

// Prevent selecting the same department twice
applicationDepartmentSchema.index(
  { application: 1, department: 1 },
  { unique: true }
);

module.exports = mongoose.model(
  "ApplicationDepartment",
  applicationDepartmentSchema
);