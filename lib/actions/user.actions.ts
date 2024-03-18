"use server";

import { CreateUserParams } from "@/types";
import { handleError } from "../utils";
import { establishDatabaseConnection } from "@/mongodb";
import User from "@/mongodb/models/user.model";

export const createUser = async (user: CreateUserParams) => {
  try {
    await establishDatabaseConnection();

    const newUser = await User.create(user);

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
};
