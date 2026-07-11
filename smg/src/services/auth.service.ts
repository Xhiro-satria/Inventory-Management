import prisma from "../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

interface RegisterData {
    name: string;
    email:string;
    password:string;
}

interface LoginData{
    email: string;
    password: string
}

class AuthService {
    async register(data: RegisterData) {
        const existingUser = await prisma.user.findUnique({
            where: {
                email: data.email,
            },
        });

        if (existingUser) {
            throw new Error("Email sudah digunakan");
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: hashedPassword,
        },
        });

        return user;
    }

    async login(data: LoginData) {
        const user = await prisma.user.findUnique({
            where: {
                email: data.email,
            },
        });

        if (!user) {
            throw new Error("Email atau password salah");
        }
        const isMatch = await bcrypt.compare(data.password, user.password);
        if (!isMatch) {
            throw new Error("Email atau password salah");
        }

        const token = jwt.sign(
        {
            id: user.id,
            role: user.role,
        },
        process.env.JWT_SECRET!,
        {
            expiresIn: "1d",
        }
        );

        return {
            token,
            user,
        };
    }
}

export default new AuthService();