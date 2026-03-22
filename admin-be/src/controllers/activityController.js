const Activity = require("../models/Activity");

exports.getActivities = async (req, res) => {
  const activities = await Activity.find().sort({ timestamp: -1 });
  res.json(activities);
};
