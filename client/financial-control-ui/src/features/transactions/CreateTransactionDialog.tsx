import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import TransactionForm from "./TransactionForm";
import type { CreateTransactionDialogProps } from "./types";

const CreateTransactionDialog = ({
  open,
  onClose,
  onCreate,
  isLoading,
}: CreateTransactionDialogProps) => {
  return (
    <Dialog fullWidth open={open} onClose={onClose} disableRestoreFocus>
      <DialogTitle>Criar Transação </DialogTitle>
      <DialogContent>
        <TransactionForm
          onSubmit={onCreate}
          onCancel={onClose}
          isCreationLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateTransactionDialog;
