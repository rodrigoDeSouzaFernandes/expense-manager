import { Alert, AlertTitle, Box, IconButton, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import TableSkeleton from "@/components/TableSkeleton";
import { usePersonDetails } from "./hooks/usePersonDetails";
import { getTransactionGridColumns } from "../transactions/grid/getTransactionGridColumns";
import DeleteTransactionDialog from "../transactions/DeleteTransactionDialog";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import TotalsDashboard from "@/components/TotalDashboard";

export const PersonDetails = () => {
  const {
    person,
    isLoading,
    isError,
    transactions,
    openDeleteTransactionDialog,
    closeDeleteTransactionDialog,
    deleteTransactionDialogProps,
    deleteTransaction,
    isDeletionPending,
    totals,
  } = usePersonDetails();

  const gridColumns = getTransactionGridColumns(openDeleteTransactionDialog);

  const navigate = useNavigate();

  return (
    <Box>
      <Box sx={{ mb: 3, display: "flex", alignItems: "center", gap: 2 }}>
        <IconButton
          onClick={() => navigate(-1)}
          aria-label="Voltar para a listagem de pessoas"
        >
          <ArrowBack />
        </IconButton>
        <Typography variant="h1" fontSize={24} fontWeight={500}>
          Transações de {person?.name || "Pessoa"}
        </Typography>
      </Box>

      {isError ? (
        <Alert color="error">
          <AlertTitle>Erro</AlertTitle>
          Houve um problema ao carregar os dados, tente novamente mais tarde.
        </Alert>
      ) : null}
      {isLoading ? (
        <TableSkeleton columns={6} rows={5} />
      ) : (
        <>
          <TotalsDashboard {...totals} />
          <Box
            sx={{
              height: { xs: "calc(100vh - 86px)", sm: "calc(100vh - 300px)" },
            }}
          >
            <DataGrid rows={transactions || []} columns={gridColumns} />
          </Box>
        </>
      )}

      <DeleteTransactionDialog
        {...deleteTransactionDialogProps}
        onDelete={deleteTransaction}
        onClose={closeDeleteTransactionDialog}
        isLoading={isDeletionPending}
      />
    </Box>
  );
};
