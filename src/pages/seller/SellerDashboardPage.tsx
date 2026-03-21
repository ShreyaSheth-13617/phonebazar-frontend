import { Package, ShoppingCart, DollarSign, TrendingUp } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function SellerDashboard() {
  const { user } = useAuth();
  const stats = [
    { label: "Total Listings", value: "24", icon: Package, change: "+3" },
    { label: "Active Orders", value: "8", icon: ShoppingCart, change: "+2" },
    { label: "Revenue", value: "₹4,85,000", icon: DollarSign, change: "+12%" },
    { label: "Views", value: "1,247", icon: TrendingUp, change: "+18%" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-foreground mb-1">Seller Dashboard</h1>
      <p className="text-muted-foreground mb-8">Welcome back, {user?.name}</p>
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
        <h2 className="text-lg font-semibold text-foreground mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="text-left text-muted-foreground border-b border-border">
              <th className="pb-3">Product</th><th className="pb-3">Buyer</th><th className="pb-3">Amount</th><th className="pb-3">Status</th>
            </tr></thead>
            <tbody>
              {[
                { product: "iPhone 14 Pro", buyer: "Rahul S.", amount: "₹62,999", status: "Completed" },
                { product: "Samsung S23", buyer: "Priya M.", amount: "₹54,999", status: "Shipped" },
                { product: "OnePlus 12", buyer: "Amit K.", amount: "₹38,999", status: "Processing" },
              ].map((o, i) => (
                <tr key={i} className="border-b border-border last:border-0">
                  <td className="py-3 text-foreground">{o.product}</td>
                  <td className="py-3 text-muted-foreground">{o.buyer}</td>
                  <td className="py-3 text-foreground">{o.amount}</td>
                  <td className="py-3"><span className={`text-xs font-medium px-2 py-1 rounded-md ${
                    o.status === "Completed" ? "bg-green-400/10 text-green-400" :
                    o.status === "Shipped" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                  }`}>{o.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
