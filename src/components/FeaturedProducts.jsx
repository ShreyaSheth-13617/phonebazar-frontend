import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import api from "@/api/axios";
import { normalizeProduct } from "@/utils/product";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await api.get("/products");
        const list = Array.isArray(data?.data) ? data.data : [];
        const slice = list.slice(0, 8).map(normalizeProduct);
        if (!cancelled) setProducts(slice);
      } catch (e) {
        if (!cancelled) {
          setError(e.response?.data?.message || e.message || "Failed to load");
          setProducts([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Featured listings
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Used phones from sellers near you
            </p>
          </div>
        </div>
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="glass-card h-72 animate-pulse bg-secondary/50 rounded-xl"
              />
            ))}
          </div>
        )}
        {error && !loading && (
          <p className="text-sm text-destructive">{error}</p>
        )}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
        {!loading && !error && products.length === 0 && (
          <p className="text-muted-foreground text-sm">
            No listings yet. Be the first to sell a phone.
          </p>
        )}
      </div>
    </section>
  );
}
