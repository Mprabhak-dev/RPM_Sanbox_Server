const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  gender: { type: String },
  age: { type: Number },
  height: { type: Number },
  weight: { type: Number },
  additionalInfo: { type: String },
});

module.exports = mongoose.model("User", userSchema);
