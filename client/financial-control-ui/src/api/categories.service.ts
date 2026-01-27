import { client } from "./client";

import type { Category, CreateCategoryDTO } from "@/features/categories/types";

export const getCategories = async (): Promise<Category[]> => {
  const response = await client.get<Category[]>("/categories");
  return response.data;
};

export const createCategory = async (
  category: CreateCategoryDTO,
): Promise<Category> => {
  const response = await client.post<Category>("/categories", category);
  return response.data;
};

export const deleteCategory = async (categoryId: string): Promise<void> => {
  await client.delete(`/categories/${categoryId}`);
};
