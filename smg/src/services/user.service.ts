import prisma from "../lib/prisma";
import { Role } from "@prisma/client";

class UserService {
    async findAll() {
        return prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
            },
            orderBy: {
                id: "asc",
            },
        });
    }

    async updateRole(id: number, role: Role) {
        return prisma.user.update({
            where: {
                id,
            },
            data: {
                role,
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
            },
        });
    }

    async profile(id: number) {
        return prisma.user.findUnique({
            where: {
                id,
            },

            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
            },
        });
    }

    async updateProfile(
        id: number,
        data: {
            name: string;
            email: string;
        }
        ){
        const existingUser =
            await prisma.user.findFirst({
                where: {
                    email: data.email,
                    NOT: {id,},
                },
            });
        if (existingUser) {
            throw new Error(
                "Email sudah digunakan"
            );
        }
        return prisma.user.update({
            where: {
                id,
            },
            data,
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
            },
        });
    }
}

export default new UserService();