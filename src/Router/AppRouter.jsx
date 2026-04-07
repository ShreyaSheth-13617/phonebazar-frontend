import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ProtectedRoute, RoleProtectedRoute } from "@/components/ProtectedRoute";
import MainLayout from "./MainLayout";
import HomePage from "@/pages/HomePage";
import BrowsePage from "@/pages/BrowsePage";
import ProductDetailPage from "@/pages/ProductDetailPage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import ForgotPassword from "@/pages/ForgotPassword";
import ResetPassword from "@/pages/ResetPassword";
import ComparePage from "@/pages/ComparePage";
import NotFound from "@/pages/NotFound";
import BuyerDashboard from "@/pages/buyer/BuyerDashboard";
import OrdersPage from "@/pages/buyer/OrdersPage";
import WishlistPage from "@/pages/buyer/WishlistPage";
import CartPage from "@/pages/buyer/CartPage";
import SellerLayout from "@/pages/seller/SellerLayout";
import SellerDashboardPage from "@/pages/seller/SellerDashboardPage";
import SellerListingsPage from "@/pages/seller/SellerListingsPage";
import AddProductPage from "@/pages/seller/AddProductPage";
import SellerOrdersPage from "@/pages/seller/SellerOrdersPage";
import SellerAnalyticsPage from "@/pages/seller/SellerAnalyticsPage";
import AdminLayout from "@/pages/admin/AdminLayout";
import AdminDashboardPage from "@/pages/admin/AdminDashboardPage";
import AdminUsersPage from "@/pages/admin/AdminUsersPage";
import AdminListingsPage from "@/pages/admin/AdminListingsPage";
import AdminOrdersPage from "@/pages/admin/AdminOrdersPage";
import AdminReleasePaymentsPage from "@/pages/admin/AdminReleasePaymentsPage";
import AdminAnalyticsPage from "@/pages/admin/AdminAnalyticsPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "browse", element: <BrowsePage /> },
            { path: "listing/:id", element: <ProductDetailPage /> },
            { path: "compare", element: <ComparePage /> },
            { path: "about", element: <AboutPage /> },
            { path: "contact", element: <ContactPage /> },
            { path: "login", element: <LoginPage /> },
            { path: "signup", element: <SignupPage /> },
            { path: "forgot-password", element: <ForgotPassword /> },
            { path: "reset-password/:token", element: <ResetPassword /> },

            { path: "dashboard", element: <ProtectedRoute><BuyerDashboard /></ProtectedRoute> },
            { path: "orders", element: <ProtectedRoute><OrdersPage /></ProtectedRoute> },
            { path: "wishlist", element: <ProtectedRoute><WishlistPage /></ProtectedRoute> },
            { path: "cart", element: <ProtectedRoute><CartPage /></ProtectedRoute> },

            {
                path: "seller",
                element: <RoleProtectedRoute role="seller"><SellerLayout /></RoleProtectedRoute>,
                children: [
                    { path: "dashboard", element: <SellerDashboardPage /> },
                    { path: "listings", element: <SellerListingsPage /> },
                    { path: "add-product", element: <AddProductPage /> },
                    { path: "orders", element: <SellerOrdersPage /> },
                    { path: "analytics", element: <SellerAnalyticsPage /> },
                ],
            },

            {
                path: "admin",
                element: <RoleProtectedRoute role="admin"><AdminLayout /></RoleProtectedRoute>,
                children: [
                    { path: "dashboard", element: <AdminDashboardPage /> },
                    { path: "users", element: <AdminUsersPage /> },
                    { path: "listings", element: <AdminListingsPage /> },
                    { path: "orders", element: <AdminOrdersPage /> },
                    { path: "payments", element: <AdminReleasePaymentsPage /> },
                    { path: "analytics", element: <AdminAnalyticsPage /> },
                ],
            },

            { path: "*", element: <NotFound /> },
        ],
    },
], { future: { v7_startTransition: true } });

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;
