import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Edit, Trash2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import api from "@/api/axios";
import { normalizeProduct } from "@/utils/product";

export default function SellerListings() {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      try {
        await api.delete(`/phones/${id}`);
        setListings((prev) => prev.filter((p) => p.id !== id && p._id !== id));
      } catch (err) {
        alert("Failed to delete product.");
      }
    }
  };

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const { data } = await api.get("/products/seller-listings");
        if (!cancelled) setListings(Array.isArray(data?.data) ? data.data.map(normalizeProduct) : []);
      } catch (err) {
        console.error("Seller Listings Fetch Error:", err);
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
      <div className="p-6 text-muted-foreground">Loading your listings…</div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My listings</h1>
          <p className="text-muted-foreground">Your posted ads</p>
        </div>
      </div>
      {listings.length === 0 ? (
        <p className="text-muted-foreground">You have no listings yet. Post one from the dashboard.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {listings.map((p) => (
            <div key={p.id} className="glass-card p-4">
              <Link
                to={`/listing/${p.id}`}
                className="block aspect-square rounded-lg bg-secondary overflow-hidden mb-3"
              >
                {typeof p.image === "string" && p.image.startsWith("http") ? (
                  <img src={p.image} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl">
                    {p.image || "📱"}
                  </div>
                )}
              </Link>
              <h3 className="text-sm font-semibold text-foreground">{p.name}</h3>
              <p className="text-lg font-bold text-primary my-1">₹{Number(p.price).toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mb-3">
                {p.condition} · {p.city || "—"}
              </p>
              <div className="flex gap-2">
                <Link
                  to={`/listing/${p.id}`}
                  className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg bg-secondary text-sm text-foreground hover:bg-muted transition text-center"
                >
                  View
                </Link>
                <Link
                  to={`/listing/${p.id}`}
                  className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg bg-secondary/50 text-foreground hover:bg-secondary transition"
                >
                  <Edit className="h-3 w-3" /> Edit
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(p.id || p._id)}
                  className="flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-destructive/10 text-destructive text-sm hover:bg-destructive/20 transition"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
