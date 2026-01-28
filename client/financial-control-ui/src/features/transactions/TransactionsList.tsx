import { Box, Chip, Paper, Typography } from "@mui/material";
import {
  DataGrid,
  type GridColDef,
  type GridRenderCellParams,
  type GridRowModel,
} from "@mui/x-data-grid";
import { PageHeader } from "../../components/PageHeader";
import type { TransactionRow } from "./types";
import { formatCurrency } from "@/utils/currency";

const gridRows: GridRowModel<TransactionRow>[] = [
  {
    id: 1,
    date: "10/01/2026",
    description: "Salário mensal",
    category: "Salário",
    person: "João Silva",
    type: "Receita",
    amount: 7500,
  },
  {
    id: 2,
    date: "12/01/2026",
    description: "Supermercado",
    category: "Alimentação",
    person: "Maria Souza",
    type: "Despesa",
    amount: 450.75,
  },
  {
    id: 3,
    date: "15/01/2026",
    description: "Combustível",
    category: "Transporte",
    person: "João Silva",
    type: "Despesa",
    amount: 220,
  },
];

const gridColumns: GridColDef[] = [
  {
    field: "date",
    headerName: "Data",
    width: 130,
  },
  {
    field: "description",
    headerName: "Descrição",
    flex: 1,
    minWidth: 180,
  },
  {
    field: "category",
    headerName: "Categoria",
    flex: 1,
  },
  {
    field: "person",
    headerName: "Pessoa",
    flex: 1,
  },
  {
    field: "type",
    headerName: "Tipo",
    width: 130,
    renderCell: (params: GridRenderCellParams) => {
      const type =
        (params.value as TransactionRow["type"] | undefined) ?? "Despesa";
      const color = type === "Receita" ? "success" : "error";
      return <Chip label={type} color={color} size="small" />;
    },
  },
  {
    field: "amount",
    headerName: "Valor",
    width: 160,
    align: "right",
    headerAlign: "right",
    type: "number",
    renderCell: (params: GridRenderCellParams) => (
      <Typography component="span" fontWeight={500}>
        {formatCurrency(params.value)}
      </Typography>
    ),
  },
];

export const TransactionsList = () => {
  return (
    <Box>
      <PageHeader title="Transações" actionLabel="Cadastrar transação" />
      <Paper>
        <DataGrid
          autoHeight
          rows={gridRows}
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
