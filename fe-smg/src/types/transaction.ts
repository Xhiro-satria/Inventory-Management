export interface Transaction {
    id: number;
    reference: string;
    type: "IN" | "OUT";
    quantity: number;
    note: string | null;
    createdAt: string;
    product: {
        id: number;
        name: string;
    };

    user: {
        id: number;
        name: string;
        email: string;
    };

}

export interface TransactionResponse {
    success: boolean;
    data: Transaction[];
}

export interface TransactionFormData {
    productId: number;
    quantity: number;
    note: string;
}