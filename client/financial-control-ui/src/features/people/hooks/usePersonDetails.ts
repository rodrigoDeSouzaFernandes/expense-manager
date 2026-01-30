import { useParams } from "react-router-dom";
import { usePersonDetailsQuery } from "../queries"
import { formatDate } from "@/utils/date";
import { TRANSACTION_TYPES, transactionType } from "@/features/transactions/enums";
import type { DeleteTransactionDialogProps, TransactionRow, TransactionType } from "@/features/transactions/types";
import { useMemo, useState } from "react";
import { useDeleteTransactionMutation } from "@/features/transactions/queries";
import { enqueueSnackbar } from "notistack";
import type { TotalsDashboardProps } from "@/components/TotalDashboard/types";

export const usePersonDetails = () => {

    const { id } = useParams()

    const [deleteTransactionDialogProps, setDeleteTransactionDialogProps] = useState<Pick<DeleteTransactionDialogProps, "open" | "transaction">>({
        open: false,
        transaction: null,
    })

    const { data: person, isLoading, isError } = usePersonDetailsQuery(id);

    const { mutate: deleteTransactionMutation, isPending: isDeletionPending } =
        useDeleteTransactionMutation();

    const transactions: TransactionRow[] = useMemo(() => {
        if (!person?.transactions) return [];

        return person.transactions.map((t) => ({
            id: t.id,
            date: formatDate(t.date),
            description: t.description || "",
            category: t.category.name,
            person: t.person.name,
            type: TRANSACTION_TYPES[t.type as TransactionType].label,
            amount: t.amount,
        }));
    }, [person]);


    const openDeleteTransactionDialog = (transaction: TransactionRow) => {
        setDeleteTransactionDialogProps({
            open: true, transaction
        })
    }

    const closeDeleteTransactionDialog = () => {
        setDeleteTransactionDialogProps({
            open: false,
            transaction: null,
        })
    }

    const deleteTransaction = (): void => {
        if (!deleteTransactionDialogProps.transaction?.id) {
            enqueueSnackbar("Não foi possível deletar transação. Recarregue a página e tente novamente mais tarde.", { variant: "error" });
            return;
        };

        deleteTransactionMutation(deleteTransactionDialogProps.transaction?.id, {
            onSuccess: () => {
                closeDeleteTransactionDialog();
                enqueueSnackbar("Transação deletada com sucesso!", { variant: "success" });
            },
            onError: (error) => {
                enqueueSnackbar(error?.response?.data?.message || "Erro ao deletar transação. Tente novamente.", { variant: "error" });
            }
        })
    }

    const totals: TotalsDashboardProps = useMemo(() => {
        if (!person) return { totalExpenses: 0, totalIncome: 0, balance: 0 }

        const { totalExpenses, totalIncome } = person.transactions?.reduce((totals, transaction) => {
            if (transaction.type === transactionType.DEBIT) {
                return {
                    ...totals,
                    totalExpenses: totals.totalExpenses + transaction.amount
                }
            } else {
                return {
                    ...totals,
                    totalIncome: totals.totalExpenses + transaction.amount
                }
            }

        }, { totalExpenses: 0, totalIncome: 0 })

        return {
            totalExpenses,
            totalIncome,
            balance: totalIncome - totalExpenses
        }
    }, [person])


    return {
        person,
        isLoading,
        isError,
        transactions,
        openDeleteTransactionDialog,
        closeDeleteTransactionDialog,
        deleteTransactionDialogProps,
        deleteTransaction,
        isDeletionPending,
        totals
    }
}