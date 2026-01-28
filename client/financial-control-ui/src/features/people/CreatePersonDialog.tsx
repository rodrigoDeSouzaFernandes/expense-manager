import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import PersonForm from "./PersonForm";
import type { CreatePersonDialogProps } from "./types";

export const CreatePersonDialog = ({
  open,
  onClose,
  onCreate,
  isLoading,
}: CreatePersonDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth disableRestoreFocus>
      <DialogTitle>Criar Pessoa</DialogTitle>

      <DialogContent>
        <PersonForm
          onSubmit={onCreate}
          onCancel={onClose}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
};
