import { Box, IconButton, Paper } from "@mui/material";
import { PageHeader } from "../../components/PageHeader";
import type { CategoryRow } from "./types";
import { DataGrid, type GridColDef, type GridRowModel } from "@mui/x-data-grid";
import { Delete } from "@mui/icons-material";
import { useCategoriesList } from "./hooks/useCategoriesList";
import { CategoryTypeMap } from "./CategoryTypeMap";

const gridRows: GridRowModel<CategoryRow>[] = [
  {
    id: 1,
    name: "Salário",
    type: "Receita",
  },
  {
    id: 2,
    name: "Alimentação",
    type: "Despesa",
  },
  {
    id: 3,
    name: "Transporte",
    type: "Despesa",
  },
];

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
