import { Box, Chip, Typography } from "@mui/material";
import {
  DataGrid,
  type GridColDef,
  type GridRenderCellParams,
} from "@mui/x-data-grid";
import { PageHeader } from "../../components/PageHeader";
import type { TransactionRow } from "./types";
import { formatCurrency } from "@/utils/currency";
import { useTransactionsList } from "./hooks/useTransactionsList";
import TableSkeleton from "@/components/TableSkeleton";
import CreateTransactionDialog from "./CreateTransactionDialog";
import { TRANSACTION_TYPES, transactionType } from "./enums";

const gridColumns: GridColDef[] = [
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
    renderCell: (params: GridRenderCellParams) => {
      const type =
        (params.value as TransactionRow["type"] | undefined) ?? "Despesa";
      const color = type === "Receita" ? "success" : "error";
      return (
        <Chip label={type} variant="outlined" color={color} size="small" />
      );
    },
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
];

export const TransactionsList = () => {
  const {
    transactions,
    isTransactionsListLoading,
    createTransaction,
    isCreationPending,
    openCreateTransactionDialog,
    closeCreateTransactionDialog,
    createTransactionDialogOpen,
  } = useTransactionsList();

  return (
    <Box>
      <PageHeader
        title="Transações"
        actionLabel="Cadastrar transação"
        onActionClick={openCreateTransactionDialog}
      />
      {isTransactionsListLoading ? (
        <TableSkeleton columns={6} rows={5} />
      ) : (
        <DataGrid
          autoHeight
          rows={transactions || []}
          columns={gridColumns}
          disableColumnMenu
          disableColumnResize
          hideFooter
          showToolbar
          disableColumnFilter
        />
      )}

      <CreateTransactionDialog
        open={createTransactionDialogOpen}
        onClose={closeCreateTransactionDialog}
        onCreate={createTransaction}
        isLoading={isCreationPending}
      />
    </Box>
  );
};
