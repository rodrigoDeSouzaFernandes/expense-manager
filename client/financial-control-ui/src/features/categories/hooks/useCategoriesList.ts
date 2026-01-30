import { useState } from "react";
import {
  useCategoryListQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
} from "../queries";
import {
  type DeleteCategoryDialogProps,
  type Category,
  type CategoryFormData,
  type CreateCategoryDTO,
} from "../types";
import { enqueueSnackbar } from "notistack";

export const useCategoriesList = () => {
  const [createCategoryDialogOpen, setCreateCategoryDialogOpen] =
    useState<boolean>(false);

  const [deleteCategoryDialogProps, setDeleteCategoryDialogProps] = useState<
    Pick<DeleteCategoryDialogProps, "open" | "category">
  >({
    open: false,
    category: null,
  });

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
        enqueueSnackbar("Categoria criada com sucesso!", { variant: "success" })
      },
      onError: (error) => {
        enqueueSnackbar(error?.response?.data?.message || "Erro ao criar categoria. Tente novamente.", { variant: "error" });
      }
    });
  };

  const deleteCategory = () => {
    if (!deleteCategoryDialogProps.category?.id) return;

    deleteCategoryMutation(deleteCategoryDialogProps.category.id, {
      onSuccess: () => {
        setDeleteCategoryDialogProps({ open: false, category: null });
        enqueueSnackbar("Categoria deletada com sucesso!", { variant: "success" })

      },
      onError: (error) => {
        enqueueSnackbar(error?.response?.data?.message || "Erro ao deletar categoria. Tente novamente.", { variant: "error" });
      }
    });
  };

  const openDeleteCategoryDialog = (category: Category) => {
    setDeleteCategoryDialogProps({ open: true, category });
  };

  const closeDeleteCategoryDialog = () => {
    setDeleteCategoryDialogProps({ open: false, category: null });
  };

  return {
    categories,
    isCategoriesLoading,
    createCategory,
    isCreationPending,
    isDeletionPending,
    createCategoryDialogOpen,
    setCreateCategoryDialogOpen,
    deleteCategoryDialogProps,
    setDeleteCategoryDialogProps,
    openDeleteCategoryDialog,
    closeDeleteCategoryDialog,
    deleteCategory,
  };
};
