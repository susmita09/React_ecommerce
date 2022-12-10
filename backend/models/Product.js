const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    des: {
      type: String,
      required: true,
    },
    img: {
      type: Array,
      required: true,
    },
    categories: {
      type: Array,
    },
    cat: {
      type: String,
      required: true,
    },
    size: {
      type: Array,
      default: ["S", "XS", "M"],
    },
    color: {
      type: Array,
      default: ["black", "yellow"],
    },
    price: {
      type: Number,
      required: true,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
