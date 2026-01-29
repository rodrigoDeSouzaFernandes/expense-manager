import type z from "zod";
import { categoryType } from "./enums";
import type { categorySchema } from "./schemas/categorySchema";

export type CategoryRow = {
  id: number;
  name: string;
  type: string;
};

export type CategoryType = (typeof categoryType)[keyof typeof categoryType];

export interface Category {
  id: string;
  name: string;
  type: CategoryType;
}

export type CreateCategoryDTO = Omit<Category, "id">;

export type CategoryFormData = z.infer<typeof categorySchema>;

export interface CreateCategoryDialogProps {
  open: boolean;
  onClose: () => void;
  onCreate: (data: CategoryFormData) => void;
  isLoading: boolean;
}
