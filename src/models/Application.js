const mongoose = require("mongoose");
const APPLICATION_STATUS = require("../constants/applicationStatus");

const applicationSchema = new mongoose.Schema(
  {
    applicationId: {
      type: String,
      required: true,
      unique: true,
      immutable: true,
    },

    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: [true, "Student is required"],
      unique: true,
      index: true,
    },

    admissionSession: {
      type: String,
      trim: true,
      default: "",
    },

    quota: {
      type: String,
      enum: ["GENERAL", "FREEDOM_FIGHTER", "TRIBAL", "DISABLED"],
      default: "GENERAL",
    },

    applicationYear: {
      type: Number,
      required: true,
      default: () => new Date().getFullYear(), // ✅ arrow function দিয়ে fix করা হয়েছে
    },

    applicationStatus: {
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
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Application", applicationSchema);