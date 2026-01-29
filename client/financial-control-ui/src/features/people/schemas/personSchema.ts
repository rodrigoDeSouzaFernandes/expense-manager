import z from "zod";

export const personSchema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .min(3, "Nome deve ter no mínimo 3 caracteres")
    .max(50, "Nome deve ter no máximo 50 caracteres"),
  age: z.number().min(1, "Idade inválida").max(150, "Idade inválida"),
});
