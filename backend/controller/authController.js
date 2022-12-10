const User = require("../models/User");
const bcrypt = require("bcrypt");
const Joi = require("joi");
 
const genAuthToken = require("../utils/genAuthToken");

const registerUser = async (req, res, next) => {

  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().min(3).max(200).required().email(),
    password: Joi.string().min(6).max(200).required(),
  });

  const { error } = schema.validate(req.body);
  
  if (error) {
    return res.status(400). send(error.details[0].message);
  }

  let user = await User.findOne({ email: req.body.email });

  if (user) {
    return res.status(400).send("user already exists..");
  }

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  const saveduser = await user.save();
  console.log(saveduser);
  const token = genAuthToken(saveduser);

  res.status(200).send(token);
};

const loginUser = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().min(3).max(200).required().email(),
    password: Joi.string().min(6).max(200).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);


  let user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).send("Invalid user or password..");
  }

  const isvalid = await bcrypt.compare(req.body.password, user.password);

  if (!isvalid) {
    return res.status(400).send("Invalid user or password..");
  }

  const token = genAuthToken(user);
  res.status(200).send(token);
};

module.exports = {
  registerUser,
  loginUser,
};
