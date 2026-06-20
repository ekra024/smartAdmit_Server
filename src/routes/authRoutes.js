const express = require("express");

const router = express.Router();

router.post("/register", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Student Register Route",
  });
});

router.post("/login", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Login Route",
  });
});

module.exports = router;