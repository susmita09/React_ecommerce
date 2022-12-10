const express = require("express");
const router = express.Router();
const { payment} = require("../controller/paymentController");

//PAYMENT ENDPOINT
//"http://localhost:8000/api/stripe/payment"
router.post("/payment", payment);
module.exports = router;
