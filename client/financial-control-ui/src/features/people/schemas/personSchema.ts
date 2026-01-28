import z from "zod";

export const personSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  age: z.number().min(1, "Idade inválida").max(150, "Idade inválida"),
});
