const jwt = require("jsonwebtoken");

const genAuthToken = (user) => {
  const secretKey = process.env.JWT_SECRETKEY;
  console.log(user._id);

  const token = jwt.sign(
    {
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    secretKey,
    { expiresIn: "1d" }
  );

  return token;
};

module.exports = genAuthToken;
