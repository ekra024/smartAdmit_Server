const { body } = require("express-validator");

const updateApplicationValidation = [
  body("admissionSession")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Admission session is required."),

  
];

module.exports = {
  updateApplicationValidation,
};