const router = require("express").Router();

const { registerUser, loginUser } = require("../controller/authController");

//Register

router.post("/register", registerUser);
 

//LOGIN

router.post("/login", loginUser);

// router.post("/register", async (req, res, next) => {
//   const newUser = new User({
//     name: req.body.name,
//     email: req.body.email,
//     password: cryptoJs.AES.encrypt(
//       req.body.password,
//       process.env.PASS_SECURITY
//     ).toString(),
//   });

//   try {
//     const saveduser = await newUser.save();
//     res.status(200).json(saveduser);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//LOGIN
// router.post("/login", async (req, res, next) => {
//   try {
//     const user = await User.findOne({ email: req.body.email });

//     !user && res.status(401).json("email do not exists");

//     const hashedPassword = cryptoJs.AES.decrypt(
//       user.password,
//       process.env.PASS_SECURITY
//     );
//     const Password = hashedPassword.toString(cryptoJs.enc.Utf8);

//     if (Password !== req.body.password) {
//       return res.status(401).json("email or wrong pass ");
//     }

//     const accessToken = jwt.sign(
//       {
//         id: user._id,
//         isAdmin: user.isAdmin,
//       },
//       process.env.JWT_SECRETKEY,
//       { expiresIn: "3d" }
//     );

//     const { password, ...userInfo } = user._doc;
//     res.status(200).json({...userInfo, accessToken});
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
