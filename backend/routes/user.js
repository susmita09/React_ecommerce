const router = require("express").Router();
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleware/verifyjwt");
const {
  updateUser,
  deleteUser,
  getUser,
  getUserStats,
  getAllUsers,
} = require("../controller/userController");

//updating user
router.put("/update/:id", verifyTokenAndAuthorization, updateUser);

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, deleteUser);

//GET USER ADMIN
router.get("/find/:id", verifyTokenAndAdmin, getUser);
//GET ALL USER
router.get("/findall", verifyTokenAndAdmin, getAllUsers);
//GET USER STATS
router.get("/stats", verifyTokenAndAdmin, getUserStats);

module.exports = router;
