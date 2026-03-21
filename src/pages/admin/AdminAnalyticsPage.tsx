import { Users, Package, ShoppingCart, DollarSign } from "lucide-react";

export default function AdminAnalyticsPage() {
  const stats = [
    { label: "New Users (30d)", value: "1,240", icon: Users, change: "+18%" },
    { label: "New Listings (30d)", value: "680", icon: Package, change: "+12%" },
    { label: "Orders (30d)", value: "920", icon: ShoppingCart, change: "+25%" },
    { label: "Revenue (30d)", value: "₹38L", icon: DollarSign, change: "+22%" },
  ];

  const monthlyData = [
    { month: "Oct", users: 800, orders: 450 },
    { month: "Nov", users: 950, orders: 580 },
    { month: "Dec", users: 1100, orders: 720 },
    { month: "Jan", users: 980, orders: 650 },
    { month: "Feb", users: 1150, orders: 810 },
    { month: "Mar", users: 1240, orders: 920 },
  ];

  const maxUsers = Math.max(...monthlyData.map((d) => d.users));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-foreground mb-1">Platform Analytics</h1>
      <p className="text-muted-foreground mb-8">Overall platform performance</p>
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
        <h2 className="text-lg font-semibold text-foreground mb-6">Monthly Growth</h2>
        <div className="flex items-end gap-4 h-48">
          {monthlyData.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-xs text-muted-foreground">{d.users}</span>
              <div
                className="w-full bg-primary/80 rounded-t-md transition-all"
                style={{ height: `${(d.users / maxUsers) * 100}%` }}
              />
              <span className="text-xs text-muted-foreground">{d.month}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
