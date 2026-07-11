import api from "../lib/axios";

export interface DashboardResponse {
    success: boolean;
    data: {
        summary: {
        totalProducts: number;
        totalCategories: number;
        totalUsers: number;
        totalTransactions: number;
        totalStock: number;
        stockInToday: number;
        stockOutToday: number;
    };

    recentTransactions: any[];
    lowStockProducts: any[];
    latestProducts: {
        id: number;
        name: string;
        stock: number;
        image: string;
        createdAt: string;
    }[];
    };
}

class DashboardService {
    async getDashboard() {
        const response = await api.get<DashboardResponse>("/dashboard");
        return response.data;
    }
}

export default new DashboardService();