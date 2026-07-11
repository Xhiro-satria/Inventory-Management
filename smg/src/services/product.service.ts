import prisma from "../lib/prisma";

class ProductService {

    async create(data: any) {
        return prisma.product.create({
            data,
            include: {
                category: true,
            },
        });
    }

    async findAll(
        search?: string,
        categoryId?: number
    ) {
        return prisma.product.findMany({
            where: {
                ...(search && {
                    OR: [
                        {
                            name: {
                                contains: search,
                                mode: "insensitive",
                            },
                        },
                        {
                            sku: {
                                contains: search,
                                mode: "insensitive",
                            },
                        },
                    ],
                }),
                ...(categoryId && {
                    categoryId,
                }),
            },
            include: {
                category: true,
            },
            orderBy: {
                id: "asc",
            },
        });
    }

    async findById(id: number) {
        return prisma.product.findUnique({
            where: {
                id,
            },
            include: {
                category: true,
            },
        });
    }

    async update(id: number, data: any) {
        return prisma.product.update({
            where: {
                id,
            },
            data,
            include: {
                category: true,
            },
        });
    }

    async delete(id: number) {
        return prisma.product.delete({
            where: {
                id,
            },
        });
    }

}

export default new ProductService();