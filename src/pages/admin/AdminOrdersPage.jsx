import { useEffect, useState } from "react";
import api from "@/api/axios";

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await api.get("/orders"); // ✅ getAllOrders
                setOrders(data.data); // ✅ IMPORTANT
            } catch (error) {
                console.error(error);
            }
        };

        fetchOrders();
    }, []);


    
    return (<div className="p-6">
      <h1 className="text-2xl font-bold text-foreground mb-1">All Orders</h1>
      <p className="text-muted-foreground mb-8">Monitor all platform orders</p>
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="text-left text-muted-foreground border-b border-border">
              <th className="px-5 py-3">Order ID</th><th className="px-5 py-3">Product</th><th className="px-5 py-3">Buyer</th><th className="px-5 py-3">Seller</th><th className="px-5 py-3">Amount</th><th className="px-5 py-3">Date</th><th className="px-5 py-3">Status</th>
            </tr></thead>
            <tbody>
              {orders.map((o) => (<tr key={o.id} className="border-b border-border last:border-0">
                  <td className="px-5 py-3 text-muted-foreground">{o._id}</td>
                  <td className="px-5 py-3 text-foreground">{o.phoneId?.name}</td>
                  <td className="px-5 py-3 text-muted-foreground">{o.buyerId?.name}</td>
                  <td className="px-5 py-3 text-muted-foreground">{o.sellerId?.name}</td>
                  <td className="px-5 py-3 text-foreground">₹{o.totalAmount}</td>
                  <td className="px-5 py-3 text-muted-foreground">{new Date(o.createdAt).toLocaleDateString()}</td>
                  <td className="px-5 py-3"><span className={`text-xs font-medium px-2 py-1 rounded-md ${o.orderStatus === "Completed" ? "bg-green-400/10 text-green-400" :
                o.orderStatus === "Shipped" ? "bg-primary/10 text-primary" :
                    o.orderStatus === "Cancelled" ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground"}`}>{o.orderStatus}</span></td>
                </tr>))}
            </tbody>
          </table>
        </div>
      </div>
    </div>);
}
