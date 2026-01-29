import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { transactionSchema } from "../schemas/TransactionSchema";
import type { TransactionFormData } from "../types";
import { usePeopleListQuery } from "@/features/people/queries";
import { useCategoryListQuery } from "@/features/categories/queries";
import { useMemo } from "react";

export const useTransactionForm = () => {

  const { data: people, isLoading: isPeopleLoading } = usePeopleListQuery();
  const { data: categories, isLoading: isCategoriesLoading } = useCategoryListQuery();

  const peopleMap = useMemo(
    () => new Map(people?.map(p => [p.id, p.name])),
    [people]
  );

  const categoryMap = useMemo(
    () => new Map(categories?.map(c => [c.id, c.name])),
    [categories]
  );


  const isLoading = useMemo(() =>
    isPeopleLoading || isCategoriesLoading
    , [isPeopleLoading, isCategoriesLoading]);

  const form = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      amount: "",
      description: "",
      type: "2",
      personId: "",
      categoryId: "",
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  return { form, people, categories, isLoading, peopleMap, categoryMap};
};
