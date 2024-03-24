"use server";

import { CreateEventParams } from "@/types";
import { handleError } from "../utils";
import { establishDatabaseConnection } from "@/mongodb";
import User from "@/mongodb/models/user.model";
import FitnessEvent from "@/mongodb/models/fitnessEvent.model";

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
