import { Lock, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginForm } from "../../validations/login.schema";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import authService from "../../services/auth.service";
import { Link } from "react-router-dom";

function LoginPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
    });
    const navigate = useNavigate();
    const onSubmit = async (data: LoginForm) => {
      try {
        const response = await authService.login(data);

        localStorage.setItem("token", response.data.token);

        localStorage.setItem(
          "user",
          JSON.stringify(response.data.user)
        );

        toast.success("Login berhasil");

        navigate("/dashboard");
      } catch (error: any) {
        toast.error(
          error.response?.data?.message || "Login gagal"
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
            Welcome Back 👋
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
                className="w-full border rounded-lg py-2 pl-10 pr-3 outline-none focus:border-blue-500"
              />
            {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                </p>
            )}
            </div>
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
                className="w-full border rounded-lg py-2 pl-10 pr-3 outline-none focus:border-blue-500"
              />
            {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                </p>
            )}
            </div>
          </div>
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white rounded-lg py-2 font-semibold"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-5">

    <span className="text-gray-500">
        Belum punya akun?
    </span>

    <Link
        to="/register"
        className="text-blue-600 font-semibold ml-2 hover:underline"
    >
        Register
    </Link>

</div>
      </div>
    </div>
  );
}

export default LoginPage;