const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    customerId: {
      type: String,
    },
    paymentIntentId: {
      type: String,
    },
    products: [],
    total: { type: Number, required: true },
    shipping: { type: Object, required: true },
    status: { type: String, default: "pending" },
    paymentStatus: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);

// {
//   id: { type: String },
//   name: { type: String },
//   des: { type: String },
//   price: { type: Number },
//   img: { type: String },
//   quantity: { type: Number },
// },