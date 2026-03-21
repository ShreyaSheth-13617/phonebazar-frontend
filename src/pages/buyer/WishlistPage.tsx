import ProductCard, { MOCK_PRODUCTS } from "@/components/ProductCard";

export default function WishlistPage() {
  const wishlist = MOCK_PRODUCTS.slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-foreground mb-2">My Wishlist</h1>
      <p className="text-muted-foreground mb-8">{wishlist.length} items saved</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {wishlist.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
