const bcrypt = require("bcryptjs");
const Student = require("../models/Student");
const AppError = require("../utils/AppError");
const Admin = require("../models/Admin");
const generateToken = require("../utils/generateToken");

const registerStudent = async (payload) => {
  const { email, password } = payload;

  const existingStudent = await Student.findOne({ email });

  if (existingStudent) {
    throw new AppError("Email already exists", 409);
  }

  const hashedPassword = await bcrypt.hash(
  password,
  Number(process.env.BCRYPT_SALT_ROUNDS)
);

  const student = await Student.create({
    ...payload,
    role: "STUDENT",
    password: hashedPassword,
  });

  const studentObject = student.toObject();

  delete studentObject.password;

  return studentObject;
};

const login = async (payload) => {
  const { email, password } = payload;

  // 1. Search Student
  let user = await Student.findOne({ email }).select("+password");

  // 2. If not found, search Admin
  if (!user) {
    user = await Admin.findOne({ email }).select("+password");
  }

  // 3. User not found
  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  // 4. Compare Password
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    throw new AppError("Invalid email or password", 401);
  }

  // 5. Generate JWT
  const token = generateToken({
    id: user._id,
    role: user.role,
    userType: user.constructor.modelName
  });

  // 6. Remove Password
  const userObject = user.toObject();

  delete userObject.password;

  return {
    token,
    user: userObject,
  };
};

module.exports = {
  registerStudent,
  login,
};