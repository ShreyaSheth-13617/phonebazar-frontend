import { Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { MOCK_PRODUCTS } from "@/components/ProductCard";

export default function AdminListingsPage() {
  const { toast } = useToast();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-foreground mb-1">Manage Listings</h1>
      <p className="text-muted-foreground mb-8">Review and moderate product listings</p>
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="text-left text-muted-foreground border-b border-border">
              <th className="px-5 py-3">Product</th><th className="px-5 py-3">Price</th><th className="px-5 py-3">Condition</th><th className="px-5 py-3">Verified</th><th className="px-5 py-3">Actions</th>
            </tr></thead>
            <tbody>
              {MOCK_PRODUCTS.map((p) => (
                <tr key={p.id} className="border-b border-border last:border-0">
                  <td className="px-5 py-3 text-foreground font-medium">{p.name}</td>
                  <td className="px-5 py-3 text-foreground">₹{p.price.toLocaleString()}</td>
                  <td className="px-5 py-3 text-muted-foreground">{p.condition}</td>
                  <td className="px-5 py-3"><span className={`text-xs ${p.verified ? "text-green-400" : "text-muted-foreground"}`}>{p.verified ? "Yes" : "No"}</span></td>
                  <td className="px-5 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => toast({ title: `${p.name} approved` })}
                        className="p-1.5 rounded-md hover:bg-green-400/10 transition text-muted-foreground hover:text-green-400"><Check className="h-4 w-4" /></button>
                      <button onClick={() => toast({ title: `${p.name} removed`, variant: "destructive" })}
                        className="p-1.5 rounded-md hover:bg-destructive/10 transition text-muted-foreground hover:text-destructive"><X className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
