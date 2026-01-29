import { formatDate } from "@/utils/date";
import {
  useCreateTransactionMutation,
  useTransactionsListQuery,
} from "../queries";
import type { CreateTransactionDTO, TransactionFormData, TransactionRow, TransactionType } from "../types";
import { useMemo, useState } from "react";
import { TRANSACTION_TYPES } from "../enums";
import { useSnackbar } from "notistack";

export const useTransactionsList = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [createTransactionDialogOpen, setCreateTransactionDialogOpen] = useState<boolean>(false);

  const { data, isLoading: isTransactionsListLoading } =
    useTransactionsListQuery();

  const { mutate: createTransactionMutation, isPending: isCreationPending } =
    useCreateTransactionMutation();

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

  const createTransaction = (data: TransactionFormData) => {

    const formattedData: CreateTransactionDTO = {
      ...data,
      type: Number(data.type) as TransactionType,
      amount: Number(data.amount.replace(/\D/g, '')) / 100,
    };

    createTransactionMutation(formattedData, {
      onSuccess: () => {
        setCreateTransactionDialogOpen(false);
        enqueueSnackbar("Transação criada com sucesso!", { variant: "success" });
      },
      onError: (error) => {
        enqueueSnackbar(error?.response?.data?.message || "Erro ao criar transação. Tente novamente.", { variant: "error" });
      }
    });
  }

  const openCreateTransactionDialog = () => {
    setCreateTransactionDialogOpen(true);
  }

  const closeCreateTransactionDialog = () => {
    setCreateTransactionDialogOpen(false);
  }

  return {
    transactions,
    isTransactionsListLoading,
    createTransaction,
    isCreationPending,
    openCreateTransactionDialog,
    closeCreateTransactionDialog,
    createTransactionDialogOpen
  };
};
