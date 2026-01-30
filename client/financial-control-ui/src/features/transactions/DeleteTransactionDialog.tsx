import {
  Alert,
  AlertTitle,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import type { DeleteTransactionDialogProps } from "./types";
import { formatCurrency } from "@/utils/currency";

const DeleteTransactionDialog = ({
  open,
  onClose,
  transaction,
  onDelete,
  isLoading,
}: DeleteTransactionDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth disableRestoreFocus>
      <DialogTitle>Deletar Transação</DialogTitle>
      <DialogContent>
        <Alert severity="warning" sx={{ mb: 2 }}>
          <AlertTitle>Atenção</AlertTitle>
          Esta ação é irreversível e irá deletar esta transação
          <ul style={{ listStyle: "none", paddingLeft: 16 }}>
            <li>Pessoa: {transaction?.person}</li>
            <li>Valor: {formatCurrency(transaction?.amount || 0)}</li>
            <li>Tipo: {transaction?.type}</li>
          </ul>
        </Alert>
        <Typography>Tem certeza que deseja deletar esta transação?</Typography>
        <Box mt={3} display="flex" gap={2} justifyContent="flex-end">
          <Button variant="outlined" color="error" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            disabled={isLoading}
            variant="contained"
            color="error"
            onClick={onDelete}
            sx={{ width: 100 }}
          >
            {isLoading ? (
              <CircularProgress
                size={20}
                sx={{ color: "primary.contrastText" }}
              />
            ) : (
              "Deletar"
            )}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteTransactionDialog;
