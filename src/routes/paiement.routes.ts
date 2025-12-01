import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
import { updateUserPremiumStatus } from "../utils/user.service";

dotenv.config();

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);


router.post(
  "/webhook",
  express.raw({ type: "application/json" }), 
  async (req, res) => {
    const signature = req.headers["stripe-signature"] as string;
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET as string 
      );
    } catch (err: any) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as any;
      console.log("Subscription active for user:", session.metadata.userId);

    
      await updateUserPremiumStatus(Number(session.metadata.userId), true);
    }

    res.json({ received: true });
  }
);

export default router;
