const mongoose = require("mongoose");

const sessionSchema = mongoose.Schema({
  userId: { type: String, required: true },
  startTime: { type: String },
  endTime: { type: String },
  timeZoneInSec: { type: Number },
  logs: [
    {
      filePath: { type: String },
      fileSize: { type: Number },
      deviceType: { type: String },
    },
  ],
});

module.exports = mongoose.model("Session", sessionSchema);
