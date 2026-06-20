const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");
const cookieParser = require("cookie-parser");

const indexRoutes = require("./routes");
const globalErrorHandler = require("./middlewares/errorMiddleware");
const AppError = require("./utils/AppError");

const app = express();

// Middlewares

app.use(cors());

app.use(helmet());

app.use(compression());

app.use(morgan("dev"));

app.use(cookieParser());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Routes

app.use("/", indexRoutes);

// 404 Handler

app.use((req, res, next) => {
  next(new AppError(`Route ${req.originalUrl} not found`, 404));
});

// Global Error Middleware

app.use(globalErrorHandler);

module.exports = app;