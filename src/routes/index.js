const express = require("express");
const router = express.Router();

const Student = require("../models/Student");

router.get("/", async (req, res) => {
  const totalStudents = await Student.countDocuments();

  res.json({
    success: true,
    message: "Student Model Loaded Successfully",
    totalStudents,
  });
});

module.exports = router;