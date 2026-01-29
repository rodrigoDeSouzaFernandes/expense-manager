import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import type { CreateCategoryDialogProps } from "./types";
import CategoryForm from "./CategoryForm";

export const CreateCategoryDialog = ({
  open,
  onClose,
  onCreate,
  isLoading,
}: CreateCategoryDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth disableRestoreFocus>
      <DialogTitle>Criar Categoria</DialogTitle>

      <DialogContent>
        <CategoryForm
          onSubmit={onCreate}
          onCancel={onClose}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
};
