const Department = require("../models/Department");
const AppError = require("../utils/AppError");
const isValidObjectId = require("../utils/isValidObjectId");
const Student = require("../models/Student");
const Application = require("../models/Application");

const createDepartment = async (payload) => {
  const { departmentName, departmentCode } = payload;

  // Check duplicate department name
  const existingDepartmentName = await Department.findOne({
    departmentName,
  });

  if (existingDepartmentName) {
    throw new AppError("Department name already exists.", 409);
  }

  // Check duplicate department code
  const existingDepartmentCode = await Department.findOne({
    departmentCode,
  });

  if (existingDepartmentCode) {
    throw new AppError("Department code already exists.", 409);
  }

  const department = await Department.create(payload);

  return department;
};

const getAllDepartments = async () => {
  const departments = await Department.find({ isActive: true }).sort({
    departmentName: 1,
  });

  return departments;
};

const getSingleDepartment = async (id) => {
  const department = await Department.findById(id);

  if (!department) {
    throw new AppError("Department not found.", 404);
  }

  return department;
};

const updateDepartment = async (id, payload) => {
  if (!isValidObjectId(id)) {
    throw new AppError("Invalid department id.", 400);
  }

  const department = await Department.findById(id);

  if (!department) {
    throw new AppError("Department not found.", 404);
  }

  if (payload.departmentName) {
    const existing = await Department.findOne({
      departmentName: payload.departmentName,
      _id: { $ne: id },
    });

    if (existing) {
      throw new AppError("Department name already exists.", 409);
    }
  }

  if (payload.departmentCode) {
    const existing = await Department.findOne({
      departmentCode: payload.departmentCode,
      _id: { $ne: id },
    });

    if (existing) {
      throw new AppError("Department code already exists.", 409);
    }
  }

  const updatedDepartment = await Department.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return updatedDepartment;
};

const updateDepartmentStatus = async (id, isActive) => {
  if (!isValidObjectId(id)) {
    throw new AppError("Invalid department id.", 400);
  }

  const department = await Department.findById(id);

  if (!department) {
    throw new AppError("Department not found.", 404);
  }

  department.isActive = isActive;

  await department.save();

  return department;
};

const getDashboardStatistics = async () => {
  const [
    totalDepartments,
    activeDepartments,
    inactiveDepartments,
    totalStudents,
    totalApplications,
    registeredStudents,
    pendingApplications,
    departmentApproved,
    deanApproved,
  ] = await Promise.all([
    Department.countDocuments(),

    Department.countDocuments({
      isActive: true,
    }),

    Department.countDocuments({
      isActive: false,
    }),

    Student.countDocuments(),

    Application.countDocuments(),

    Application.countDocuments({
      applicationStatus: "REGISTERED",
    }),

    Application.countDocuments({
      applicationStatus: "PAYMENT_PENDING",
    }),

    Application.countDocuments({
      applicationStatus: "DEPARTMENT_APPROVED",
    }),

    Application.countDocuments({
      applicationStatus: "DEAN_APPROVED",
    }),
  ]);

  return {
    totalDepartments,
    activeDepartments,
    inactiveDepartments,
    totalStudents,
    totalApplications,
    registeredStudents,
    pendingApplications,
    departmentApproved,
    deanApproved,
  };
};

module.exports = {
  createDepartment,
  getAllDepartments,
  getSingleDepartment,
  updateDepartment,
  updateDepartmentStatus,
  getDashboardStatistics,
};
