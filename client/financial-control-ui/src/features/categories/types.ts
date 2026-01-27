import { categoryType } from "./enums";

export type CategoryRow = {
  id: number;
  name: string;
  type: string;
};

type CategoryType = (typeof categoryType)[keyof typeof categoryType];

export interface Category {
  id: string;
  name: string;
  type: CategoryType;
}

export type CreateCategoryDTO = Omit<Category, "id">;
