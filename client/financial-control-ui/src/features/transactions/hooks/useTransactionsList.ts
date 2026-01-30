import { formatDate } from "@/utils/date";
import {
  useCreateTransactionMutation,
  useDeleteTransactionMutation,
  useTransactionsListQuery,
} from "../queries";
import type { CreateTransactionDTO, DeleteTransactionDialogProps, TransactionFormData, TransactionRow, TransactionType } from "../types";
import { useMemo, useState } from "react";
import { TRANSACTION_TYPES } from "../enums";
import { useSnackbar } from "notistack";

export const useTransactionsList = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [createTransactionDialogOpen, setCreateTransactionDialogOpen] = useState<boolean>(false);

  const [deleteTransactionDialogProps, setDeleteTransactionDialogProps] = useState<Pick<DeleteTransactionDialogProps, "open" | "transaction">>({
    open: false,
    transaction: null,
  })

  const { data, isLoading: isTransactionsListLoading } =
    useTransactionsListQuery();

  const { mutate: createTransactionMutation, isPending: isCreationPending } =
    useCreateTransactionMutation();

  const { mutate: deleteTransactionMutation, isPending: isDeletionPending } =
    useDeleteTransactionMutation();

  const transactions: TransactionRow[] = useMemo(() => {
    if (!data) return [];

    return data.map((t) => ({
      id: t.id,
      date: formatDate(t.date),
      description: t.description || "",
      category: t.category.name,
      person: t.person.name,
      type: TRANSACTION_TYPES[t.type].label,
      amount: t.amount,
    }));
  }, [data]);


  const openCreateTransactionDialog = () => {
    setCreateTransactionDialogOpen(true);
  }

  const closeCreateTransactionDialog = () => {
    setCreateTransactionDialogOpen(false);
  }

  const openDeleteTransactionDialog = (transaction: TransactionRow) => {
    setDeleteTransactionDialogProps({
      open: true, transaction
    })
  }

  const closeDeleteTransactionDialog = () => {
    setDeleteTransactionDialogProps({
      open: false,
      transaction: null,
    })
  }

  const createTransaction = (data: TransactionFormData) => {

    const formattedData: CreateTransactionDTO = {
      ...data,
      type: Number(data.type) as TransactionType,
      amount: Number(data.amount.replace(/\D/g, '')) / 100,
    };

    createTransactionMutation(formattedData, {
      onSuccess: () => {
        closeCreateTransactionDialog();
        enqueueSnackbar("Transação criada com sucesso!", { variant: "success" });
      },
      onError: (error) => {
        enqueueSnackbar(error?.response?.data?.message || "Erro ao criar transação. Tente novamente.", { variant: "error" });
      }
    });
  }

  const deleteTransaction = (): void => {
    if (!deleteTransactionDialogProps.transaction?.id) {
      enqueueSnackbar("Não foi possível deletar transação. Recarregue a página e tente novamente mais tarde.", { variant: "error" });
      return;
    };

    deleteTransactionMutation(deleteTransactionDialogProps.transaction?.id, {
      onSuccess: () => {
        closeDeleteTransactionDialog();
        enqueueSnackbar("Transação deletada com sucesso!", { variant: "success" });
      },
      onError: (error) => {
        enqueueSnackbar(error?.response?.data?.message || "Erro ao deletar transação. Tente novamente.", { variant: "error" });
      }
    })
  }




  return {
    transactions,
    isTransactionsListLoading,
    createTransaction,
    isCreationPending,
    openCreateTransactionDialog,
    closeCreateTransactionDialog,
    createTransactionDialogOpen,
    openDeleteTransactionDialog,
    closeDeleteTransactionDialog,
    deleteTransactionDialogProps,
    deleteTransaction,
    isDeletionPending
  };
};
