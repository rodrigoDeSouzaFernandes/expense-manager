import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import PersonForm from "./PersonForm";
import { useCreatePersonMutation } from "./queries";

type CreatePersonDialogProps = {
  open: boolean;
  onClose: () => void;
};

export const CreatePersonDialog = ({
  open,
  onClose,
}: CreatePersonDialogProps) => {
  const { mutate: createPerson, isPending } = useCreatePersonMutation();

  const handleSubmit = (data: any) => {
    createPerson(data, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Criar Pessoa</DialogTitle>

      <DialogContent>
        <PersonForm
          onSubmit={handleSubmit}
          onCancel={onClose}
          isLoading={isPending}
        />
      </DialogContent>
    </Dialog>
  );
};
