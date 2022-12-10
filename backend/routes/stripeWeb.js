 
const Order = require("../models/Order");

const createOrder = async (customer, data,lineItems) => {
  // const items = JSON.parse(customer.metadata.cart);

  const newOrder = new Order({
    userId: customer.metadata.userId,
    customerId: data.customer,
    paymentIntentId: data.payment_intent,
    products: lineItems.data,
    total: data.amount_total,
    shipping: data.customer_details,
    paymentStatus: data.payment_status,
  });

  try {
    const savedOrder = await newOrder.save();
    console.log("saved order", savedOrder);
  } catch (err) {
    console.log(err);
  }
};

module.exports = createOrder;

//payment
// const stripe = Stripe(process.env.STRIPE_KEY);

// router.post(express.json({type: 'application/json'}), async (request, response) => {
//   let data;
//   let eventType;

//   const endpointSecret =
//     "wwhsec_6b67b8944bff3b7c9e78bc427d51dbb0171b3ab81e02177f795be405f6cd1cf2";

//   if (endpointSecret) {
//     const sig = request.headers["stripe-signature"];

//     if (sig == null) {
//       throw new Error("No stripe signature found!");
//     }

//     // const stripePayload = request.rawBody || request.body;

//     let event;

//     try {
//       event = stripe.webhooks.constructEvent(
//         stripePayload,
//         sig,
//         endpointSecret
//       );
//       console.log("varified");
//     } catch (err) {
//       console.log(`Webhook Error: ${err.message}`);
//       response.status(400).send(`Webhook Error: ${err.message}`);

//       return;
//     }

//     // Extract the object from the event.
//     data = event.data.object;
//     eventType = event.type;

//     // Handle the event
//     if (eventType === "checkout.session.completed") {

//       stripe.customers
//         .retrieve(data.customer)
//         .then(async (customer) => {

//           console.log(customer);
//           console.log(data);
//           // try {
//           //   // CREATE ORDER
//           //   // createOrder(customer, data);
//           // } catch (err) {

//           //   console.log(err);
//           // }
//         })
//         .catch((err) => console.log(err.message));
//     }

//     // Return a 200 response to acknowledge receipt of the event
//     response.send();
//   }
// });
// module.exports = router;
