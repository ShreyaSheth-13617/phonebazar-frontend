import { Package, Heart, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function BuyerDashboard() {
  const { user } = useAuth();
  
  const stats = [
    { label: "Orders", value: "3", icon: Package, path: "/orders" },
    { label: "Wishlist", value: "7", icon: Heart, path: "/wishlist" },
    { label: "Saved", value: "₹12,500", icon: ShoppingBag },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-foreground mb-2">Welcome, {user?.name}</h1>
      <p className="text-muted-foreground mb-8">Here's your account overview</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
        {stats.map((s, i) => (
          <div key={i} className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <s.icon className="h-5 w-5 text-primary" />
              {s.path && <Link to={s.path} className="text-xs text-primary hover:underline">View all</Link>}
            </div>
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="glass-card p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Recent Orders</h2>
        <div className="space-y-3">
          {[
            { name: "iPhone 14 Pro", date: "Mar 15, 2026", status: "Delivered", price: "₹62,999" },
            { name: "Samsung S23", date: "Mar 10, 2026", status: "In Transit", price: "₹54,999" },
            { name: "OnePlus 12", date: "Feb 28, 2026", status: "Delivered", price: "₹38,999" },
          ].map((order, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
              <div>
                <p className="text-sm font-medium text-foreground">{order.name}</p>
                <p className="text-xs text-muted-foreground">{order.date}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">{order.price}</p>
                <span className={`text-xs ${order.status === "Delivered" ? "text-green-400" : "text-primary"}`}>{order.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
