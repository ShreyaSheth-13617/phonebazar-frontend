import { useEffect, useState } from "react";
import { Package, Heart, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import api from "@/api/axios";

export default function BuyerDashboard() {
  const { user } = useAuth();
  const { getCartItemCount } = useCart();
  const [orderCount, setOrderCount] = useState(0);
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    if (!user?._id) {
      setOrderCount(0);
      setRecent([]);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const { data } = await api.get("/orders/user");
        const list = Array.isArray(data?.data) ? data.data : [];
        if (!cancelled) {
          setOrderCount(list.length);
          setRecent(list.slice(0, 5));
        }
      } catch {
        if (!cancelled) {
          setOrderCount(0);
          setRecent([]);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user?._id]);

  const stats = [
    { label: "Orders", value: orderCount.toString(), icon: Package, path: "/orders" },
    { label: "Saved ads", value: "0", icon: Heart, path: "/wishlist" },
    { label: "Cart items", value: getCartItemCount().toString(), icon: ShoppingBag },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-foreground mb-2">Welcome, {user?.name}</h1>
      <p className="text-muted-foreground mb-8">Your PhoneBazar buyer overview</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
        {stats.map((s, i) => (
          <div key={i} className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <s.icon className="h-5 w-5 text-primary" />
              {s.path && (
                <Link to={s.path} className="text-xs text-primary hover:underline">
                  View
                </Link>
              )}
            </div>
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="glass-card p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Recent orders</h2>
        <div className="space-y-3">
          {recent.length === 0 && (
            <p className="text-sm text-muted-foreground">No orders yet.</p>
          )}
          {recent.map((order) => {
            const phone = order.phoneId && typeof order.phoneId === "object" ? order.phoneId : null;
            const placed = order.createdAt || order.orderDate;
            return (
              <div
                key={order._id}
                className="flex items-center justify-between py-3 border-b border-border last:border-0"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {phone?.name || "Order"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {placed ? new Date(placed).toLocaleDateString() : "—"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">
                    {order.totalAmount != null
                      ? `₹${Number(order.totalAmount).toLocaleString()}`
                      : phone?.price != null
                        ? `₹${Number(phone.price).toLocaleString()}`
                        : "—"}
                  </p>
                  <span className="text-xs text-muted-foreground">
                    {order.orderStatus || "Processing"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
