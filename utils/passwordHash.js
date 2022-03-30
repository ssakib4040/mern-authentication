const bcrypt = require("bcryptjs");

exports.matchPassword = async (password, dbPassword) => {
  return await bcrypt.compare(password, dbPassword);
};

exports.hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};
