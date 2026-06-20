const express = require("express");
const router = express.Router();

const StudentRecord = require("../models/StudentRecord");

router.get("/", async (req, res) => {
  const totalRecords = await StudentRecord.countDocuments();

  res.status(200).json({
    success: true,
    message: "StudentRecord Model Loaded Successfully",
    totalRecords,
  });
});

module.exports = router;