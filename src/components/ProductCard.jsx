import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { Heart, ShieldCheck, MapPin, ShoppingCart, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCompare } from "@/context/CompareContext";

export default function ProductCard({ product }) {
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { toggleCompare, isComparing } = useCompare();

  const listingUrl = `/listing/${product._id || product.id}`;
  const city = product.city;
  const rating = typeof product.rating === "number" ? product.rating : 0;
  const isCompared = isComparing(product._id || product.id);

  const [isSaved, setIsSaved] = useState(() => {
    const list = JSON.parse(localStorage.getItem('phonebazar_wishlist') || '[]');
    return list.some(item => (item.id || item._id) === (product.id || product._id));
  });

  const handleAuthAction = (e, action) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      toast({
        title: "Please login to continue",
        description: `You need to login to ${action}.`,
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    const list = JSON.parse(localStorage.getItem('phonebazar_wishlist') || '[]');
    const isCurrentlySaved = list.some(item => (item.id || item._id) === (product.id || product._id));
    if (isCurrentlySaved) {
      const newList = list.filter(item => (item.id || item._id) !== (product.id || product._id));
      localStorage.setItem('phonebazar_wishlist', JSON.stringify(newList));
      setIsSaved(false);
      toast({ title: "Removed from Wishlist" });
    } else {
      list.push(product);
      localStorage.setItem('phonebazar_wishlist', JSON.stringify(list));
      setIsSaved(true);
      toast({ title: "Added to Wishlist" });
    }
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      toast({
        title: "Please login to continue",
        description: "You need to login to add items to cart.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    try {
      await addToCart(product);
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      });
    } catch (err) {
      toast({
        title: "Could not add to cart",
        description:
          err.response?.data?.message || err.message || "Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="glass-card hover-lift p-4 group flex flex-col">
      <div className="relative mb-3">
        <Link to={listingUrl} className="block">
          <div className="aspect-square rounded-lg bg-secondary flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: "#FFFFFF" }}>
            {typeof product.image === "string" &&
              product.image.startsWith("http") ? (
              <img
                src={product.image}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover" 
                loading="lazy"
              />
            ) : (
              <span className="text-5xl">{product.image || "📱"}</span>
            )}
            {product.isSold ? (
              <div className="absolute top-2 left-2 flex items-center gap-1 bg-destructive/90 text-destructive-foreground text-xs font-medium px-2 py-1 rounded-md z-[1]">
                Sold Out
              </div>
            ) : product.verified ? (
              <div className="absolute top-2 left-2 flex items-center gap-1 bg-primary/90 text-primary-foreground text-xs font-medium px-2 py-1 rounded-md z-[1]">
                <ShieldCheck className="h-3 w-3" /> Verified
              </div>
            ) : null}
          </div>
        </Link>
        <button
          type="button"
          onClick={(e) => handleAuthAction(e, "save this ad")}
          className="absolute top-2 right-2 z-[2] w-8 h-8 rounded-full bg-background/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Save ad"
        >
          <Heart className={`h-4 w-4 transition ${isSaved ? "fill-primary text-primary" : "text-muted-foreground hover:text-primary"}`} />
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <Link to={listingUrl} className="block">
          <h3 className="text-sm font-semibold text-foreground hover:text-primary transition line-clamp-2">
            {product.name}
          </h3>
          <p className="text-xs text-muted-foreground mb-1">{product.condition}</p>
          {rating > 0 && (
            <p className="text-xs text-amber-500 flex items-center gap-1 mb-1">
              <Star className="h-3 w-3 fill-amber-500" />
              {rating.toFixed(1)}
              {product.totalReviews > 0 && (
                <span className="text-muted-foreground">
                  ({product.totalReviews})
                </span>
              )}
            </p>
          )}
          {city && (
            <p className="text-xs text-muted-foreground flex items-center gap-1 mb-2">
              <MapPin className="h-3 w-3 shrink-0" />
              {city}
            </p>
          )}
        </Link>
        <label className="flex items-center gap-1 mt-1 z-[2] relative max-w-fit cursor-pointer">
          <input
            type="checkbox"
            checked={isCompared}
            onChange={(e) => toggleCompare(product)}
            className="rounded border-border accent-primary w-4 h-4 cursor-pointer"
          />
          <span className="text-xs text-muted-foreground hover:text-foreground">Compare</span>
        </label>
      </div>

      <div className="flex items-center justify-between gap-2 mt-auto pt-2 border-t border-border/50">
        <span className="text-lg font-bold text-primary">
          ₹{Number(product.price).toLocaleString()}
        </span>
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={product.isSold}
          className={`text-xs font-medium px-3 py-1.5 rounded-lg text-primary-foreground transition shrink-0 flex items-center gap-1 ${product.isSold ? 'bg-muted-foreground cursor-not-allowed' : 'bg-primary hover:opacity-90'}`}
        >
          {product.isSold ? (
            "Sold Out"
          ) : (
            <>
              <ShoppingCart className="h-3 w-3" />
              Add to cart
            </>
          )}
        </button>
      </div>
    </div>
  );
}
