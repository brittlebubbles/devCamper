const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("../middlewares/asyncHandler");

exports.register = asyncHandler(async (req, res) => {
  //Destructure fields from User Model
  const { name, email, password, role } = req.body;

  //Check is email exists
  const emailExist = await User.findOne({ email });
  if (emailExist) return res.status(400).send(`Email already exists`);

  //Ecrypts and Hashes the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Creates a new User
  const user = await new User({
    name,
    email,
    password: hashedPassword
  });

  //Saves the user and returns some information
  await user.save();
  return res.status(201).json({
    success: true,
    message: "User Successfully Registered",
    payload: user
  });
});
