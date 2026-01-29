import { Box } from "@mui/material";
import { PageHeader } from "../../components/PageHeader";
import { DataGrid } from "@mui/x-data-grid";
import { useCategoriesList } from "./hooks/useCategoriesList";
import { CreateCategoryDialog } from "./CreateCategoryDialog";
import TableSkeleton from "@/components/TableSkeleton";
import DeleteCategoryDialog from "./DeleteCategoryDialog";
import { useMemo } from "react";
import { getCategoriesGridColumns } from "./grid/getCategoryGridColumns";

export const CategoriesList = () => {
  const {
    categories,
    createCategory,
    isCategoriesLoading,
    isCreationPending,
    isDeletionPending,
    createCategoryDialogOpen,
    setCreateCategoryDialogOpen,
    openDeleteCategoryDialog,
    closeDeleteCategoryDialog,
    deleteCategoryDialogProps,
    deleteCategory,
  } = useCategoriesList();

  const gridColumns = useMemo(
    () =>
      getCategoriesGridColumns((category) =>
        openDeleteCategoryDialog(category),
      ),
    [],
  );

  return (
    <Box>
      <PageHeader
        title="Categorias"
        actionLabel="Cadastrar categoria"
        onActionClick={() => setCreateCategoryDialogOpen(true)}
      />

      {isCategoriesLoading ? (
        <TableSkeleton columns={3} rows={5} />
      ) : (
        <DataGrid
          autoHeight
          rows={categories || []}
          columns={gridColumns}
          disableColumnMenu
          disableColumnResize
          hideFooter
          showToolbar
          disableColumnFilter
        />
      )}

      <CreateCategoryDialog
        open={createCategoryDialogOpen}
        onClose={() => setCreateCategoryDialogOpen(false)}
        onCreate={createCategory}
        isLoading={isCreationPending}
      />

      <DeleteCategoryDialog
        {...deleteCategoryDialogProps}
        isLoading={isDeletionPending}
        onClose={closeDeleteCategoryDialog}
        onDelete={deleteCategory}
      />
    </Box>
  );
};
