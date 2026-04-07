import { useState, useEffect } from "react";
import { TrendingUp, Eye, ShoppingCart, DollarSign, Package } from "lucide-react";
import api from "@/api/axios";
import { useToast } from "@/hooks/use-toast";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from "recharts";

export default function SellerAnalyticsPage() {
    const { toast } = useToast();
    const [analyticsData, setAnalyticsData] = useState({
        totalListings: 0,
        totalOrders: 0,
        activeOrders: 0,
        totalRevenue: 0,
        recentOrders: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const { data } = await api.get("/orders/seller-stats");
                setAnalyticsData(data.data);
            } catch (error) {
                toast({
                    title: "Failed to load analytics",
                    description: error.response?.data?.message || "Check your network",
                    variant: "destructive",
                });
            } finally {
                setLoading(false);
            }
        };
        fetchAnalytics();
    }, [toast]);

    if (loading) return <div className="p-6 text-muted-foreground">Loading Analytics...</div>;

    const stats = [
        { label: "Active Listings", value: analyticsData.totalListings, icon: Package },
        { label: "Total Orders", value: analyticsData.totalOrders, icon: ShoppingCart },
        { label: "Active Orders", value: analyticsData.activeOrders, icon: ShoppingCart },
        { label: "Revenue", value: `₹${analyticsData.totalRevenue.toLocaleString()}`, icon: DollarSign },
    ];

    // Build timeline propagation for Recharts
    const growthData = [
        { name: "Oct", Revenue: Math.round(analyticsData.totalRevenue * 0.1) },
        { name: "Nov", Revenue: Math.round(analyticsData.totalRevenue * 0.2) },
        { name: "Dec", Revenue: Math.round(analyticsData.totalRevenue * 0.35) },
        { name: "Jan", Revenue: Math.round(analyticsData.totalRevenue * 0.6) },
        { name: "Feb", Revenue: Math.round(analyticsData.totalRevenue * 0.8) },
        { name: "Mar", Revenue: analyticsData.totalRevenue },
    ];

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-foreground mb-1">Analytics</h1>
            <p className="text-muted-foreground mb-8">Track your platform performance metrics</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                {stats.map((s, i) => (
                    <div key={i} className="glass-card p-5 relative overflow-hidden group">
                        <s.icon className="absolute top-4 right-4 h-12 w-12 text-primary opacity-5 group-hover:opacity-10 transition-opacity" />
                        <div className="flex items-center justify-between mb-3">
                            <s.icon className="h-5 w-5 text-primary" />
                            <span className="text-xs text-green-400 font-medium bg-green-500/10 px-2 py-0.5 rounded-md flex gap-1 items-center">
                                <TrendingUp className="h-3 w-3" /> {s.change}
                            </span>
                        </div>
                        <p className="text-3xl font-bold text-foreground">{s.value}</p>
                        <p className="text-sm text-muted-foreground">{s.label}</p>
                    </div>
                ))}
            </div>

            <div className="glass-card p-6 h-[400px]">
                <h2 className="text-lg font-semibold text-foreground mb-6">Revenue Trajectory (Simulation)</h2>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={growthData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" opacity={0.2} />
                        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `₹${(val / 1000)}k`} />
                        <RechartsTooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }} formatter={(val) => `₹${val.toLocaleString()}`} />
                        <Area type="monotone" dataKey="Revenue" stroke="#10b981" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={2} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
