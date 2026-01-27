import type { Category } from "../categories/types";
import type { Person } from "../people/types";
import type { transactionType } from "./enums";

export type TransactionType =
  (typeof transactionType)[keyof typeof transactionType];

export type TransactionRow = {
  id: number;
  date: string;
  description: string;
  category: string;
  person: string;
  type: "Receita" | "Despesa";
  amount: number;
};

export interface CreateTransactionDTO {
  amount: number;
  description?: string;
  type: TransactionType;
  personId: string;
  categoryId: string;
}

export interface Transaction {
  id: string;
  amount: number;
  description?: string;
  type: TransactionType;
  person: Person;
  category: Category;
  date: string;
}
