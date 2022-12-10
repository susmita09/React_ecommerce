const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const Stripe = require("stripe");

//routes
const authRoutes = require("./routes/authR");
const userRoutes = require("./routes/user");
const productsRoutes = require("./routes/productR");
const stripeRoutes = require("./routes/stripe");
const ordersRoutes = require("./routes/OrderR");

//create order function
const createOrder = require("./routes/stripeWeb");

const app = express();
dotenv.config();

Port = 8000;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("dbconnection success");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors());

//CREATING ORDER IN DATABASE

const stripe = Stripe(process.env.STRIPE_KEY);
const endpointSecret =
  "whsec_6b67b8944bff3b7c9e78bc427d51dbb0171b3ab81e02177f795be405f6cd1cf2";
app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (request, response) => {
    let data;
    let eventType;

    let event;

    // Only verify the event if you have an endpoint secret defined.
    // Otherwise use the basic event deserialized with JSON.parse
    if (endpointSecret) {
      //   // Get the signature sent by Stripe
      const signature = request.headers["stripe-signature"];

      try {
        event = stripe.webhooks.constructEvent(
          request.body,
          signature,
          endpointSecret
        );
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message);
        return response.sendStatus(400);
      }
    }
    // console.log(event);
    data = event.data.object;
    eventType = event.type;

    // // Handle the event
    if (eventType === "checkout.session.completed") {
      stripe.customers
        .retrieve(data.customer)
        .then(async (customer) => {
          // console.log(customer);
          // console.log(data);
          stripe.checkout.sessions.listLineItems(
            data.id,
            {},
            function (err, lineItems) {
              // asynchronously called
              console.log(lineItems);

              try {
                // CREATE ORDER
                createOrder(customer, data, lineItems);
              } catch (err) {
                console.log(err);
              }
            }
          );
        })
        .catch((err) => console.log(err.message));
    }

    // Return a 200 response to acknowledge receipt of the event
    response.status(200).send();
  }
);

app.use(express.json({ limit: "25mb" })); //parsing json data

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/stripe", stripeRoutes);
app.use("/api/orders", ordersRoutes);
//"http://localhost:8000/api/stripe/payment"
app.listen(process.env.PORT || Port, () => {
  console.log("server is runnning");
});
