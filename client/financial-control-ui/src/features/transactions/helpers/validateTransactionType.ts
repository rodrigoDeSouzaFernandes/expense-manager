import type { Category } from "@/features/categories/types";
import type { TransactionFormData, TransactionType } from "../types";
import type { UseFormReturn } from "react-hook-form";

export const validateTransactionType = (categories: Category[] | undefined, categoryId: string, transactionType: TransactionType): boolean => {
    const category = categories?.find((c) => c.id === categoryId);

    if (!category || !categories) return true;

    if (category.type === 3) {
        return true;
    }

    return category.type === transactionType;
};

export const validateTransactionTypeCompatibility = (form: UseFormReturn<TransactionFormData>, categories: Category[] | undefined, categoryId: string, transactionType: TransactionType): boolean => {
    const isValid = validateTransactionType(
        categories,
        categoryId,
        transactionType,
    );


    if (!isValid) {
        form.setError("type", {
            message:
                "O tipo de transação não é compatível com a categoria selecionada.",
        });

    }

    return isValid;
};