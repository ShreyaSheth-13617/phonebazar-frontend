import { useEffect, useState } from "react";
import { Users, Package, ShoppingCart, DollarSign, Activity } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";
import api from "@/api/axios";
import { useToast } from "@/hooks/use-toast";

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalProducts: 0,
        totalOrders: 0,
        totalRevenue: 0,
        recentUsers: [],
        recentOrders: [],
    });
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await api.get("/admin/stats");
                setStats(data.data);
            } catch (error) {
                toast({
                    title: "Failed to load stats",
                    description: error.response?.data?.message || "Check server connection",
                    variant: "destructive",
                });
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, [toast]);

    if (loading) {
        return <div className="p-6 text-center text-muted-foreground">Loading Analytics...</div>;
    }

    const statCards = [
        { label: "Total Users", value: stats.totalUsers || 0, icon: Users, change: "Live" },
        { label: "Active Listings", value: stats.totalProducts || 0, icon: Package, change: "Live" },
        { label: "Total Orders", value: stats.totalOrders || 0, icon: ShoppingCart, change: "Live" },
        { label: "Revenue", value: `₹${(stats.totalRevenue || 0).toLocaleString()}`, icon: DollarSign, change: "Live" },
    ];

    // Dummy mock chart data based on overall totals for visual effect since backend only gives aggregates
    const chartData = [
        { name: "Jan", Users: Math.round(stats.totalUsers * 0.1), Orders: Math.round(stats.totalOrders * 0.05) },
        { name: "Feb", Users: Math.round(stats.totalUsers * 0.2), Orders: Math.round(stats.totalOrders * 0.1) },
        { name: "Mar", Users: Math.round(stats.totalUsers * 0.3), Orders: Math.round(stats.totalOrders * 0.2) },
        { name: "Apr", Users: Math.round(stats.totalUsers * 0.5), Orders: Math.round(stats.totalOrders * 0.4) },
        { name: "May", Users: Math.round(stats.totalUsers * 0.7), Orders: Math.round(stats.totalOrders * 0.8) },
        { name: "Jun", Users: stats.totalUsers, Orders: stats.totalOrders },
    ];

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-foreground mb-1">Admin Analytics</h1>
            <p className="text-muted-foreground mb-8">Platform overview & real-time statistics</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                {statCards.map((s, i) => (
                    <div key={i} className="glass-card p-5 border-l-4 border-l-primary relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-5">
                            <s.icon className="h-16 w-16" />
                        </div>
                        <div className="flex items-center justify-between mb-3">
                            <s.icon className="h-5 w-5 text-primary"/>
                            <span className="text-xs text-green-500 font-medium bg-green-500/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                                <Activity className="w-3 h-3"/> {s.change}
                            </span>
                        </div>
                        <p className="text-3xl font-bold text-foreground">{s.value}</p>
                        <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
                    </div>
                ))}
            </div>

            <div className="mb-8 glass-card p-6 h-[400px]">
                <h2 className="text-lg font-semibold text-foreground mb-6">Growth Trajectory</h2>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="glass-card p-6">
                    <h2 className="text-lg font-semibold text-foreground mb-4">Recent Users</h2>
                    {stats.recentUsers && stats.recentUsers.length > 0 ? (
                        stats.recentUsers.map((u, i) => (
                            <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0 hover:bg-secondary/30 transition-colors px-2 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold shadow-sm">
                                        {(u.name || "U").charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-foreground">{u.name}</p>
                                        <p className="text-xs text-muted-foreground">{u.email}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-md bg-secondary text-muted-foreground">{u.role}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-muted-foreground italic">No recent users found.</p>
                    )}
                </div>

                <div className="glass-card p-6">
                    <h2 className="text-lg font-semibold text-foreground mb-4">Recent Orders</h2>
                    {stats.recentOrders && stats.recentOrders.length > 0 ? (
                        stats.recentOrders.map((o, i) => (
                            <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0 hover:bg-secondary/30 transition-colors px-2 rounded-lg">
                                <div>
                                    <p className="text-sm font-semibold text-foreground">{o.phoneId?.name || "Product"}</p>
                                    <p className="text-xs text-muted-foreground font-medium text-emerald-500 mt-0.5">₹{(o.totalAmount || 0).toLocaleString()}</p>
                                </div>
                                <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md shadow-sm ${
                                    o.orderStatus === "Completed" ? "bg-green-500/20 text-green-600 dark:text-green-400" :
                                    o.orderStatus === "Shipped" ? "bg-blue-500/20 text-blue-600 dark:text-blue-400" : 
                                    "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400"
                                }`}>
                                    {o.orderStatus}
                                </span>
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-muted-foreground italic">No recent orders found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
