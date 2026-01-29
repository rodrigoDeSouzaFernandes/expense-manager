import { client } from "./client";
import type {
  Transaction,
  CreateTransactionDTO,
} from "@/features/transactions/types";

export const getTransactions = async (): Promise<Transaction[]> => {
  const response = await client.get<Transaction[]>("/transaction");
  return response.data;
};

export const createTransaction = async (
  transaction: CreateTransactionDTO,
): Promise<Transaction> => {
  const response = await client.post<Transaction>("/transaction", transaction);
  return response.data;
};

export const deleteTransaction = async (
  transactionId: string,
): Promise<void> => {
  await client.delete(`/transaction/${transactionId}`);
};
