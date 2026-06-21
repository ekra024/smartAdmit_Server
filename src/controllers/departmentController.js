const catchAsync = require("../utils/catchAsync");
const sendResponse = require("../utils/sendResponse");
const departmentService = require("../services/departmentService");

const createDepartment = catchAsync(async (req, res) => {
  const result = await departmentService.createDepartment(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Department created successfully.",
    data: result,
  });
});

const getAllDepartments = catchAsync(async (req, res) => {
  const result = await departmentService.getAllDepartments();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Departments retrieved successfully.",
    data: result,
  });
});

const getSingleDepartment = catchAsync(async (req, res) => {
  const result = await departmentService.getSingleDepartment(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Department retrieved successfully.",
    data: result,
  });
});

const updateDepartment = catchAsync(async (req, res) => {
  const result = await departmentService.updateDepartment(
    req.params.id,
    req.body
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Department updated successfully.",
    data: result,
  });
});

const updateDepartmentStatus = catchAsync(async (req, res) => {
  const { isActive } = req.body;

  const result = await departmentService.updateDepartmentStatus(
    req.params.id,
    isActive
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: `Department ${
      isActive ? "activated" : "deactivated"
    } successfully.`,
    data: result,
  });
});

const getDashboardStatistics = catchAsync(async (req, res) => {
  const result = await departmentService.getDashboardStatistics();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Dashboard statistics retrieved successfully.",
    data: result,
  });
});

module.exports = {
  createDepartment,
  getAllDepartments,
  getSingleDepartment,
  updateDepartment,
  updateDepartmentStatus,
  getDashboardStatistics,
};
