import {
  useCategoryListQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
} from "../queries";
import type { CreateCategoryDTO } from "../types";

export const useCategoriesList = () => {
  const { data: categories, isLoading: isCategoriesLoading } =
    useCategoryListQuery();

  const { mutate: createCategoryMutation, isPending: isCreationPending } =
    useCreateCategoryMutation();

  const { mutate: deleteCategoryMutation, isPending: isDeletionPending } =
    useDeleteCategoryMutation();

  const createCategory = (data: CreateCategoryDTO) => {
    createCategoryMutation(data);
  };

  return {
    categories,
    isCategoriesLoading,
    createCategory,
    isCreationPending,
    deleteCategoryMutation,
    isDeletionPending,
  };
};
