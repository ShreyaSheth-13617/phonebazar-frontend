import { useMemo, useState, useEffect } from "react";
import { Search, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import api from "@/api/axios";
import { normalizeProduct } from "@/utils/product";

const conditions = ["All", "Like New", "Excellent", "Good", "Fair"];

const SORT_OPTIONS = [
  { value: "newest", label: "Newest first" },
  { value: "price_asc", label: "Price: low to high" },
  { value: "price_desc", label: "Price: high to low" },
];

export default function BrowsePage() {
  const [search, setSearch] = useState("");
  const [condition, setCondition] = useState("All");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [sort, setSort] = useState("newest");

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await api.get("/products");
        const raw = Array.isArray(data?.data) ? data.data : [];
        const normalized = raw.map(normalizeProduct);
        if (!cancelled) setListings(normalized);
      } catch (e) {
        if (!cancelled) {
          setError(
            e.response?.data?.message || e.message || "Failed to load listings"
          );
          setListings([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    let list = listings.filter((p) => {
      const q = search.toLowerCase();

      const matchSearch =
        p.name?.toLowerCase().includes(q) ||
        p.brand?.toLowerCase().includes(q);

      const matchCondition =
        condition === "All" || p.condition === condition;

      const min = priceMin === "" ? null : Number(priceMin);
      const max = priceMax === "" ? null : Number(priceMax);

      const matchMin =
        min === null || Number.isNaN(min) || p.price >= min;

      const matchMax =
        max === null || Number.isNaN(max) || p.price <= max;

      return matchSearch && matchCondition && matchMin && matchMax;
    });

    const byDate = (a, b) =>
      new Date(b.createdAt || b.postedAt) -
      new Date(a.createdAt || a.postedAt);

    if (sort === "price_asc") {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sort === "price_desc") {
      list = [...list].sort((a, b) => b.price - a.price);
    } else {
      list = [...list].sort(byDate);
    }

    return list;
  }, [search, condition, priceMin, priceMax, sort, listings]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-foreground mb-2">
        Browse used phones
      </h1>
      <p className="text-muted-foreground mb-8">
        Listings ship nationwide — contact sellers and agree delivery on the ad.
      </p>

      <div className="space-y-4 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by model or brand..."
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground hidden sm:block" />
            {conditions.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCondition(c)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition ${
                  condition === c
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row flex-wrap gap-4 items-stretch sm:items-end">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-muted-foreground">
              Min price (₹)
            </label>
            <input
              type="number"
              min={0}
              value={priceMin}
              onChange={(e) => setPriceMin(e.target.value)}
              placeholder="0"
              className="w-full sm:w-28 px-3 py-2 rounded-lg text-sm bg-card border border-border text-foreground"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-muted-foreground">
              Max price (₹)
            </label>
            <input
              type="number"
              min={0}
              value={priceMax}
              onChange={(e) => setPriceMax(e.target.value)}
              placeholder="Any"
              className="w-full sm:w-28 px-3 py-2 rounded-lg text-sm bg-card border border-border text-foreground"
            />
          </div>

          <div className="flex flex-col gap-1 flex-1 min-w-[180px]">
            <label className="text-xs text-muted-foreground flex items-center gap-1">
              <ArrowUpDown className="h-3 w-3" /> Sort
            </label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-3 py-2 rounded-lg text-sm bg-card border border-border text-foreground"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="glass-card h-72 animate-pulse bg-secondary/50 rounded-xl"
            />
          ))}
        </div>
      )}

      {error && !loading && (
        <p className="text-center text-destructive py-12">{error}</p>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          No listings match your filters.
        </div>
      )}
    </div>
  );
}
