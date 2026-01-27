export type TransactionRow = {
  id: number;
  date: string;
  description: string;
  category: string;
  person: string;
  type: "Receita" | "Despesa";
  amount: number;
};

