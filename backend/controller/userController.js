const express = require("express");
const cryptoJs = require("crypto-js");
const User = require("../models/User");
const { findByIdAndDelete } = require("../models/User");

//UPDATE
const updateUser = async (req, res, next) => {
  if (req.body.password) {
    req.body.password = cryptoJs.AES.encrypt(
      req.body.password,
      process.env.PASS_SECURITY
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true } //it will return the upated user
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

//DELETE
const deleteUser = async (req, res, next) => {
  try {
    await findByIdAndDelete(req.params.id);
    res.status(200).json("user removed successfuly");
  } catch (err) {
    res.status(500).json(err);
  }
};

//GET USER > ONLY ADMIN get all user
const getUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    const { password, ...userInfo } = user._doc;
    res.status(200).json({ ...userInfo });
  } catch (err) {
    res.status(500).json(err);
  }
};

//GET ALL USER
const getAllUsers = async(req,res,next)=>{
  try{
  const users = await User.find().sort({_id : -1});
  res.status(200).json(users);
  }
  catch(error){
    res.status(500).send(error);
  }
}


//GET USER STATS
const getUserStats = async (req, res, next) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  updateUser,
  deleteUser,
  getUser,
  getUserStats,
  getAllUsers
};
