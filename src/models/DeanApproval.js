const mongoose = require("mongoose");
const REVIEW_STATUS = require("../constants/reviewStatus");

const deanApprovalSchema = new mongoose.Schema(
  {
    application: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
      required: [true, "Application is required"],
      unique: true,
      index: true,
    },

    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },

    status: {
      type: String,
      enum: Object.values(REVIEW_STATUS),
      required: true,
    },

    remarks: {
      type: String,
      required: [true, "Remarks are required"],
      trim: true,
    },

    approvedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("DeanApproval", deanApprovalSchema);
