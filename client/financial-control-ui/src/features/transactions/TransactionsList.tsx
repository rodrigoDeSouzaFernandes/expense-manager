import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { PageHeader } from "../../components/PageHeader";

import { useTransactionsList } from "./hooks/useTransactionsList";
import TableSkeleton from "@/components/TableSkeleton";
import CreateTransactionDialog from "./CreateTransactionDialog";
import { getTransactionGridColumns } from "./grid/getTransactionGridColumns";
import DeleteTransactionDialog from "./DeleteTransactionDialog";

export const TransactionsList = () => {
  const {
    transactions,
    isTransactionsListLoading,
    createTransaction,
    isCreationPending,
    openCreateTransactionDialog,
    closeCreateTransactionDialog,
    createTransactionDialogOpen,
    closeDeleteTransactionDialog,
    deleteTransactionDialogProps,
    openDeleteTransactionDialog,
  } = useTransactionsList();

  const gridColumns = getTransactionGridColumns(openDeleteTransactionDialog);

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

      <DeleteTransactionDialog
        {...deleteTransactionDialogProps}
        onDelete={() => {}}
        onClose={closeDeleteTransactionDialog}
        isLoading={false}
      />
    </Box>
  );
};
