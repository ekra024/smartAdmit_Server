const { body } = require("express-validator");

const updateProfileValidation = [
  body("fullName")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Full name cannot be empty"),

  body("phone")
    .optional()
    .isMobilePhone("any")
    .withMessage("Invalid phone number"),

  body("gender")
    .optional()
    .isIn(["Male", "Female", "Other"])
    .withMessage("Invalid gender"),

  body("sscGpa")
    .optional()
    .isFloat({ min: 0, max: 5 })
    .withMessage("SSC GPA must be between 0 and 5"),

  body("hscGpa")
    .optional()
    .isFloat({ min: 0, max: 5 })
    .withMessage("HSC GPA must be between 0 and 5"),
];

module.exports = {
  updateProfileValidation,
};