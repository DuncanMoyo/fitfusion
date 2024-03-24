"use server";

import { establishDatabaseConnection } from "@/mongodb";
import Category from "@/mongodb/models/category.model";
import { CreateCategoryParams } from "@/types";
import { handleError } from "../utils";

export const createCategory = async ({
  categoryName,
}: CreateCategoryParams) => {
  try {
    await establishDatabaseConnection();

    const newCategory = await Category.create({ name: categoryName });

    return JSON.parse(JSON.stringify(newCategory));
  } catch (error) {
    handleError(error);
  }
};

export const getAllCategories = async () => {
  try {
    await establishDatabaseConnection();

    const categories = await Category.find();

    return JSON.parse(JSON.stringify(categories));
  } catch (error) {
    handleError(error);
  }
};
