import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  createTransaction,
  deleteTransaction,
  getTransactions,
} from "@/api/transactions.service";
import type { CreateTransactionDTO, Transaction } from "./types";
import type { AxiosError } from "axios";

export const useTransactionsListQuery = () => {
  return useQuery<Transaction[]>({
    queryKey: ["transactions"],
    queryFn: getTransactions,
  });
};

export const useCreateTransactionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<Transaction, AxiosError<{ message: string }>, CreateTransactionDTO>({
    mutationFn: createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["people"] });
    },
  });
};

export const useDeleteTransactionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<{ message: string }>, string>({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["people"] });
    },
  });
};
