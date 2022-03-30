const jwt = require("jsonwebtoken");

exports.getSignedJwtToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  })
};
