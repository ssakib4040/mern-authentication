const crypto = require("crypto");

exports.randomHash = (num = 20) => {
  return crypto.randomBytes(num).toString("hex");
};
