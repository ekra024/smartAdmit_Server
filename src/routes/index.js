const express = require("express");

const authRoutes = require("./authRoutes");

const router = express.Router();
const departmentRoutes = require("./departmentRoutes");

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Smart Admit API Running",
  });
});

router.use("/api/departments", departmentRoutes);
router.use("/auth", authRoutes);

module.exports = router;