"use server";

import { CreateEventParams, GetAllEventParams } from "@/types";
import { handleError } from "../utils";
import { establishDatabaseConnection } from "@/mongodb";
import User from "@/mongodb/models/user.model";
import FitnessEvent from "@/mongodb/models/fitnessEvent.model";
import Category from "@/mongodb/models/category.model";

const populateEvent = async (query: any) => {
  return query
    .populate({
      path: "organiser",
      model: User,
      select: "_id firstName lastName",
    })
    .populate({ path: "category", model: Category, select: "_id name" });
};

export const createEvent = async ({
  userId,
  event,
  path,
}: CreateEventParams) => {
  try {
    await establishDatabaseConnection();

    const organiser = await User.findById(userId);

    if (!organiser) {
      throw new Error("Could not find event organiser");
    }

    const newEvent = await FitnessEvent.create({
      ...event,
      category: event.categoryId,
      organiser: userId,
    });

    return JSON.parse(JSON.stringify(newEvent));
  } catch (error) {
    handleError(error);
  }
};

export const getEventById = async (eventId: string) => {
  try {
    await establishDatabaseConnection();

    const event = await populateEvent(FitnessEvent.findById(eventId));

    if (!event) {
      throw new Error("Could not find the event");
    }

    return JSON.parse(JSON.stringify(event));
  } catch (error) {
    handleError(error);
  }
};

export const getAllEvents = async ({
  query,
  limit = 6,
  page,
  category,
}: GetAllEventParams) => {
  try {
    await establishDatabaseConnection();

    const conditions = {};

    const eventsQuery = FitnessEvent.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(0)
      .limit(limit);

    const events = await populateEvent(eventsQuery);
    const eventsCount = await FitnessEvent.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(events)),
      totalPages: Math.ceil(eventsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
};
