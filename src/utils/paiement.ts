import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config(); 

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const createCustomer = async (email: string) => {
  const customer = await stripe.customers.create({ email });
  return customer;
};

export const createCheckoutSession = async (customerId: string, userId: number) => {
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",       
    customer: customerId,        
    payment_method_types: ["card"],

    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID, 
        quantity: 1,
      },
    ],

    success_url: "http://localhost:5173/success",
    cancel_url: "http://localhost:5173/cancel",

    metadata: {
      userId: userId.toString(),  
    },
  });

  return session;
};
