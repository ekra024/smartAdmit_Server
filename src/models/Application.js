const mongoose = require("mongoose");
const APPLICATION_STATUS = require("../constants/applicationStatus");

const applicationSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: [true, "Student is required"],
      unique: true,
      index: true,
    },

    applicationId: {
      type: String,
      required: [true, "Application ID is required"],
      unique: true,
      trim: true,
    },

    applicationYear: {
      type: Number,
      default: new Date().getFullYear(),
      required: true,
    },

    status: {
      type: String,
      enum: Object.values(APPLICATION_STATUS),
      default: APPLICATION_STATUS.DRAFT,
    },

    remarks: {
      type: String,
      trim: true,
      default: "",
    },

    submittedAt: {
      type: Date,
      default: null,
    },

    lastStatusUpdatedAt: {
      type: Date,
      default: Date.now,
    },

    isSubmitted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Application", applicationSchema);