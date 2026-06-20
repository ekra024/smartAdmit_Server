const express = require("express");
const router = express.Router();

const Document = require("../models/Document");

router.get("/", async (req, res) => {
  const totalDocuments = await Document.countDocuments();

  res.json({
    success: true,
    message: "Document Model Loaded Successfully",
    totalDocuments,
  });
});

module.exports = router;