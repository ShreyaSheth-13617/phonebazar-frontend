import { MOCK_PRODUCTS } from "@/components/ProductCard";
import { Edit, Trash2 } from "lucide-react";

export default function SellerListings() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Listings</h1>
          <p className="text-muted-foreground">Manage your product listings</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {MOCK_PRODUCTS.slice(0, 6).map((p) => (
          <div key={p.id} className="glass-card p-4">
            <div className="aspect-square rounded-lg bg-secondary flex items-center justify-center text-4xl mb-3">{p.image}</div>
            <h3 className="text-sm font-semibold text-foreground">{p.name}</h3>
            <p className="text-lg font-bold text-primary my-1">₹{p.price.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mb-3">{p.condition}</p>
            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg bg-secondary text-sm text-foreground hover:bg-muted transition">
                <Edit className="h-3 w-3" /> Edit
              </button>
              <button className="flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-destructive/10 text-destructive text-sm hover:bg-destructive/20 transition">
                <Trash2 className="h-3 w-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
