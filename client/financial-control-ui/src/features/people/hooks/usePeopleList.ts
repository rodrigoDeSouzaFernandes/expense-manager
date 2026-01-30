import { useCallback, useState } from "react";
import {
  useCreatePersonMutation,
  useDeletePersonMutation,
  usePeopleListQuery,
} from "../queries";
import type { CreatePersonDTO, Person } from "../types";
import { enqueueSnackbar } from "notistack";

interface DeletePersonDialogState {
  open: boolean;
  person: Person | null;
}

export const usePeopleList = () => {
  const [createPersonDialogOpen, setCreatePersonDialogOpen] =
    useState<boolean>(false);

  const [deletePersonDialog, setDeletePersonDialog] =
    useState<DeletePersonDialogState>({
      open: false,
      person: null,
    });

  const { data: people, isLoading: isPeopleListLoading } = usePeopleListQuery();

  const { mutate: deletePersonMutation, isPending: isDeletionPending } =
    useDeletePersonMutation();

  const deletePerson = useCallback(() => {
    if (!deletePersonDialog?.person?.id) return;
    deletePersonMutation(deletePersonDialog.person.id, {
      onSuccess: () => {
        setDeletePersonDialog({ open: false, person: null });
        enqueueSnackbar("Pessoa deletada com sucesso!", { variant: "success" });

      },
      onError: (error) => {
        enqueueSnackbar(error?.response?.data?.message || "Erro ao deletar pessoa. Tente novamente.", { variant: "error" });
      }
    });
  }, [deletePersonDialog.person]);

  const { mutate: createPersonMutation, isPending: isCreationPending } =
    useCreatePersonMutation();

  const createPerson = (data: CreatePersonDTO) => {
    createPersonMutation(data, {
      onSuccess: () => {
        setCreatePersonDialogOpen(false);
        enqueueSnackbar("Pessoa cadastrada com sucesso!", { variant: 'success' })
      },
      onError: (error) => {
        enqueueSnackbar(error?.response?.data?.message || "Erro ao cadastrar pessoa. Tente novamente.", { variant: "error" });
      }
    });
  };

  return {
    people,
    isPeopleListLoading,
    createPersonDialogOpen,
    setCreatePersonDialogOpen,
    deletePersonDialog,
    setDeletePersonDialog,
    deletePerson,
    isDeletionPending,
    createPerson,
    isCreationPending,
  };
};
