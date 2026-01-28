import { useCallback, useState } from "react";
import { useDeletePersonMutation, usePeopleListQuery } from "../queries";
import type { Person } from "../types";

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
      },
    });
  }, [deletePersonDialog.person]);

  // const { mutate: createPerson, isCreationPending } = useCreatePersonMutation();

  return {
    people,
    isPeopleListLoading,
    createPersonDialogOpen,
    setCreatePersonDialogOpen,
    deletePersonDialog,
    setDeletePersonDialog,
    deletePerson,
    isDeletionPending,
  };
};
