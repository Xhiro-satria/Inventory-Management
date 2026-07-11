import { createBrowserRouter,Navigate } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import CategoryPage from "../pages/category/Category.Page";
import ProductPage from "../pages/product/ProductPage";
import ProtectedRoute from "../components/auth/ProtectRoute";
import PublicRoute from "../components/auth/PublicRoute";
import AdminLayout from "../components/layout/AdminLayout";
import InventoryPage from "../pages/transaction/TransactionPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ProfilePage from "../pages/profile/ProfilPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/login" replace />,
    },
    
    {
        path: "/login",
        element: (
            <PublicRoute>
                <LoginPage/>
            </PublicRoute>
        ),
    },
    {
        path: "/register",
        element: (
            <PublicRoute>
                <RegisterPage />
            </PublicRoute>
        ),
    },
    {
        element: (
            <ProtectedRoute>
                <AdminLayout/>
            </ProtectedRoute>
        ),
        children:[
            {
        path: "/dashboard",
        element: (
            <ProtectedRoute>
                <DashboardPage/>
            </ProtectedRoute>
        ),
    },

    {
        path: "/category",
        element: (
            <ProtectedRoute>
                <CategoryPage/>
            </ProtectedRoute>
        ),
    },

    {
        path: "/product",
        element: (
            <ProtectedRoute>
                <ProductPage/>
            </ProtectedRoute>
        ),
    },

    {
        path: "/inventory",
        element: (
            <ProtectedRoute>
                <InventoryPage/>
            </ProtectedRoute>
        ),
    },

    {
        path: "/profile",
        element: (
            <ProtectedRoute>
                <ProfilePage />
            </ProtectedRoute>
        ),
    },
        ]
    },

]);