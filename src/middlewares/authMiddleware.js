const Student = require("../models/Student");
const Admin = require("../models/Admin");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const verifyToken = require("../utils/verifyToken");

const protect = catchAsync(async (req, res, next) => {
  let token;

  // Get Token From Header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // No Token
  if (!token) {
    throw new AppError("You are not logged in.", 401);
  }

  // Verify Token
  const decoded = verifyToken(token);

  let currentUser;

  if (decoded.userType === "Student") {
    currentUser = await Student.findById(decoded.id);
  } else if (decoded.userType === "Admin") {
    currentUser = await Admin.findById(decoded.id);
  }

  if (!currentUser) {
    throw new AppError("User no longer exists.", 401);
  }

  req.user = {
    ...currentUser.toObject(),
    userType: decoded.userType,
  };

  next();
});

module.exports = protect;