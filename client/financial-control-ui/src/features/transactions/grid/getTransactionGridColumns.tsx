import { formatCurrency } from "@/utils/currency";
import { Delete } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { TransactionTypeMap } from "../TransactionTypeMap";
import type { TransactionRow } from "../types";

export const getTransactionGridColumns = (
  onDelete: (transaction: TransactionRow) => void,
): GridColDef[] => [
  {
    field: "person",
    headerName: "Pessoa",
    flex: 1,
    minWidth: 150,
  },
  {
    field: "description",
    headerName: "Descrição",
    minWidth: 180,
    flex: 1,
  },
  {
    field: "category",
    headerName: "Categoria",
    minWidth: 150,
    flex: 1,
  },
  {
    field: "type",
    headerName: "Tipo",
    renderCell: (params: GridRenderCellParams) => (
      <TransactionTypeMap type={params.value} />
    ),
  },
  {
    field: "amount",
    headerName: "Valor",
    align: "right",
    headerAlign: "right",
    type: "number",

    minWidth: 150,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <Typography
          color={params.row.type === "Despesa" ? "error" : "success"}
          component="span"
          fontWeight={500}
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
      <IconButton onClick={() => onDelete(params.row as TransactionRow)}>
        <Delete sx={{ "&:hover": { color: "error.main" } }} />
      </IconButton>
    ),
  },
];
