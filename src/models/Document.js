const mongoose = require("mongoose");
const DOCUMENT_STATUS = require("../constants/documentStatus");
const DOCUMENT_TYPES = require("../constants/documentTypes")

const documentSchema = new mongoose.Schema(
  {
    application: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
      required: [true, "Application is required"],
      index: true,
    },

    documentType: {
      type: String,
      enum: Object.values(DOCUMENT_TYPES),
      required: true,
    },

    fileName: {
      type: String,
      required: true,
      trim: true,
    },

    fileUrl: {
      type: String,
      required: true,
    },

    publicId: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: Object.values(DOCUMENT_STATUS),
      default: DOCUMENT_STATUS.PENDING,
    },

    remarks: {
      type: String,
      default: "",
      trim: true,
    },

    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      default: null,
    },

    uploadedAt: {
      type: Date,
      default: Date.now,
    },

    verifiedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

// Prevent duplicate document type for same application
documentSchema.index({ application: 1, documentType: 1 }, { unique: true });

module.exports = mongoose.model("Document", documentSchema);
