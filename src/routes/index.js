const express = require("express");
const router = express.Router();

const Admin = require("../models/Admin");

router.get("/", async (req, res) => {
  const totalAdmins = await Admin.countDocuments();

  res.json({
    success: true,
    message: "Admin Model Loaded Successfully",
    totalAdmins,
  });
})

module.exports = router;