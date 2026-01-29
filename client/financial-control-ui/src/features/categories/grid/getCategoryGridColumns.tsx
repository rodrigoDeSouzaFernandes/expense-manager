import type { GridColDef } from "@mui/x-data-grid";
import type { Category } from "../types";
import { CategoryTypeMap } from "../CategoryTypeMap";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";

export const getCategoriesGridColumns = (
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