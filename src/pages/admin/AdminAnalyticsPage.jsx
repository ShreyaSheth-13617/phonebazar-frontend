import { useState, useEffect } from "react";
import { Users, Package, ShoppingCart, DollarSign, TrendingUp } from "lucide-react";
import api from "@/api/axios";
import { useToast } from "@/hooks/use-toast";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from "recharts";

export default function AdminAnalyticsPage() {
    const { toast } = useToast();
    const [analytics, setAnalytics] = useState({
        totalUsers: 0,
        totalProducts: 0,
        totalOrders: 0,
        totalRevenue: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const { data } = await api.get("/admin/stats");
                setAnalytics(data.data);
            } catch (error) {
                toast({
                    title: "Failed to load analytics",
                    description: error.response?.data?.message || "Check server connection",
                    variant: "destructive",
                });
            } finally {
                setLoading(false);
            }
        };
        fetchAnalytics();
    }, [toast]);

    if (loading) return <div className="p-6 text-muted-foreground">Loading Platform Analytics...</div>;

    const stats = [
        { label: "Total Users", value: analytics.totalUsers, icon: Users, change: "Live" },
        { label: "Active Listings", value: analytics.totalProducts, icon: Package, change: "Live" },
        { label: "Total Orders", value: analytics.totalOrders, icon: ShoppingCart, change: "Live" },
        { label: "Gross Revenue", value: `₹${analytics.totalRevenue.toLocaleString()}`, icon: DollarSign, change: "Live" },
    ];

    // Mock timeline propagation based off real aggregate value for Recharts
    const growthData = [
        { name: "Jan", Users: Math.round(analytics.totalUsers * 0.1), Orders: Math.round(analytics.totalOrders * 0.05) },
        { name: "Feb", Users: Math.round(analytics.totalUsers * 0.2), Orders: Math.round(analytics.totalOrders * 0.1) },
        { name: "Mar", Users: Math.round(analytics.totalUsers * 0.3), Orders: Math.round(analytics.totalOrders * 0.2) },
        { name: "Apr", Users: Math.round(analytics.totalUsers * 0.5), Orders: Math.round(analytics.totalOrders * 0.4) },
        { name: "May", Users: Math.round(analytics.totalUsers * 0.7), Orders: Math.round(analytics.totalOrders * 0.8) },
        { name: "Jun", Users: analytics.totalUsers, Orders: analytics.totalOrders },
    ];

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-foreground mb-1">Platform Analytics</h1>
            <p className="text-muted-foreground mb-8">Deep dive into PhoneBazar metrics</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                {stats.map((s, i) => (
                    <div key={i} className="glass-card p-5 relative overflow-hidden group">
                        <s.icon className="absolute -right-4 -bottom-4 h-24 w-24 text-primary opacity-[0.03] group-hover:opacity-[0.06] transition" />
                        <div className="flex items-center justify-between mb-3">
                            <s.icon className="h-5 w-5 text-primary"/>
                            <span className="text-xs text-green-400 font-medium bg-green-500/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                                <TrendingUp className="w-3 h-3"/> {s.change}
                            </span>
                        </div>
                        <p className="text-3xl font-bold text-foreground z-10 relative">{s.value}</p>
                        <p className="text-sm text-muted-foreground z-10 relative mt-1">{s.label}</p>
                    </div>
                ))}
            </div>
            
            <div className="mb-8 glass-card p-6 h-[400px]">
                <h2 className="text-lg font-semibold text-foreground mb-6">Aggregate Platform Growth Trajectory (Simulation)</h2>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={growthData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" opacity={0.2} />
                        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                        <RechartsTooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}/>
                        <Legend verticalAlign="top" height={36}/>
                        <Area type="monotone" dataKey="Users" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorUsers)" strokeWidth={2} />
                        <Area type="monotone" dataKey="Orders" stroke="#10b981" fillOpacity={1} fill="url(#colorOrders)" strokeWidth={2} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
