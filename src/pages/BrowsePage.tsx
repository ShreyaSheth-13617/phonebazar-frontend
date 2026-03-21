import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import ProductCard, { MOCK_PRODUCTS } from "@/components/ProductCard";

const conditions = ["All", "Like New", "Excellent", "Good", "Fair"];

export default function BrowsePage() {
  const [search, setSearch] = useState("");
  const [condition, setCondition] = useState("All");

  const filtered = MOCK_PRODUCTS.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCondition = condition === "All" || p.condition === condition;
    return matchSearch && matchCondition;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-foreground mb-2">Browse Phones</h1>
      <p className="text-muted-foreground mb-8">Find your perfect device from verified sellers</p>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search phones..."
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
          {conditions.map((c) => (
            <button
              key={c}
              onClick={() => setCondition(c)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition ${
                condition === c ? "bg-primary text-primary-foreground" : "bg-card border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">No phones found matching your criteria.</div>
      )}
    </div>
  );
}
