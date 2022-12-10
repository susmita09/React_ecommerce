const dotenv = require("dotenv");
const CloudinaryModule = require("cloudinary");

dotenv.config();

const cloudinary = CloudinaryModule.v2;

cloudinary.config({
  cloud_name: process.env.Cloudinary_Name,
  api_key: process.env.Api_Key,
  api_secret: process.env.Api_Secret,
});

module.exports = cloudinary;
