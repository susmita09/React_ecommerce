const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token)
    return res.status(401).send("Access denied. Not authenticated...");

  try {
    const jwtSecretKey = process.env.JWT_SECRETKEY;
    const decoded = jwt.verify(token, jwtSecretKey);

    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid auth token...");
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res.status(401).json("you are not allowed");
    }
  });
};

// For User Profile
const isUser = (req, res, next) => {
  verifyToken(req, res, () => {
    console.log(req.user.id);
    console.log(req.params.userId);

    if (req.user.id === req.params.userId || req.user.isAdmin) {
      next();
    } else {
      res.status(403).send("Access denied. Not authorized...");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    // console.log(req.user.isAdmin);
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json("you are not  an authorized");
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  isUser,
};
