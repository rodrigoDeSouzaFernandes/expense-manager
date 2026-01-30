import { Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import type { Person } from "../types";
import type { GridColDef } from "@mui/x-data-grid";

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
  },
  {
    field: "totalIncome",
    headerName: "Receitas",

    type: "number",
  },
  {
    field: "balance",
    headerName: "Saldo",

    type: "number",
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
