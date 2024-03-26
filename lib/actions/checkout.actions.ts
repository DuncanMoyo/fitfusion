"use server";

import { OrderCheckoutParams, OrderCreateParams } from "@/types";
import { handleError } from "../utils";
import Stripe from "stripe";
import { redirect } from "next/navigation";
import { establishDatabaseConnection } from "@/mongodb";
import FitnessOrder from "@/mongodb/models/order.model";

export const orderCheckout = async (checkout: OrderCheckoutParams) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const price = checkout.isFree ? 0 : Number(checkout.price) * 100;
  try {
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "zar",
            unit_amount: price,
            product_data: {
              name: checkout.eventTitle,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        eventId: checkout.eventId,
        buyerId: checkout.buyerId,
      },
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
    });
    redirect(session.url!);
  } catch (error) {
    throw error;
  }
};

export const createOrder = async (order: OrderCreateParams) => {
  try {
    await establishDatabaseConnection();

    const newOrder = await FitnessOrder.create({
      ...order,
      event: order.eventId,
      buyer: order.buyerId,
    });

    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    handleError(error);
  }
};
