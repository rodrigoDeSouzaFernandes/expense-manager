import { useParams } from "react-router-dom";
import { usePersonDetailsQuery } from "../queries"
import { formatDate } from "@/utils/date";
import { TRANSACTION_TYPES } from "@/features/transactions/enums";
import type { DeleteTransactionDialogProps, TransactionRow, TransactionType } from "@/features/transactions/types";
import { useMemo, useState } from "react";
import { useDeleteTransactionMutation } from "@/features/transactions/queries";
import { enqueueSnackbar } from "notistack";

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


    return {
        person,
        isLoading,
        isError,
        transactions,
        openDeleteTransactionDialog,
        closeDeleteTransactionDialog,
        deleteTransactionDialogProps,
        deleteTransaction,
        isDeletionPending
    }
}