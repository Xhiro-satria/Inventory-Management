import { Lock, Mail, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {registerSchema,type RegisterForm,} from "../../validations/register.schema";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import authService from "../../services/auth.service";

function RegisterPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterForm>({
        resolver: zodResolver(registerSchema),
    });

    const navigate = useNavigate();
    const onSubmit = async (data: RegisterForm) => {
        try {
            await authService.register({
                name: data.name,
                email: data.email,
                password: data.password,
            });
            toast.success("Register berhasil");
            navigate("/login");
        } catch (error: any) {
            toast.error(
                error.response?.data?.message ||
                "Register gagal"
            );
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-blue-600">
                        Inventory App
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Create your account
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                >

                    <div>
                        <label className="block mb-2 font-medium">
                            Name
                        </label>

                        <div className="relative">
                            <User
                                size={18}
                                className="absolute left-3 top-3 text-gray-400"
                            />
                            <input
                                type="text"
                                placeholder="Masukkan nama"
                                {...register("name")}
                                className="w-full border rounded-lg py-2 pl-10 pr-3"
                            />
                        </div>

                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.name.message}
                            </p>
                        )}

                    </div>
                    <div>
                        <label className="block mb-2 font-medium">
                            Email
                        </label>

                        <div className="relative">
                            <Mail
                                size={18}
                                className="absolute left-3 top-3 text-gray-400"
                            />
                            <input
                                type="email"
                                placeholder="Masukkan email"
                                {...register("email")}
                                className="w-full border rounded-lg py-2 pl-10 pr-3"
                            />
                        </div>

                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email.message}
                            </p>
                        )}

                    </div>
                    <div>
                        <label className="block mb-2 font-medium">
                            Password
                        </label>

                        <div className="relative">
                            <Lock
                                size={18}
                                className="absolute left-3 top-3 text-gray-400"
                            />

                            <input
                                type="password"
                                placeholder="Masukkan password"
                                {...register("password")}
                                className="w-full border rounded-lg py-2 pl-10 pr-3"
                            />
                        </div>

                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password.message}
                            </p>
                        )}

                    </div>
                    <div>
                        <label className="block mb-2 font-medium">
                            Confirm Password
                        </label>

                        <div className="relative">
                            <Lock
                                size={18}
                                className="absolute left-3 top-3 text-gray-400"
                            />

                            <input
                                type="password"
                                placeholder="Konfirmasi password"
                                {...register("confirmPassword")}
                                className="w-full border rounded-lg py-2 pl-10 pr-3"
                            />
                        </div>

                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 font-semibold"
                    >
                        Register
                    </button>

                </form>

                <div className="text-center mt-6">
                    <span className="text-gray-500">
                        Sudah punya akun?
                    </span>

                    <Link
                        to="/login"
                        className="text-blue-600 ml-2 font-semibold hover:underline"
                    >
                        Login
                    </Link>

                </div>
            </div>
        </div>
    );

}

export default RegisterPage;