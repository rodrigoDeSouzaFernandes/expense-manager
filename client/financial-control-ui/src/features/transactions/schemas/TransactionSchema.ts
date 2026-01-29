import z from "zod";

export const transactionSchema = z.object({
  amount: z
    .string()
    .refine((val) => {
      const digits = val.replace(/\D/g, "");
      return Number(digits) > 0;
    }, "O valor deve ser maior que zero"),
  description: z
    .string()
    .min(1, "Descrição é obrigatória")
    .max(200, "Descrição deve ter no máximo 200 caracteres"),
  type: z.enum(["1", "2"], "Tipo da transação inválido"),
  personId: z.string().min(1, "Pessoa é obrigatória"),
  categoryId: z.string().min(1, "Categoria é obrigatória"),
});
