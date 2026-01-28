import { useForm } from "react-hook-form";
import type { PersonFormData } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { personSchema } from "../schemas/personSchema";

export const usePersonForm = () => {
    
  const form = useForm<PersonFormData>({
    resolver: zodResolver(personSchema),
    defaultValues: { name: "", age: 0 },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  return {
    form,
  };
};
