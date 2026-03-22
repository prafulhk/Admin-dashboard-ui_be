const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  action: String,
  user: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Activity", activitySchema);
