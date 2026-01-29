import type { Category } from "@/features/categories/types";
import type { TransactionType } from "../types";

export const validateTransactionType = (categories: Category[] | undefined, categoryId: string, transactionType: TransactionType) => {
    const category = categories?.find((c) => c.id === categoryId);

    if (!category || !categories) return true;

    if (category.type === 3) {
        return true;
    }

    return category.type === transactionType;
};