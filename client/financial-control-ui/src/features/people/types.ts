import type z from "zod";
import type { personSchema } from "./schemas/personSchema";

export interface Person {
  id: string;
  name: string;
  age: number;
}

export interface PersonWithBalance extends Person {
  totalExpenses: number;
  totalIncome: number;
  balance: number;
}

export interface PersonWithTransactions extends Person {
  transactions: any[]; //todo: definir o tipo da transação
}

export type CreatePersonDTO = Omit<Person, "id">;

export type PersonFormData = z.infer<typeof personSchema>;

export interface PersonFormProps {
  onSubmit: (data: PersonFormData) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export interface CreatePersonDialogProps {
  open: boolean;
  onClose: () => void;
  onCreate: (data: CreatePersonDTO) => void;
  isLoading: boolean;
}

export interface DeletePersonDialogProps {
  open: boolean;
  onClose: () => void;
  person: Person | null;
  onDelete: () => void;
  isLoading: boolean;
}
