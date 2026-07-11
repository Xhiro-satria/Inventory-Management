import prisma from "../lib/prisma";

class DashboardService {
    async getSummary() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const [
            totalProducts,
            totalCategories,
            totalUsers,
            totalTransactions,
            totalStock,
            stockInToday,
            stockOutToday,
            recentTransactions,
            lowStockProducts,
            latestProducts,
        ] = await Promise.all([
        prisma.product.count(),
        prisma.category.count(),
        prisma.user.count(),
        prisma.transaction.count(),
        prisma.product.aggregate({
            _sum: {
            stock: true,
            },
        }),

        prisma.transaction.count({
            where: {
            type: "IN",
            createdAt: {
                gte: today,
            },
            },
        }),

        prisma.transaction.count({
            where: {
            type: "OUT",
            createdAt: {
                gte: today,
            },
            },
        }),

        prisma.transaction.findMany({
            take: 5,
            orderBy: {
            createdAt: "desc",
            },
            include: {
            product: {
                select: {
                id: true,
                name: true,
                image: true,
                },
            },
            user: {
                select: {
                id: true,
                name: true,
                },
            },
            },
        }),

        prisma.product.findMany({
            where: {
            stock: {
                lte: 5,
            },
            },
            orderBy: {
            stock: "asc",
            },
            take: 5,
            select: {
            id: true,
            name: true,
            stock: true,
            image: true,
            },
        }),

        prisma.product.findMany({
            orderBy: {
            createdAt: "desc",
            },
            take: 5,
            select: {
            id: true,
            name: true,
            stock: true,
            image: true,
            createdAt: true,
            },
        }),
        ]);

        return {
        summary: {
            totalProducts,
            totalCategories,
            totalUsers,
            totalTransactions,
            totalStock: totalStock._sum.stock ?? 0,
            stockInToday,
            stockOutToday,
        },
        recentTransactions,
        lowStockProducts,
        latestProducts,
        };
    }
}

export default new DashboardService();