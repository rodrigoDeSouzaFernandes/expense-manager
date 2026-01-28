import { useForm } from "react-hook-form";
import type { CategoryFormData } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema } from "../schemas/categorySchema";

export const useCategoryForm = () => {
  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: { name: "", type: 0 },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  return { form };
};
