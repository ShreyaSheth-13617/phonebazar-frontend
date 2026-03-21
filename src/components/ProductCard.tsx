import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Heart, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const MOCK_PRODUCTS = [
  { id: 1, name: "iPhone 14 Pro", price: 62999, condition: "Like New", image: "📱", verified: true },
  { id: 2, name: "Samsung S23 Ultra", price: 54999, condition: "Excellent", image: "📱", verified: true },
  { id: 3, name: "OnePlus 12", price: 38999, condition: "Good", image: "📱", verified: false },
  { id: 4, name: "Google Pixel 8", price: 41999, condition: "Like New", image: "📱", verified: true },
  { id: 5, name: "iPhone 13", price: 39999, condition: "Good", image: "📱", verified: true },
  { id: 6, name: "Samsung S22", price: 29999, condition: "Fair", image: "📱", verified: false },
  { id: 7, name: "Xiaomi 14", price: 34999, condition: "Excellent", image: "📱", verified: true },
  { id: 8, name: "iPhone 15", price: 71999, condition: "Like New", image: "📱", verified: true },
];

export { MOCK_PRODUCTS };

export default function ProductCard({ product }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAuthAction = (action) => {
    if (!isAuthenticated) {
      toast({ title: "Please login to continue", description: `You need to login to ${action}.`, variant: "destructive" });
      navigate("/login");
      return;
    }
    toast({ title: `${action} successful!` });
  };

  return (
    <div className="glass-card hover-lift p-4 group">
      <div className="aspect-square rounded-lg bg-secondary flex items-center justify-center text-5xl mb-3 relative overflow-hidden">
        {product.image}
        {product.verified && (
          <div className="absolute top-2 left-2 flex items-center gap-1 bg-primary/90 text-primary-foreground text-xs font-medium px-2 py-1 rounded-md">
            <ShieldCheck className="h-3 w-3" /> Verified
          </div>
        )}
        <button
          onClick={() => handleAuthAction("add to wishlist")}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-background/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart className="h-4 w-4 text-muted-foreground hover:text-primary transition" />
        </button>
      </div>
      <h3 className="text-sm font-semibold text-foreground">{product.name}</h3>
      <p className="text-xs text-muted-foreground mb-2">{product.condition}</p>
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold text-primary">₹{product.price.toLocaleString()}</span>
        <button
          onClick={() => handleAuthAction("buy")}
          className="text-xs font-medium px-3 py-1.5 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
