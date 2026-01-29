import { formatDate } from "@/utils/date";
import { useTransactionsListQuery } from "../queries";
import type { TransactionRow } from "../types";
import { useMemo } from "react";
import { TRANSACTION_TYPES } from "../enums";

export const useTransactionsList = () => {
  const { data, isLoading: isTransactionsListLoading } =
    useTransactionsListQuery();

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

  return {
    transactions,
    isTransactionsListLoading,
  };
};
