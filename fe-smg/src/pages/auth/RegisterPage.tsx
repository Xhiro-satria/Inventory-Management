import { Lock, Mail, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterForm } from "../../validations/register.schema";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import authService from "../../services/auth.service";

    function RegisterPage() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
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
            error.response?.data?.message || "Register gagal, silakan coba lagi"
        );
        }
    };

    return (
        <div className="min-h-screen w-full flex bg-white font-sans overflow-hidden antialiased">
        
        <div className="w-full md:w-5/12 lg:w-2/5 flex flex-col justify-center px-8 sm:px-16 lg:px-20 xl:px-24 bg-white z-10">
            <div className="w-full max-w-sm mx-auto">
            
            <div className="text-center mb-8">
                <h2 className="text-xl lg:text-2xl font-bold uppercase tracking-widest text-zinc-900">
                CREATE ACCOUNT
                </h2>
                <p className="text-xs text-zinc-400 mt-1">
                Daftar untuk mengelola sistem inventaris Anda
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                
                <div className="space-y-1">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400">
                    <User size={18} />
                    </div>
                    <input
                    type="text"
                    placeholder="Nama Lengkap"
                    {...register("name")}
                    disabled={isSubmitting}
                    className={`w-full bg-zinc-100 border-0 rounded-full py-3 pl-12 pr-4 text-sm text-zinc-800 placeholder:text-zinc-400 outline-none transition-all
                        focus:bg-zinc-50 focus:ring-2 focus:ring-zinc-900/20
                        ${errors.name ? "ring-2 ring-red-400 bg-red-50/50" : ""}`}
                    />
                </div>
                {errors.name && (
                    <p className="text-red-500 text-xs pl-4 font-medium">{errors.name.message}</p>
                )}
                </div>

                <div className="space-y-1">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400">
                    <Mail size={18} />
                    </div>
                    <input
                    type="email"
                    placeholder="Email Perusahaan"
                    {...register("email")}
                    disabled={isSubmitting}
                    className={`w-full bg-zinc-100 border-0 rounded-full py-3 pl-12 pr-4 text-sm text-zinc-800 placeholder:text-zinc-400 outline-none transition-all
                        focus:bg-zinc-50 focus:ring-2 focus:ring-zinc-900/20
                        ${errors.email ? "ring-2 ring-red-400 bg-red-50/50" : ""}`}
                    />
                </div>
                {errors.email && (
                    <p className="text-red-500 text-xs pl-4 font-medium">{errors.email.message}</p>
                )}
                </div>

                <div className="space-y-1">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400">
                    <Lock size={18} />
                    </div>
                    <input
                    type="password"
                    placeholder="Buat Password"
                    {...register("password")}
                    disabled={isSubmitting}
                    className={`w-full bg-zinc-100 border-0 rounded-full py-3 pl-12 pr-4 text-sm text-zinc-800 placeholder:text-zinc-400 outline-none transition-all
                        focus:bg-zinc-50 focus:ring-2 focus:ring-zinc-900/20
                        ${errors.password ? "ring-2 ring-red-400 bg-red-50/50" : ""}`}
                    />
                </div>
                {errors.password && (
                    <p className="text-red-500 text-xs pl-4 font-medium">{errors.password.message}</p>
                )}
                </div>

                <div className="space-y-1">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400">
                    <Lock size={18} />
                    </div>
                    <input
                    type="password"
                    placeholder="Konfirmasi Password"
                    {...register("confirmPassword")}
                    disabled={isSubmitting}
                    className={`w-full bg-zinc-100 border-0 rounded-full py-3 pl-12 pr-4 text-sm text-zinc-800 placeholder:text-zinc-400 outline-none transition-all
                        focus:bg-zinc-50 focus:ring-2 focus:ring-zinc-900/20
                        ${errors.confirmPassword ? "ring-2 ring-red-400 bg-red-50/50" : ""}`}
                    />
                </div>
                {errors.confirmPassword && (
                    <p className="text-red-500 text-xs pl-4 font-medium">{errors.confirmPassword.message}</p>
                )}
                </div>

                <div className="pt-4 flex justify-center">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-48 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-950 hover:from-zinc-800 hover:to-zinc-900 active:opacity-90 transition-all text-white rounded-full py-3 font-semibold text-sm uppercase tracking-wider shadow-md shadow-zinc-900/10 disabled:opacity-50 flex items-center justify-center cursor-pointer"
                >
                    {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                    "REGISTER"
                    )}
                </button>
                </div>
            </form>

            <div className="text-center mt-8 text-xs text-zinc-400">
                Sudah punya akun?{" "}
                <Link to="/login" className="text-zinc-900 font-semibold hover:underline">
                Login disini
                </Link>
            </div>

            </div>
        </div>

        <div className="hidden md:flex md:w-7/12 lg:w-3/5 relative bg-gradient-to-br from-yellow-500 via-zinc-800 to-zinc-950 p-12 lg:p-20 flex-col justify-center items-end overflow-hidden">
            
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
            <div className="absolute -top-10 -right-20 w-32 h-96 bg-gradient-to-b from-yellow-400 to-transparent rounded-full rotate-[40deg] blur-sm" />
            <div className="absolute -top-20 right-10 w-24 h-[450px] bg-gradient-to-b from-yellow-500 via-zinc-700 to-transparent rounded-full rotate-[40deg]" />
            <div className="absolute -top-10 right-60 w-20 h-80 bg-gradient-to-b from-zinc-600 to-transparent rounded-full rotate-[40deg]" />
            <div className="absolute top-20 right-[350px] w-28 h-72 bg-gradient-to-b from-yellow-400 via-zinc-800 to-transparent rounded-full rotate-[40deg] blur-[2px]" />
            <div className="absolute bottom-1/4 right-1/3 w-36 h-36 rounded-full bg-yellow-500/10 blur-xl" />
            </div>

            <div className="relative z-10 max-w-xl text-right">
            <h1 className="text-4xl lg:text-5xl font-bold text-white tracking-wide mb-6">
                Join the platform
            </h1>
            <p className="text-zinc-300 text-sm lg:text-base font-light leading-relaxed">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
            </p>
            </div>
        </div>

        </div>
    );
    }

    export default RegisterPage;