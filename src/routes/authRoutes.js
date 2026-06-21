const express = require("express");

const authController = require("../controllers/authController");

const ROLES = require("../constants/roles");

const restrictTo = require("../middlewares/roleMiddleware");

const router = express.Router();
const protect = require("../middlewares/authMiddleware");

router.post("/register", authController.registerStudent);

router.post("/login", authController.login);

router.get(
  "/me",
  protect,
  authController.getMe
);

router.post(
  "/logout",
  protect,
  authController.logout
);

router.get(
  "/student-dashboard",
  protect,
  restrictTo("STUDENT"),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Welcome Student",
    });
  }
);

router.get(
  "/admin-dashboard",
  protect,
  restrictTo(ROLES.ADMIN),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Welcome Admin",
    });
  }
);

router.get(
  "/dean-dashboard",
  protect,
  restrictTo(ROLES.DEAN_OFFICE),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Welcome Dean",
    });
  }
);

router.get(
  "/department-dashboard",
  protect,
  restrictTo(ROLES.DEPARTMENT),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Welcome Department Officer",
    });
  }
);

router.get(
  "/registrar-dashboard",
  protect,
  restrictTo(ROLES.REGISTRAR_OFFICE),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Welcome Registrar",
    });
  }
);

module.exports = router;