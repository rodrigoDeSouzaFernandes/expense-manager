import type { TransactionType, TransactionTypeLabel } from "./types";

export const transactionType = {
  CREDIT: 1,
  DEBIT: 2,
} as const;

export const TRANSACTION_TYPES: Record<
  TransactionType,
  { label: TransactionTypeLabel; color: "success" | "error" | "warning" }
> = {
  [transactionType.CREDIT]: { label: "Receita", color: "success" },
  [transactionType.DEBIT]: { label: "Despesa", color: "error" },
};
