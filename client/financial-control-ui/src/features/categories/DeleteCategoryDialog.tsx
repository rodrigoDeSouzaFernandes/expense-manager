import {
  Alert,
  AlertTitle,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import type { DeleteCategoryDialogProps } from "./types";

const DeleteCategoryDialog = ({
  open,
  onClose,
  category,
  onDelete,
  isLoading,
}: DeleteCategoryDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth disableRestoreFocus>
      <DialogTitle>Deletar Categoria</DialogTitle>
      <DialogContent>
        <Alert severity="warning" sx={{ mb: 2 }}>
          <AlertTitle>Atenção</AlertTitle>
          Esta ação é irreversível e irá deletar esta categoria.
        </Alert>
        <Typography sx={{ mb: 2 }}>
          Tem certeza que deseja deletar a categoria "{category?.name}"?
        </Typography>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={[1,2]}
          justifyContent="flex-end"
        >
          <Button variant="outlined" color="error" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            disabled={isLoading}
            variant="contained"
            color="error"
            onClick={onDelete}
            sx={{ width: { xs: "100%", sm: 100 } }}
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
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCategoryDialog;
