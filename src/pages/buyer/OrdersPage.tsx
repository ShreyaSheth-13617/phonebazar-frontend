import { Package } from "lucide-react";

const orders = [
  { id: "ORD-001", name: "iPhone 14 Pro", date: "Mar 15, 2026", status: "Delivered", price: "₹62,999" },
  { id: "ORD-002", name: "Samsung S23 Ultra", date: "Mar 10, 2026", status: "In Transit", price: "₹54,999" },
  { id: "ORD-003", name: "OnePlus 12", date: "Feb 28, 2026", status: "Delivered", price: "₹38,999" },
  { id: "ORD-004", name: "Google Pixel 8", date: "Feb 20, 2026", status: "Cancelled", price: "₹41,999" },
];

export default function OrdersPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-foreground mb-2">My Orders</h1>
      <p className="text-muted-foreground mb-8">Track and manage your orders</p>
      <div className="space-y-4">
        {orders.map((o) => (
          <div key={o.id} className="glass-card p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center">
                <Package className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{o.name}</p>
                <p className="text-xs text-muted-foreground">{o.id} • {o.date}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-foreground">{o.price}</p>
              <span className={`text-xs font-medium ${
                o.status === "Delivered" ? "text-green-400" :
                o.status === "In Transit" ? "text-primary" : "text-destructive"
              }`}>{o.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
