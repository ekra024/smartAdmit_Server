const Counter = require("../models/Counter");
const COUNTER_NAMES = require("../constants/counterNames");
const APPLICATION_CONFIG = require("../constants/applicationConfig");

const generateApplicationId = async () => {
  const counter = await Counter.findByIdAndUpdate(
    COUNTER_NAMES.APPLICATION,
    {
      $inc: {
        sequenceValue: 1,
      },
    },
    {
      new: true,
      upsert: true,
    }
  );

  const year = new Date().getFullYear();

  const serial = String(counter.sequenceValue).padStart(APPLICATION_CONFIG.SERIAL_LENGTH, "0");

  return `${APPLICATION_CONFIG.PREFIX}${year}${serial}`;
};

module.exports = generateApplicationId;