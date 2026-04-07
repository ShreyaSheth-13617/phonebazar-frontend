import { useEffect, useState } from "react";
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  CreditCard,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import api from "@/api/axios";

export default function OrdersPage() {
  const { user, isAuthenticated } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      setOrders([]);
      setLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await api.get("/orders/user");
        const list = Array.isArray(data?.data) ? data.data : [];
        if (!cancelled) setOrders(list);
      } catch (e) {
        if (!cancelled) {
          setError(e.response?.data?.message || e.message || "Failed to load");
          setOrders([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, user]);

  const getStatusColor = (status) => {
    const s = String(status || "").toLowerCase();
    if (s.includes("process")) return "bg-yellow-100 text-yellow-800 border-yellow-200";
    if (s.includes("ship")) return "bg-blue-100 text-blue-800 border-blue-200";
    if (s.includes("deliver")) return "bg-green-100 text-green-800 border-green-200";
    if (s.includes("cancel")) return "bg-red-100 text-red-800 border-red-200";
    return "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getStatusIcon = (status) => {
    const s = String(status || "").toLowerCase();
    if (s.includes("process")) return <Clock className="h-4 w-4" />;
    if (s.includes("ship")) return <Truck className="h-4 w-4" />;
    if (s.includes("deliver")) return <CheckCircle className="h-4 w-4" />;
    return <Package className="h-4 w-4" />;
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10 text-muted-foreground text-center">
        Loading orders…
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10 text-center text-destructive">
        {error}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="text-center">
          <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-foreground mb-2">No orders yet</h1>
          <p className="text-muted-foreground mb-6">
            You haven&apos;t placed any orders yet. Start shopping to see your orders here!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-foreground mb-2">My Orders</h1>
      <p className="text-muted-foreground mb-8">Track and manage your orders</p>

      <div className="space-y-6">
        {orders.map((order) => {
          const phone = order.phoneId && typeof order.phoneId === "object" ? order.phoneId : null;
          const img = phone?.images?.[0];
          const status = order.orderStatus || "Processing";
          const placed = order.createdAt || order.orderDate;

          return (
            <Card key={order._id} className="overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle className="text-lg">Order #{String(order._id).slice(-8)}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Placed on{" "}
                      {placed
                        ? new Date(placed).toLocaleDateString("en-IN", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : "—"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(status)}
                    <Badge variant="outline" className={getStatusColor(status)}>
                      {status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {phone && (
                  <div className="flex items-center gap-4 p-3 bg-secondary/50 rounded-lg">
                    <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center overflow-hidden">
                      {img ? (
                        <img src={img} alt={phone.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-lg">📱</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{phone.name}</p>
                      <p className="text-sm text-muted-foreground">Qty: {order.quantity || 1}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        ₹
                        {(
                          (order.totalAmount != null
                            ? order.totalAmount
                            : phone.price * (order.quantity || 1)) || 0
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>
                )}

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Shipping Address
                    </h4>
                    {order.shippingInfo ? (
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p className="font-medium text-foreground">{order.shippingInfo.name}</p>
                        <p>{order.shippingInfo.address}</p>
                        <p>
                          {order.shippingInfo.city}, {order.shippingInfo.pincode}
                        </p>
                        <p>{order.shippingInfo.phone}</p>
                        <p>{order.shippingInfo.email}</p>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">—</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      Payment
                    </h4>
                    <div className="text-sm space-y-1">
                      <div className="text-muted-foreground flex items-center gap-2">
                        Method:{" "}
                        {String(order.paymentMethod).toLowerCase() === "online" ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                            Paid Online
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
                            Cash on Delivery
                          </span>
                        )}
                      </div>
                      {order.totalAmount != null && (
                        <p className="font-semibold text-lg pt-1">
                          Total: ₹{Number(order.totalAmount).toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
