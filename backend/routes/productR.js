const router = require("express").Router();
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleware/verifyjwt");

const {
  createProduct,
  updateProduct,
  deleteProduct,
  getSProduct,
  getAllProduct,
} = require("../controller/productController");

//CREATE
router.post("/create", verifyTokenAndAdmin, createProduct); //stverifyTokenAndAdmin,

//UPDATE
router.put("/update/:id", verifyTokenAndAdmin, updateProduct);

//DELETE
router.delete("/delete/:id", verifyTokenAndAdmin, deleteProduct);

//GET PRODUCT
router.get("/find/:id", getSProduct);

//GET ALL PRODUCTS
router.get("/findall", getAllProduct);

module.exports = router;
