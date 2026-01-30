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
    deleteTransaction,
    isDeletionPending,
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
        <Box
          sx={{
            height: { xs: "calc(100vh - 86px)", sm: "calc(100vh - 180px)" },
          }}
        >
          <DataGrid rows={transactions || []} columns={gridColumns} />
        </Box>
      )}

      <CreateTransactionDialog
        open={createTransactionDialogOpen}
        onClose={closeCreateTransactionDialog}
        onCreate={createTransaction}
        isLoading={isCreationPending}
      />

      <DeleteTransactionDialog
        {...deleteTransactionDialogProps}
        onDelete={deleteTransaction}
        onClose={closeDeleteTransactionDialog}
        isLoading={isDeletionPending}
      />
    </Box>
  );
};
