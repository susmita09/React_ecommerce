const router = require("express").Router();

const {
   isUser,
  verifyTokenAndAdmin,
} = require("../middleware/verifyjwt");

const {
  getOrder,
  editOrder,
  getSingleOrder,
  userOrder
} = require("../controller/orderController");

//GET orders
router.get("/findall",  verifyTokenAndAdmin, getOrder);

//EDIT orders
router.put("/edit/:id", verifyTokenAndAdmin, editOrder);

//GET one order
router.get("/findone/:id", verifyTokenAndAdmin, getSingleOrder);


//GET USER ORDERS
router.get("/find/:userId", isUser,  userOrder );

module.exports = router;
