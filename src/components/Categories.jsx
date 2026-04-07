const categories = [
    { name: "iPhone", emoji: "🍎", count: "2,400+" },
    { name: "Samsung", emoji: "📲", count: "1,800+" },
    { name: "OnePlus", emoji: "🔴", count: "900+" },
    { name: "Google Pixel", emoji: "🟢", count: "600+" },
    { name: "Xiaomi", emoji: "🟠", count: "1,200+" },
    { name: "Realme", emoji: "🟡", count: "700+" },
];
export default function Categories() {
    return (<section className="py-16 px-4 bg-card">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-foreground mb-2 text-center">Shop by Brand</h2>
        <p className="text-sm text-muted-foreground text-center mb-10">Find the perfect phone from top brands</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((c) => (<div key={c.name} className="glass-card hover-lift p-6 text-center cursor-pointer">
              <div className="text-4xl mb-3">{c.emoji}</div>
              <h3 className="text-sm font-semibold text-foreground">{c.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">{c.count} listings</p>
            </div>))}
        </div>
      </div>
    </section>);
}
