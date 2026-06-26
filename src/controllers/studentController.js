const catchAsync = require("../utils/catchAsync");
const sendResponse = require("../utils/sendResponse");

const studentService = require("../services/studentService");

const getProfile = catchAsync(async (req, res) => {
  const result = await studentService.getProfile(req.user._id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Student profile retrieved successfully.",
    data: result,
  });
});

const updateProfile = catchAsync(async (req, res) => {
  const result = await studentService.updateProfile(
    req.user._id,
    req.body
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Profile updated successfully.",
    data: result,
  });
});

module.exports = {
  getProfile,
  updateProfile,
};