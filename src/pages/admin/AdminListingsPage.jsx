import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import api from "@/api/axios";
import { normalizeProduct } from "@/utils/product";

export default function AdminListingsPage() {
  const { toast } = useToast();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const { data } = await api.get("/products");
        const raw = Array.isArray(data?.data) ? data.data : [];
        if (!cancelled) setListings(raw.map(normalizeProduct));
      } catch {
        if (!cancelled) setListings([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-muted-foreground">Loading listings…</div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-foreground mb-1">Manage listings</h1>
      <p className="text-muted-foreground mb-8">Review and moderate classified ads</p>
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-muted-foreground border-b border-border">
                <th className="px-5 py-3">Listing</th>
                <th className="px-5 py-3">City</th>
                <th className="px-5 py-3">Price</th>
                <th className="px-5 py-3">Condition</th>
                <th className="px-5 py-3">Verified</th>
                <th className="px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {listings.map((p) => (
                <tr key={p.id} className="border-b border-border last:border-0">
                  <td className="px-5 py-3 text-foreground font-medium">{p.name}</td>
                  <td className="px-5 py-3 text-muted-foreground">{p.city || "—"}</td>
                  <td className="px-5 py-3 text-foreground">₹{Number(p.price).toLocaleString()}</td>
                  <td className="px-5 py-3 text-muted-foreground">{p.condition}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`text-xs ${p.verified ? "text-green-400" : "text-muted-foreground"}`}
                    >
                      {p.verified ? "Yes" : "No"}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => toast({ title: `${p.name} noted` })}
                        className="p-1.5 rounded-md hover:bg-green-400/10 transition text-muted-foreground hover:text-green-400"
                      >
                        <Check className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          toast({ title: `${p.name} flagged`, variant: "destructive" })
                        }
                        className="p-1.5 rounded-md hover:bg-destructive/10 transition text-muted-foreground hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {listings.length === 0 && (
        <p className="text-muted-foreground mt-4 text-sm">No listings in the database.</p>
      )}
    </div>
  );
}
