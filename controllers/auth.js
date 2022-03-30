const User = require("../models/User");

const {
  validateUsername,
  validateEmail,
  validatePassword,
} = require("../utils/validator");

const { matchPassword, hashPassword } = require("../utils/passwordHash");
const { getSignedJwtToken } = require("../utils/jwtToken");
const { randomHash } = require("../utils/randomHash");
const { sendEmail } = require("../utils/sendEmail");

exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;

  // Check empty fields
  if (!username || !email || !password) {
    return res.status(400).send({
      success: false,
      message: "Please fill all the fields",
    });
  }

  // validate Username
  if (!validateUsername(username))
    return res
      .status(400)
      .send({ success: false, message: "Invalid Username" });

  // validate Email
  if (!validateEmail(email))
    return res.status(400).send({ success: false, message: "Invalid Email" });

  // validate Password
  if (!validatePassword(password))
    return res
      .status(400)
      .send({ success: false, message: "Invalid Password" });

  // check email exists
  const userExists = await User.findOne({ email }).exec();
  if (userExists) {
    return res.status(400).send({
      success: false,
      message: "User already exists",
    });
  }

  try {
    const user = await User.create({
      username,
      email,
      password,
    });

    user.password = await hashPassword(user.password);
    user.save();

    const token = getSignedJwtToken(user._id);

    return res.status(201).json({
      success: true,
      token: token,
    });
  } catch (error) {
    return res.send({
      success: true,
      message: error,
    });
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // Check empty fields
  if (!email || !password) {
    return res.status(400).send({
      success: false,
      message: "Please fill all the fields",
    });
  }

  const userExists = await User.findOne({ email }).exec();
  if (!userExists) {
    return res.status(400).send({
      success: false,
      message: "User not found",
    });
  }

  // check password match
  const isPasswordMatched = await matchPassword(password, userExists.password);
  if (!isPasswordMatched) {
    return res.status(400).json({
      success: "false",
      message: "Password not matched",
    });
  }

  try {
    const token = getSignedJwtToken(userExists._id);

    return res.status(201).json({
      success: true,
      token: token,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User not found",
    });
  }

  try {
    const resetPasswordToken = randomHash(30);
    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpire = Date.now() + 10 * (60 * 1000);
    user.save();

    // Create reset url to email to provided email
    const resetUrl = `http://localhost:3000/passwordreset/${resetPasswordToken}`;

    // HTML Message
    const message = `
      <h1>You have requested a password reset</h1>
      <p>Please go to the link to request a password reset:</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `;

    try {
      await sendEmail({
        to: user.email,
        subject: "Password Reset Request",
        text: message,
      });

      return res.status(200).json({ success: true, data: "Email Sent" });
    } catch (error) {
      // console.log(error);
      return res.status(400).send({ success: false, message: error.message });
    }
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    user.save();

    return res.status(400).send({ success: false, message: error.message });
  }
};

exports.resetPassword = async (req, res, next) => {
  const { resetToken } = req.params;

  try {
    const user = await User.findOne({
      resetPasswordToken: resetToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid token",
      });
    }

    if (!req.body.password) {
      return res.status(400).json({
        success: false,
        message: "Please provide a password",
      });
    }

    if (!validatePassword(req.body.password))
      return res
        .status(400)
        .send({ success: false, message: "Invalid password" });

    user.password = await hashPassword(req.body.password);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return res.status(201).json({
      success: true,
      data: "Password Updated Success",
      token: getSignedJwtToken(user._id),
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
