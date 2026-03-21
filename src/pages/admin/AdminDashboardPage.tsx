import { Users, Package, ShoppingCart, DollarSign } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    { label: "Total Users", value: "12,450", icon: Users, change: "+340" },
    { label: "Active Listings", value: "3,800", icon: Package, change: "+120" },
    { label: "Total Orders", value: "8,200", icon: ShoppingCart, change: "+95" },
    { label: "Revenue", value: "₹2.4Cr", icon: DollarSign, change: "+22%" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-foreground mb-1">Admin Dashboard</h1>
      <p className="text-muted-foreground mb-8">Platform overview</p>
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Recent Signups</h2>
          {[
            { name: "Rahul S.", email: "rahul@test.com", role: "Buyer", date: "Today" },
            { name: "Priya M.", email: "priya@test.com", role: "Seller", date: "Yesterday" },
            { name: "Amit K.", email: "amit@test.com", role: "Buyer", date: "2 days ago" },
          ].map((u, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">{u.name.charAt(0)}</div>
                <div>
                  <p className="text-sm font-medium text-foreground">{u.name}</p>
                  <p className="text-xs text-muted-foreground">{u.email}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs px-2 py-1 rounded-md bg-secondary text-muted-foreground">{u.role}</span>
                <p className="text-xs text-muted-foreground mt-1">{u.date}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Recent Orders</h2>
          {[
            { product: "iPhone 14 Pro", amount: "₹62,999", status: "Completed" },
            { product: "Samsung S23", amount: "₹54,999", status: "Shipped" },
            { product: "OnePlus 12", amount: "₹38,999", status: "Processing" },
          ].map((o, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
              <div>
                <p className="text-sm font-medium text-foreground">{o.product}</p>
                <p className="text-xs text-muted-foreground">{o.amount}</p>
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-md ${
                o.status === "Completed" ? "bg-green-400/10 text-green-400" :
                o.status === "Shipped" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
              }`}>{o.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
