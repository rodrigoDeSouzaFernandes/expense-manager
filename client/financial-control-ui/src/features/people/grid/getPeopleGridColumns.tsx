import { Delete } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import type { Person } from "../types";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { formatCurrency } from "@/utils/currency";

export const getPeopleGridColumns = (
  onDelete: (person: Person) => void,
): GridColDef[] => [
  {
    field: "name",
    headerName: "Nome",
    flex: 1,
    minWidth: 150,
  },
  {
    field: "age",
    headerName: "Idade",

    type: "number",
  },
  {
    field: "totalExpenses",
    headerName: "Despesas",
    type: "number",
    renderCell: (param) => formatCurrency(param.value),
  },
  {
    field: "totalIncome",
    headerName: "Receitas",
    type: "number",
    renderCell: (param) => formatCurrency(param.value),
  },
  {
    field: "balance",
    headerName: "Saldo",
    type: "number",
    renderCell: (params: GridRenderCellParams) => {
      return (
        <Typography
          color={params.value < 0 ? "error" : "success"}
          component="span"
          fontSize={14}
        >
          {formatCurrency(params.value)}
        </Typography>
      );
    },
  },
  {
    field: "remove",
    headerName: "Excluir",
    width: 65,
    sortable: false,
    filterable: false,
    renderCell: (params) => (
      <IconButton
        aria-label={`Exluir pessoa ${params?.row?.name}`}
        onClick={(e) => {
          e.stopPropagation();
          onDelete(params.row as Person);
        }}
      >
        <Delete sx={{ "&:hover": { color: "error.main" } }} />
      </IconButton>
    ),
  },
];
