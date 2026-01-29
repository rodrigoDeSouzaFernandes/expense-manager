import { useState } from "react";
import {
  useCategoryListQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
} from "../queries";
import type { CategoryFormData, CreateCategoryDTO } from "../types";

export const useCategoriesList = () => {
  const [createCategoryDialogOpen, setCreateCategoryDialogOpen] =
    useState<boolean>(false);

  const { data: categories, isLoading: isCategoriesLoading } =
    useCategoryListQuery();

  const { mutate: createCategoryMutation, isPending: isCreationPending } =
    useCreateCategoryMutation();

  const { mutate: deleteCategoryMutation, isPending: isDeletionPending } =
    useDeleteCategoryMutation();

  const createCategory = (data: CategoryFormData) => {
    createCategoryMutation(data as CreateCategoryDTO, {
      onSuccess: () => {
        setCreateCategoryDialogOpen(false);
      },
    });
  };

  return {
    categories,
    isCategoriesLoading,
    createCategory,
    isCreationPending,
    deleteCategoryMutation,
    isDeletionPending,
    createCategoryDialogOpen,
    setCreateCategoryDialogOpen,
  };
};
