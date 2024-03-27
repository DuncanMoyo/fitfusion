"use server";

import {
  GetOrdersByEventParams,
  GetOrdersByUserParams,
  OrderCheckoutParams,
  OrderCreateParams,
} from "@/types";
import { handleError } from "../utils";
import Stripe from "stripe";
import { redirect } from "next/navigation";
import { establishDatabaseConnection } from "@/mongodb";
import FitnessOrder from "@/mongodb/models/order.model";
import User from "@/mongodb/models/user.model";
import { ObjectId } from "mongodb";
import FitnessEvent from "@/mongodb/models/fitnessEvent.model";

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

export async function getOrdersByUser({
  userId,
  limit = 3,
  page,
}: GetOrdersByUserParams) {
  try {
    await establishDatabaseConnection();

    const skipAmount = (Number(page) - 1) * limit;
    const conditions = { buyer: userId };

    const orders = await FitnessOrder.distinct("event._id")
      .find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit)
      .populate({
        path: "event",
        model: FitnessEvent,
        populate: {
          path: "organiser",
          model: User,
          select: "_id firstName lastName",
        },
      });

    const ordersCount = await FitnessOrder.distinct("event._id").countDocuments(
      conditions
    );

    return {
      data: JSON.parse(JSON.stringify(orders)),
      totalPages: Math.ceil(ordersCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

export async function getOrdersByEvent({
  searchString,
  eventId,
}: GetOrdersByEventParams) {
  try {
    await establishDatabaseConnection();

    if (!eventId) throw new Error("Event ID is required");
    const eventObjectId = new ObjectId(eventId);

    // console.log("Constructed query:", {
    //   eventId: eventObjectId, // Log the constructed query object
    //   searchString,
    // });

    const orders = await FitnessOrder.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "buyer",
          foreignField: "_id",
          as: "buyer",
        },
      },
      {
        $unwind: "$buyer",
      },
      {
        $lookup: {
          from: "fitnessevents",
          localField: "event",
          foreignField: "_id",
          as: "event",
        },
      },
      {
        $unwind: "$event",
      },
      {
        $project: {
          _id: 1,
          totalAmount: 1,
          createdAt: 1,
          eventTitle: "$event.title",
          eventId: "$event._id",
          buyer: {
            $concat: ["$buyer.firstName", " ", "$buyer.lastName"],
          },
        },
      },
      {
        $match: {
          $and: [
            { eventId: eventObjectId },
            { buyer: { $regex: RegExp(searchString, "i") } },
          ],
        },
      },
    ]).catch((error) => {
      console.error("Error during aggregation:", error);
      throw error;
    });

    return JSON.parse(JSON.stringify(orders));
  } catch (error) {
    handleError(error);
  }
}
