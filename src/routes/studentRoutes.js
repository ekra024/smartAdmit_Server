const express = require("express");

const protect = require("../middlewares/authMiddleware");
const restrictTo = require("../middlewares/roleMiddleware");

const ROLES = require("../constants/roles");

const studentController = require("../controllers/studentController");

const validateRequest = require("../middlewares/validateRequest");

const {
  updateProfileValidation,
} = require("../validations/studentValidation");

const router = express.Router();

router.get(
  "/profile",
  protect,
  restrictTo(ROLES.STUDENT),
  studentController.getProfile
);

router.patch(
  "/profile",
  protect,
  restrictTo(ROLES.STUDENT),
  updateProfileValidation,
  validateRequest,
  studentController.updateProfile
);

module.exports = router;