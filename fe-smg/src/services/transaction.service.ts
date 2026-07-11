import api from "../lib/axios";
import type {TransactionFormData,} from "../types/transaction";

class TransactionService {
    async history(
    search?: string,
    type?: "IN" | "OUT"
    ) {
        const params = new URLSearchParams();
        if (search) {
            params.append("search", search);
        }
        if (type) {
            params.append("type", type);
        }
        const response = await api.get(
            `/transactions/history?${params.toString()}`
        );
        return response.data;
    }

    async stockIn(
        data: TransactionFormData
    ) {
        const response =
            await api.post(
                "/transactions/in",
                data
            );
        return response.data;
    }

    async stockOut(
        data: TransactionFormData
    ) {
        const response =
            await api.post(
                "/transactions/out",
                data
            );
        return response.data;
    }

    async delete(id: number) {
        return api.delete(
            `/transactions/${id}`
        );
    }

    async exportExcel() {
        const response = await api.get(
            "/transactions/export",
            {
                responseType: "blob",
            }
        );
        return response.data;
    }
}

export default new TransactionService();