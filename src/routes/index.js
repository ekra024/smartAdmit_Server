const express = require("express");
const router = express.Router();

const DeanApproval = require("../models/DeanApproval");

router.get("/", async (req, res) => {
  const totalDeanApprovals = await DeanApproval.countDocuments();

  res.status(200).json({
    success: true,
    message: "DeanApproval Model Loaded Successfully",
    totalDeanApprovals,
  });
});

module.exports = router;