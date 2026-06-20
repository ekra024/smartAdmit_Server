const express = require("express");

const authController = require("../controllers/authController");

const router = express.Router();
const protect = require("../middlewares/authMiddleware");

router.post("/register", authController.registerStudent);

router.post("/login", authController.login);

router.get("/me", protect, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

module.exports = router;