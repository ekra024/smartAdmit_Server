const express = require("express");

const router = express.Router();

const ROLES = require("../constants/roles");
const APPLICATION_STATUS = require("../constants/applicationStatus");

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    roles: ROLES,
    applicationStatus: APPLICATION_STATUS,
  });
});

module.exports = router;