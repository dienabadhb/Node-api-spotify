import Stripe from "stripe";
import "dotenv/config";
import { sendPaymentConfirmation } from "./email_Paiement"; 


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const createCustomer = async (email: string) => {
  const customer = await stripe.customers.create({ email });
  return customer;
};

// Fonction modifiée pour prendre un objet
export const createCheckoutSession = async ({
  customerId,
  userId,
  customerEmail,
  productName,
  totalAmount,
}: {
  customerId: string;
  userId: number;
  customerEmail: string;
  productName: string;
  totalAmount: number;
}) => {
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

  // Envoi mail de confirmation
  try {
    await sendPaymentConfirmation({
      to: customerEmail,
      amount: totalAmount,
      productName,
    });
  } catch (err) {
    console.error("Erreur envoi email paiement:", err);
  }

  return session;
};
