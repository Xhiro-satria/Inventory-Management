import prisma from "../lib/prisma";
import ExcelJS from "exceljs";

function generateReference() {
    const now = new Date();

    return (
        "TRX-" +
        now.getFullYear() +
        String(now.getMonth() + 1).padStart(2, "0") +
        String(now.getDate()).padStart(2, "0") +
        "-" +
        Date.now()
    );
}

class InventoryService {
    async stockIn(
        productId: number,
        quantity: number,
        note: string | undefined,
        userId: number
    ){
        return prisma.$transaction(async (tx) => {
            const product = await tx.product.findUnique({
            where: {
                id: productId,
            },
            });

            if (!product) {
                throw new Error("Produk tidak ditemukan");
            }

            const updatedProduct = await tx.product.update({
                where: {
                    id: productId,
                },
                data: {
                    stock: product.stock + quantity,
                },
            });

            await tx.transaction.create({
                data: {
                    reference: generateReference(),
                    type: "IN",
                    quantity,
                    note,
                    productId,
                    userId,
                },
            });

            return updatedProduct;
        });
    }

    async stockOut(
        productId: number,
        quantity: number,
        note: string | undefined,
        userId: number
    ){
        return prisma.$transaction(async (tx) => {
            const product = await tx.product.findUnique({
                where: {
                    id: productId,
                },
            });

            if (!product) {
                throw new Error("Produk tidak ditemukan");
            }

            if (product.stock < quantity) {
                throw new Error("Stok tidak mencukupi");
            }

            const updatedProduct = await tx.product.update({
                where: {
                    id: productId,
                },
            data: {
                stock: product.stock - quantity,
            },
            });

            await tx.transaction.create({
            data: {
                reference: generateReference(),
                type: "OUT",
                quantity,
                note,
                productId,
                userId,
            },
            });

            return updatedProduct;
        });
    }

    async history(
        search?: string,
        type?: "IN" | "OUT"
    ) {
        return prisma.transaction.findMany({
            where: {
                ...(search && {
                    product: {
                        name: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                }),
                ...(type && {
                    type,
                }),
            },
            include: {
                product: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    }

    async delete(id: number) {
        return prisma.$transaction(async (tx) => {
            const transaction = await tx.transaction.findUnique({
                where: {
                    id,
                },
            });

            if (!transaction) {
                throw new Error("Transaksi tidak ditemukan");
            }

            const product = await tx.product.findUnique({
                where: {
                    id: transaction.productId,
                },
            });

            if (!product) {
                throw new Error("Produk tidak ditemukan");
            }

            if (transaction.type === "IN") {
                if (product.stock < transaction.quantity) {
                    throw new Error(
                        "Stok tidak bisa dikembalikan karena stok saat ini lebih kecil dari jumlah transaksi."
                    );
                }

                await tx.product.update({
                    where: {
                        id: product.id,
                    },
                    data: {
                        stock: product.stock - transaction.quantity,
                    },
                });
            } else {
                await tx.product.update({
                    where: {
                        id: product.id,
                    },
                    data: {
                        stock: product.stock + transaction.quantity,
                    },
                });
            }

            await tx.transaction.delete({
                where: {
                    id,
                },
            });

            return {
                message: "Transaksi berhasil dihapus",
            };
        });
    }

    async exportExcel() {
        const transactions = await prisma.transaction.findMany({
            include: {product: true,user: true,},
            orderBy: {createdAt: "desc",},
        });
        const workbook = new ExcelJS.Workbook();
        const worksheet =
            workbook.addWorksheet("Transactions");
        worksheet.columns = [
            {
                header: "No",
                key: "no",
                width: 8,
            },

            {
                header: "Date",
                key: "date",
                width: 25,
            },

            {
                header: "Product",
                key: "product",
                width: 30,
            },

            {
                header: "Type",
                key: "type",
                width: 15,
            },

            {
                header: "Quantity",
                key: "quantity",
                width: 15,
            },

            {
                header: "Staff",
                key: "staff",
                width: 25,
            },

            {
                header: "Note",
                key: "note",
                width: 40,
            },
        ];

        worksheet.getRow(1).font = {
            bold: true,
        };
        transactions.forEach((item, index) => {
            worksheet.addRow({
                no: index + 1,
                date: item.createdAt.toLocaleString(),
                product: item.product.name,
                type: item.type,
                quantity: item.quantity,
                staff: item.user.name,
                note: item.note ?? "-",
            });
        });
        return workbook;
    }
}



export default new InventoryService();