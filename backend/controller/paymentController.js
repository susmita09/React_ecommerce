const Stripe = require("stripe");
const dotenv = require("dotenv");
dotenv.config();

//payment
const stripe = Stripe(process.env.STRIPE_KEY);
 
const payment = async (req, res, next) => {
  // const cart = req.body.cartItems.map((item) => {
  //   return {
  //     name: item.title,
  //     des: item.des,
  //     price: item.price,
  //     img: item.img[0].url,
  //     quantity: item.quantity,
  //   };
  //   cart: JSON.stringify(cart),
  // });
  const customer = await stripe.customers.create({
    metadata: {
      userId: req.body.userId,
     
    },
  });

  const line_items = req.body.cartItems.map((item) => {
    return {
      price_data: {
        currency: "INR",
        product_data: {
          name: item.title,
          images: [item.img[0].url],
          description: item.des,

          metadata: {
            id: item._id,
          },
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_address_collection: {
      allowed_countries: ["US", "CA", "IN"],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 0,
            currency: "INR",
          },
          display_name: "Free shipping",
          // Delivers between 5-7 business days
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 5,
            },
            maximum: {
              unit: "business_day",
              value: 7,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 1500,
            currency: "INR",
          },
          display_name: "Next day air",
          // Delivers in exactly 1 business day
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 1,
            },
            maximum: {
              unit: "business_day",
              value: 1,
            },
          },
        },
      },
    ],
    phone_number_collection: {
      enabled: true,
    },
   
    line_items,
    mode: "payment",
    customer: customer.id,
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
  });

  res.send({ url: session.url });
};


//CREATE ORDER

// const createOrder = async (customer, data) => {
//   console.log(customer);
// };

//stripe webhook

// This is your Stripe CLI webhook secret for testing your endpoint locally.

module.exports = {
  payment,
};
