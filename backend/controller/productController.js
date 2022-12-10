const Product = require("../models/Product");
const cloudinary = require("../utils/cloudinary");

//CREATE PRODUCT
const createProduct = async (req, res) => {
  const { name, price, color, size, desc, category, productImg } = req.body;
  // console.log(productImg);
  const imgArr = [];
  try {
    if (productImg.length > 0) {
      for (const image of productImg) {
        const uploadedResponse = await cloudinary.uploader.upload(image, {
          upload_preset: "shopzzey",
        });
        // console.log(uploadedResponse);
        imgArr.push(uploadedResponse);
      }
    }

    if (imgArr.length > 0) {
      const product = new Product({
        title: name,
        price: price,
        des: desc,
        cat: category,
        size: size,
        color: color,
        img: imgArr,
      });
      // const newProduct = new Product(req.body);

      const savedProduct = await product.save();
      res.status(200).json(savedProduct);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

//UPDATE PRODUCT
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
};

//DELETE PRODUCT
const deleteProduct = async (req, res) => {
  const delImg = [];
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send("product not found...");

    //delete from cloudinary logic
    for (const image of product.img) {
      if (image.public_id) {
        const destroyResponse = await cloudinary.uploader.destroy(
          image.public_id
        );
        delImg.push(destroyResponse);
      }
    }

    if (delImg.length < 3) {
      await Product.findByIdAndDelete(req.params.id);
      res.status(200).json("Product has been deleted...");
    } else {
      console.log("failed to delete product img");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};



//GET PRODUCT SINGLE ANYONE
const getSProduct = async (req, res) => {
  // console.log(req.params.id);
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


//GET ALL PRODUCTS
const getAllProduct = async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;
    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(10);
    } else if (qCategory) {
      products = await Product.find({
        cat: qCategory,
         
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//EXPORTS
module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getSProduct,
  getAllProduct,
};
