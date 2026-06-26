const Student = require("../models/Student");
const AppError = require("../utils/AppError");

const getProfile = async (studentId) => {
  const student = await Student.findById(studentId);

  if (!student) {
    throw new AppError("Student not found.", 404);
  }

  return student;
};

const updateProfile = async (studentId, payload) => {
  // Security: Remove restricted fields
  delete payload.email;
  delete payload.password;
  delete payload.role;
  delete payload.isVerified;

  const updatedStudent = await Student.findByIdAndUpdate(
    studentId,
    payload,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedStudent) {
    throw new AppError("Student not found.", 404);
  }

  return updatedStudent;
};

module.exports = {
  getProfile,
  updateProfile,
};