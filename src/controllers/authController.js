const catchAsync = require("../utils/catchAsync");
const authService = require("../services/authService");

const registerStudent = catchAsync(async (req, res) => {
  const result = await authService.registerStudent(req.body);

  res.status(201).json({
    success: true,
    message: "Student Registered Successfully",
    data: result,
  });
});

const login = catchAsync(async (req, res) => {
  const result = await authService.login(req.body);

  res.status(200).json({
    success: true,
    message: "Login Successful",
    data: result,
  });
});

const getMe = catchAsync(async (req, res) => {
  const result = await authService.getMe(req.user);

  res.status(200).json({
    success: true,
    message: "User retrieved successfully",
    data: result,
  });
});

const logout = catchAsync(async (req, res) => {
  await authService.logout();

  res.status(200).json({
    success: true,
    message: "Logout successful",
  });
});

module.exports = {
  registerStudent,
  login,
  getMe,
  logout,
};