const express = require("express");

const protect = require("../middlewares/authMiddleware");
const restrictTo = require("../middlewares/roleMiddleware");

const ROLES = require("../constants/roles");

const applicationController = require("../controllers/applicationController");

const {
  updateApplicationValidation,
} = require("../validations/applicationValidation");

const validateRequest = require("../middlewares/validateRequest");

const router = express.Router();

router.post(
  "/",
  protect,
  restrictTo(ROLES.STUDENT),
  applicationController.createApplication
);

router.get(
  "/me",
  protect,
  restrictTo(ROLES.STUDENT),
  applicationController.getMyApplication
);

router.patch(
  "/:applicationId",
  protect,
  restrictTo(ROLES.STUDENT),
  updateApplicationValidation,
  validateRequest,
  applicationController.updateApplication
);



module.exports = router;