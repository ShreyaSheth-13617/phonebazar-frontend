import { useState, useEffect } from "react";
import { Package, ShoppingCart, DollarSign, TrendingUp } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import api from "@/api/axios";
import { useToast } from "@/hooks/use-toast";

export default function SellerDashboard() {
    const { user } = useAuth();
    const { toast } = useToast();
    const [dashboardData, setDashboardData] = useState({
        totalListings: 0,
        totalOrders: 0,
        activeOrders: 0,
        totalRevenue: 0,
        recentOrders: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const { data } = await api.get("/orders/seller-stats");
                setDashboardData(data.data);
            } catch (error) {
                toast({
                    title: "Failed to load dashboard metrics",
                    description: error.response?.data?.message || "Please refresh",
                    variant: "destructive",
                });
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, [toast]);

    if (loading) return <div className="p-6 text-muted-foreground">Loading dashboard...</div>;

    const stats = [
        { label: "Total Listings", value: dashboardData.totalListings, icon: Package, change: "Live" },
        { label: "Active Orders", value: dashboardData.activeOrders, icon: ShoppingCart, change: "Live" },
        { label: "Revenue", value: `₹${(dashboardData.totalRevenue || 0).toLocaleString()}`, icon: DollarSign, change: "Live" },
    ];

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-foreground mb-1">Seller Dashboard</h1>
            <p className="text-muted-foreground mb-8">Welcome back, {user?.name}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                {stats.map((s, i) => (
                    <div key={i} className="glass-card p-5 relative overflow-hidden">
                        <s.icon className="absolute top-4 right-4 h-12 w-12 text-primary opacity-5" />
                        <div className="flex items-center justify-between mb-3">
                            <s.icon className="h-5 w-5 text-primary" />
                            <span className="text-xs text-green-400 font-medium bg-green-500/10 px-2 py-0.5 rounded-md">{s.change}</span>
                        </div>
                        <p className="text-2xl font-bold text-foreground">{s.value}</p>
                        <p className="text-sm text-muted-foreground">{s.label}</p>
                    </div>
                ))}
            </div>
            <div className="glass-card p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Recent Orders</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-left text-muted-foreground border-b border-border">
                                <th className="pb-3">Product</th>
                                <th className="pb-3">Buyer</th>
                                <th className="pb-3">Amount</th>
                                <th className="pb-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dashboardData.recentOrders.length > 0 ? (
                                dashboardData.recentOrders.map((o, i) => (
                                    <tr key={i} className="border-b border-border last:border-0 hover:bg-secondary/20 transition-colors">
                                        <td className="py-3 text-foreground font-medium">{o.phoneId?.name || "Product"}</td>
                                        <td className="py-3 text-muted-foreground">{o.buyerId?.name || "Unknown"}</td>
                                        <td className="py-3 text-foreground font-semibold">₹{(o.totalAmount || 0).toLocaleString()}</td>
                                        <td className="py-3">
                                            <span className={`text-xs font-bold tracking-wider px-2 py-1 uppercase rounded-md shadow-sm ${o.orderStatus === "Completed" ? "bg-green-500/20 text-green-500" :
                                                o.orderStatus === "Shipped" ? "bg-primary/20 text-primary" : "bg-yellow-500/20 text-yellow-500"
                                                }`}>
                                                {o.orderStatus}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="py-6 text-center text-muted-foreground italic">No recent orders found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
