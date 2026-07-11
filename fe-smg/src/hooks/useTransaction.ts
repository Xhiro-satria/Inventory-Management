import { useEffect, useState } from "react";
import TransactionService from "../services/transaction.service";
import type {Transaction} from "../types/transaction";

export default function useTransaction() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const getTransactions = async (search?: string,type?: "IN" | "OUT") => {
        try {
            const response =
                await TransactionService.history(
                    search,
                    type
                );
            setTransactions(response.data);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getTransactions();
    }, []);

    return {
        transactions,
        loading,
        getTransactions,
    };
}