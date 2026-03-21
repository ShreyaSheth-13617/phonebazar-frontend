import { TrendingUp, Eye, ShoppingCart, DollarSign } from "lucide-react";

export default function SellerAnalyticsPage() {
  const stats = [
    { label: "Total Views", value: "12,847", icon: Eye, change: "+24%" },
    { label: "Conversion Rate", value: "3.2%", icon: TrendingUp, change: "+0.5%" },
    { label: "Total Sales", value: "45", icon: ShoppingCart, change: "+8" },
    { label: "Revenue", value: "₹14,25,000", icon: DollarSign, change: "+18%" },
  ];

  const monthlyData = [
    { month: "Oct", sales: 5, revenue: 180000 },
    { month: "Nov", sales: 8, revenue: 320000 },
    { month: "Dec", sales: 12, revenue: 480000 },
    { month: "Jan", sales: 7, revenue: 280000 },
    { month: "Feb", sales: 10, revenue: 420000 },
    { month: "Mar", sales: 15, revenue: 585000 },
  ];

  const maxRevenue = Math.max(...monthlyData.map((d) => d.revenue));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-foreground mb-1">Analytics</h1>
      <p className="text-muted-foreground mb-8">Track your performance</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((s, i) => (
          <div key={i} className="glass-card p-5">
            <div className="flex items-center justify-between mb-3">
              <s.icon className="h-5 w-5 text-primary" />
              <span className="text-xs text-green-400 font-medium">{s.change}</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="glass-card p-6">
        <h2 className="text-lg font-semibold text-foreground mb-6">Monthly Revenue</h2>
        <div className="flex items-end gap-4 h-48">
          {monthlyData.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-xs text-muted-foreground">₹{(d.revenue / 1000).toFixed(0)}K</span>
              <div
                className="w-full bg-primary/80 rounded-t-md transition-all"
                style={{ height: `${(d.revenue / maxRevenue) * 100}%` }}
              />
              <span className="text-xs text-muted-foreground">{d.month}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
