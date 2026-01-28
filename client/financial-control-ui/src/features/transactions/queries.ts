import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  createTransaction,
  deleteTransaction,
  getTransactions,
} from "@/api/transactions.service";

export const useTransactionsListQuery = () => {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
  });
};

export const useCreateTransactionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
};

export const useDeleteTransactionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
};
