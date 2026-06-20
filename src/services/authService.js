const bcrypt = require("bcryptjs");
const Student = require("../models/Student");
const AppError = require("../utils/AppError");

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
    password: hashedPassword,
  });

  const studentObject = student.toObject();

  delete studentObject.password;

  return studentObject;
};

const login = async (payload) => {
  return payload;
};

module.exports = {
  registerStudent,
  login,
};