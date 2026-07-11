import prisma from "../lib/prisma";

class CategoryService {

    async create(data: any) {
        return prisma.category.create({
            data
        });
    }

    async findAll() {
        return prisma.category.findMany({
            orderBy: {
                id: "asc",
            },
        });
    }

    async findById(id: number) {
        return prisma.category.findUnique({
        where: {
            id,
        },
        include: {
            _count: {
                select: {
                    products: true,
                },
            },
        },
    });
    }

    async update(id: number, name: string, description:string) {
        return prisma.category.update({
            where: {
                id,
            },
            data: {
                name,
                description,
            },
        });
    }

    async delete(id: number) {
        return prisma.category.delete({
            where: {
                id,
            },
        });
    }

}

export default new CategoryService();