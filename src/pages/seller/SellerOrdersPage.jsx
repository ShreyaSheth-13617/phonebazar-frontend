import { useEffect, useState } from "react";
import api from "@/api/axios";

export default function SellerOrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get("/orders/seller-orders");
        setOrders(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();
  }, []);

  const updateStatus = async (orderId, status) => {
    try {
      await api.put(`/orders/${orderId}/shipment`, {
        shipmentStatus: status,
      });

      setOrders((prev) =>
        prev.map((o) =>
          o._id === orderId ? { ...o, shipmentStatus: status } : o
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const getStatusStyle = (status) => {
    const s = String(status || "").toLowerCase();

    if (s.includes("process"))
      return "bg-yellow-100 text-yellow-800";
    if (s.includes("ship"))
      return "bg-blue-100 text-blue-800";
    if (s.includes("deliver"))
      return "bg-green-100 text-green-800";

    return "bg-gray-100 text-gray-800";
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-foreground mb-1">Orders</h1>
      <p className="text-muted-foreground mb-8">
        Manage incoming orders
      </p>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-muted-foreground border-b border-border">
                <th className="px-5 py-3">Order ID</th>
                <th className="px-5 py-3">Product</th>
                <th className="px-5 py-3">Buyer</th>
                <th className="px-5 py-3">Amount</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Action</th> {/* ✅ added */}
              </tr>
            </thead>

            <tbody>
              {orders.map((o) => {
                const status = o.shipmentStatus || "Pending";

                return (
                  <tr
                    key={o._id} // ✅ FIXED
                    className="border-b border-border last:border-0"
                  >
                    <td className="px-5 py-3 text-muted-foreground">
                      {o._id.slice(-6)} {/* ✅ FIXED */}
                    </td>

                    <td className="px-5 py-3 text-foreground">
                      {o.phoneId?.name}
                    </td>

                    <td className="px-5 py-3 text-muted-foreground">
                      {o.buyerId?.name}
                    </td>

                    <td className="px-5 py-3 text-foreground">
                      ₹{o.totalAmount}
                      <div className="text-[10px] uppercase mt-0.5 font-semibold">
                        {String(o.paymentMethod).toLowerCase() === "online" ? (
                          <span className="text-green-600 bg-green-100 px-1 py-0.5 rounded">Paid Online</span>
                        ) : (
                          <span className="text-amber-600 bg-amber-100 px-1 py-0.5 rounded">COD</span>
                        )}
                      </div>
                    </td>

                    <td className="px-5 py-3 text-muted-foreground">
                      {new Date(o.createdAt).toLocaleDateString()} {/* ✅ FIXED */}
                    </td>

                    <td className="px-5 py-3">
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-md ${getStatusStyle(
                          status
                        )}`}
                      >
                        {status} {/* ✅ FIXED */}
                      </span>
                    </td>

                    {/* ✅ ACTION BUTTON FIXED */}
                    <td className="px-5 py-3">
                      {status === "Pending" && (
                        <button
                          onClick={() =>
                            updateStatus(o._id, "Shipped")
                          }
                          className="text-xs px-2 py-1 bg-primary text-white rounded hover:opacity-90 transition"
                        >
                          Mark as Shipped
                        </button>
                      )}

                      {status === "Shipped" && (
                        <button
                          onClick={() =>
                            updateStatus(o._id, "Delivered")
                          }
                          className="text-xs px-2 py-1 bg-green-600 text-white rounded hover:opacity-90 transition"
                        >
                          Deliver
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}