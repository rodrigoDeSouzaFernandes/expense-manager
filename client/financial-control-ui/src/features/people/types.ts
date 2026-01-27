export type PersonRow = {
  id: number;
  name: string;
  age: number;
};

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
