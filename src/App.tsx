import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/context/AuthContext";
import { ProtectedRoute, RoleProtectedRoute } from "@/components/ProtectedRoute";
import Navbar from "@/components/Navbar";

import HomePage from "@/pages/HomePage";
import BrowsePage from "@/pages/BrowsePage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import NotFound from "@/pages/NotFound";

import BuyerDashboard from "@/pages/buyer/BuyerDashboard";
import OrdersPage from "@/pages/buyer/OrdersPage";
import WishlistPage from "@/pages/buyer/WishlistPage";

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
import AdminAnalyticsPage from "@/pages/admin/AdminAnalyticsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/browse" element={<BrowsePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            <Route path="/dashboard" element={<ProtectedRoute><BuyerDashboard /></ProtectedRoute>} />
            <Route path="/orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
            <Route path="/wishlist" element={<ProtectedRoute><WishlistPage /></ProtectedRoute>} />

            <Route path="/seller" element={<RoleProtectedRoute role="seller"><SellerLayout /></RoleProtectedRoute>}>
              <Route path="dashboard" element={<SellerDashboardPage />} />
              <Route path="listings" element={<SellerListingsPage />} />
              <Route path="add-product" element={<AddProductPage />} />
              <Route path="orders" element={<SellerOrdersPage />} />
              <Route path="analytics" element={<SellerAnalyticsPage />} />
            </Route>

            <Route path="/admin" element={<RoleProtectedRoute role="admin"><AdminLayout /></RoleProtectedRoute>}>
              <Route path="dashboard" element={<AdminDashboardPage />} />
              <Route path="users" element={<AdminUsersPage />} />
              <Route path="listings" element={<AdminListingsPage />} />
              <Route path="orders" element={<AdminOrdersPage />} />
              <Route path="analytics" element={<AdminAnalyticsPage />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
