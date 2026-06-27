const Application = require("../models/Application");
const AppError = require("../utils/AppError");
const APPLICATION_STATUS = require("../constants/applicationStatus");
const generateApplicationId = require("../utils/generateApplicationId");


const createApplication = async (studentId) => {
  // Check existing application
  const existingApplication = await Application.findOne({
    student: studentId,
  });

  if (existingApplication) {
    throw new AppError(
      "You have already created an application.",
      409
    );
  }

  const applicationId = await generateApplicationId();

  // Create application
  const application = await Application.create({
    applicationId,
    student: studentId,
    applicationStatus: APPLICATION_STATUS.DRAFT,
  });

  return application;
};


const getMyApplication = async (studentId) => {
  const application = await Application.findOne({
    student: studentId,
  });

  if (!application) {
    throw new AppError("Application not found.", 404);
  }

  return application;
};

const updateApplication = async (
  applicationId,
  studentId,
  payload
) => {

  const application = await Application.findOne({
  applicationId: applicationId,
});

  if (!application) {
    throw new AppError("Application not found.", 404);
  }

  // Owner check
  if (application.student.toString() !== studentId.toString()) {
    throw new AppError(
      "You are not authorized to update this application.",
      403
    );
  }

  // Workflow check
  if (
    application.applicationStatus !==
    APPLICATION_STATUS.DRAFT
  ) {
    throw new AppError(
      "Application can only be updated while in DRAFT status.",
      400
    );
  }

  Object.assign(application, payload);

  await application.save();

  return application;
};

module.exports = {
  createApplication,
  getMyApplication,
  updateApplication,
};