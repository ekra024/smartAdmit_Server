const catchAsync = require("../utils/catchAsync");
const sendResponse = require("../utils/sendResponse");

const applicationService = require("../services/applicationService");

const createApplication = catchAsync(async (req, res) => {
  const result = await applicationService.createApplication(
    req.user._id
  );

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Application created successfully.",
    data: result,
  });
});

const getMyApplication = catchAsync(async (req, res) => {
  const result = await applicationService.getMyApplication(
    req.user._id
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Application retrieved successfully.",
    data: result,
  });
});

const updateApplication = catchAsync(async (req, res) => {
  const result =
    await applicationService.updateApplication(
      req.params.applicationId,
      req.user._id,
      req.body
    );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Application updated successfully.",
    data: result,
  });
});

module.exports = {
  createApplication,
  getMyApplication,
  updateApplication,
};