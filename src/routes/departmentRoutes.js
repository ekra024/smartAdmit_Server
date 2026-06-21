const express = require("express");

const protect = require("../middlewares/authMiddleware");
const restrictTo = require("../middlewares/roleMiddleware");

const validateRequest = require("../middlewares/validateRequest");

const {
  createDepartmentValidation,
  updateDepartmentValidation,
  updateDepartmentStatusValidation,
} = require("../validations/departmentValidation");


const departmentController = require("../controllers/departmentController");

const ROLES = require("../constants/roles");

const router = express.Router();

router.post(
  "/",
  protect,
  restrictTo(ROLES.ADMIN),
  createDepartmentValidation,
  validateRequest,
  departmentController.createDepartment
);

router.get("/", departmentController.getAllDepartments);

router.get("/:id", departmentController.getSingleDepartment);

router.patch(
  "/:id",
  protect,
  restrictTo(ROLES.ADMIN),
  updateDepartmentValidation,
  validateRequest,
  departmentController.updateDepartment
);

router.patch(
  "/:id/status",
  protect,
  restrictTo(ROLES.ADMIN),
  updateDepartmentStatusValidation,
  validateRequest,
  departmentController.updateDepartmentStatus
);

router.get(
  "/dashboard/statistics",
  protect,
  restrictTo(ROLES.ADMIN),
  departmentController.getDashboardStatistics
);

module.exports = router;