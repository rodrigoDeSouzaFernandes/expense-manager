import { Box, IconButton, Paper } from "@mui/material";
import { PageHeader } from "../../components/PageHeader";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { Delete } from "@mui/icons-material";
import { useCategoriesList } from "./hooks/useCategoriesList";
import { CategoryTypeMap } from "./CategoryTypeMap";

const gridColumns: GridColDef[] = [
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
    renderCell: () => (
      <IconButton>
        <Delete sx={{ "&:hover": { color: "error.main" } }} />
      </IconButton>
    ),
  },
];

export const CategoriesList = () => {
  const {
    categories,
    createCategory,
    deleteCategoryMutation,
    isCategoriesLoading,
    isCreationPending,
    isDeletionPending,
  } = useCategoriesList();

  return (
    <Box>
      <PageHeader title="Categorias" actionLabel="Cadastrar categoria" />
      <Paper>
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
      </Paper>
    </Box>
  );
};
