export default function SellerOrdersPage() {
  const orders = [
    { id: "ORD-101", product: "iPhone 14 Pro", buyer: "Rahul S.", amount: "₹62,999", status: "Completed", date: "Mar 15" },
    { id: "ORD-102", product: "Samsung S23", buyer: "Priya M.", amount: "₹54,999", status: "Shipped", date: "Mar 12" },
    { id: "ORD-103", product: "OnePlus 12", buyer: "Amit K.", amount: "₹38,999", status: "Processing", date: "Mar 10" },
    { id: "ORD-104", product: "Pixel 8", buyer: "Sneha R.", amount: "₹41,999", status: "Completed", date: "Mar 8" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-foreground mb-1">Orders</h1>
      <p className="text-muted-foreground mb-8">Manage incoming orders</p>
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="text-left text-muted-foreground border-b border-border">
              <th className="px-5 py-3">Order ID</th><th className="px-5 py-3">Product</th><th className="px-5 py-3">Buyer</th><th className="px-5 py-3">Amount</th><th className="px-5 py-3">Date</th><th className="px-5 py-3">Status</th>
            </tr></thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-b border-border last:border-0">
                  <td className="px-5 py-3 text-muted-foreground">{o.id}</td>
                  <td className="px-5 py-3 text-foreground">{o.product}</td>
                  <td className="px-5 py-3 text-muted-foreground">{o.buyer}</td>
                  <td className="px-5 py-3 text-foreground">{o.amount}</td>
                  <td className="px-5 py-3 text-muted-foreground">{o.date}</td>
                  <td className="px-5 py-3"><span className={`text-xs font-medium px-2 py-1 rounded-md ${
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
