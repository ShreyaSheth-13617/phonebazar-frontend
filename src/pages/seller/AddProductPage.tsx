import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function AddProductPage() {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", price: "", condition: "Like New", description: "", brand: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({ title: "Product added!", description: "Your listing is now live." });
    setForm({ name: "", price: "", condition: "Like New", description: "", brand: "" });
  };

  const inputClass = "w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50";

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-2xl font-bold text-foreground mb-1">Add New Product</h1>
      <p className="text-muted-foreground mb-8">List your phone for sale</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Phone Name" required className={inputClass} />
        <input value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} placeholder="Brand" required className={inputClass} />
        <input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} type="number" placeholder="Price (₹)" required className={inputClass} />
        <select value={form.condition} onChange={(e) => setForm({ ...form, condition: e.target.value })}
          className={inputClass}>
          <option value="Like New">Like New</option>
          <option value="Excellent">Excellent</option>
          <option value="Good">Good</option>
          <option value="Fair">Fair</option>
        </select>
        <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Description" rows={4} className={`${inputClass} resize-none`} />
        <div className="glass-card p-8 text-center border-dashed cursor-pointer">
          <p className="text-sm text-muted-foreground">Click to upload images</p>
          <p className="text-xs text-muted-foreground mt-1">JPG, PNG up to 5MB</p>
        </div>
        <button type="submit" className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition">List Product</button>
      </form>
    </div>
  );
}
