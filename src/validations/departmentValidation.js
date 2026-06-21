const { body } = require("express-validator");

const createDepartmentValidation = [
  body("departmentName")
    .trim()
    .notEmpty()
    .withMessage("Department name is required"),

  body("departmentCode")
    .trim()
    .notEmpty()
    .withMessage("Department code is required"),

  body("faculty")
    .trim()
    .notEmpty()
    .withMessage("Faculty is required"),

  body("totalSeats")
    .isInt({ min: 1 })
    .withMessage("Total seats must be greater than 0"),
];

const updateDepartmentValidation = [
  body("departmentName")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Department name cannot be empty"),

  body("departmentCode")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Department code cannot be empty"),

  body("faculty")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Faculty cannot be empty"),

  body("totalSeats")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Total seats must be greater than 0"),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be boolean"),
];

const updateDepartmentStatusValidation = [
  body("isActive")
    .isBoolean()
    .withMessage("isActive must be boolean"),
];

module.exports = {
  createDepartmentValidation,
  updateDepartmentValidation,
  updateDepartmentStatusValidation,
};