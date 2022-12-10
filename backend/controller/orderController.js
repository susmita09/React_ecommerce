const Order = require("../models/Order");

//GET ORDERS
const getOrder = async (req, res, next) => {
  const query = req.query.new;

  try {
    const orders = query
      ? await Order.find().sort({ _id: -1 }).limit(4)
      : await Order.find().sort({ _id: -1 });

    res.status(200).send(orders);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

//Edit Orders
const editOrder = async (req, res, next) => {
  const id = req.params.id;
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).send(updatedOrder);
  } catch (err) {
    res.status(500).send(err);
  }
};

//get single order

const getSingleOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    // console.log(order)

    // if (!req.user.isAdmin || req.user.id !== order.userId ) {
    //   return res.status(401).send("Access denied not authorized");
    // }

    res.status(200).send(order);
  } catch (err) {
    res.status(500).send(err);
  }
};

//GET USER ORDER

const userOrder = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    // console.log(orders);
    res.status(200).send(orders);
  } catch (err) {
    res.status(500).send(err);
  }
}

module.exports = {
  getOrder,
  editOrder,
  getSingleOrder,
  userOrder
};
