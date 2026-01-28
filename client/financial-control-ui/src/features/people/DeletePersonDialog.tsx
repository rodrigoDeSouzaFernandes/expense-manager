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
import type { DeletePersonDialogProps } from "./types";

const DeletePersonDialog = ({
  open,
  onClose,
  person,
  onDelete,
  isLoading,
}: DeletePersonDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth disableRestoreFocus>
      <DialogTitle>Deletar Pessoa</DialogTitle>
      <DialogContent>
        <Alert severity="warning" sx={{ mb: 2 }}>
          <AlertTitle>Atenção</AlertTitle>
          Esta ação é irreversível e irá deletar todos os dados relacionados a
          esta pessoa.
        </Alert>
        <Typography>
          Tem certeza que deseja deletar a pessoa "{person?.name}"?
        </Typography>
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

export default DeletePersonDialog;
