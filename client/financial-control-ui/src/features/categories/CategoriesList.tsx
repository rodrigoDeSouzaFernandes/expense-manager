import { Box, IconButton } from "@mui/material";
import { PageHeader } from "../../components/PageHeader";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { Delete } from "@mui/icons-material";
import { useCategoriesList } from "./hooks/useCategoriesList";
import { CategoryTypeMap } from "./CategoryTypeMap";
import { CreateCategoryDialog } from "./CreateCategoryDialog";
import TableSkeleton from "@/components/TableSkeleton";
import DeleteCategoryDialog from "./DeleteCategoryDialog";
import type { Category } from "./types";
import { useMemo } from "react";

const getCategoriesGridColumns = (
  onDelete: (category: Category) => void,
): GridColDef[] => [
  {
    field: "name",
    headerName: "Categoria",
    flex: 1,
  },
  {
    field: "type",
    headerName: "Tipo",
    flex: 1,
    renderCell: (params) => <CategoryTypeMap type={params.value} />,
  },
  {
    field: "actions",
    headerName: "Remover",
    sortable: false,
    filterable: false,
    renderCell: (params) => (
      <IconButton onClick={() => onDelete(params.row as Category)}>
        <Delete sx={{ "&:hover": { color: "error.main" } }} />
      </IconButton>
    ),
  },
];

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
    deleteCategory
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
      {
        ...deleteCategoryDialogProps
      }
      isLoading={isDeletionPending}
      onClose={closeDeleteCategoryDialog}
      onDelete={deleteCategory}
       />
    </Box>
  );
};
