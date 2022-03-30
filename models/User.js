const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  user: String,
  email: String,
  password: String,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
