import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { useAuth } from "@/context/AuthContext";
import api from "@/api/axios";

const CartContext = createContext(null);

function normalizeLineItem(item) {
  const phone = item.phoneId;
  if (!phone || typeof phone !== "object") return null;
  const img = phone.images?.[0] || "";
  return {
    id: String(phone._id),
    phoneId: String(phone._id),
    name: phone.name,
    price: phone.price,
    condition: phone.condition,
    image: img,
    quantity: item.quantity,
  };
}

export function CartProvider({ children }) {
  const { user, isAuthenticated } = useAuth();
  const [cartItems, setCartItems] = useState([]);

  const syncCart = useCallback(async () => {
    if (!isAuthenticated || !user) {
      setCartItems([]);
      return;
    }
    try {
      const { data } = await api.get("/cart");
      const raw = data.data?.items || [];
      setCartItems(
        raw.map(normalizeLineItem).filter(Boolean)
      );
    } catch {
      setCartItems([]);
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    syncCart();
  }, [syncCart]);

  const addToCart = useCallback(
    async (product) => {
      const phoneId = product._id || product.id;
      if (!phoneId) return;
      await api.post("/cart/add", {
        phoneId: String(phoneId),
        quantity: 1,
      });
      await syncCart();
    },
    [syncCart]
  );

  const removeFromCart = useCallback(
    async (productId) => {
      await api.delete(`/cart/remove/${productId}`);
      await syncCart();
    },
    [syncCart]
  );

  const updateQuantity = useCallback(
    async (productId, quantity) => {
      if (quantity <= 0) {
        await removeFromCart(productId);
        return;
      }
      await api.patch(`/cart/item/${productId}`, { quantity });
      await syncCart();
    },
    [syncCart, removeFromCart]
  );

  const clearCart = useCallback(async (checkout = false) => {
    await api.post(`/cart/clear${checkout ? "?checkout=true" : ""}`);
    await syncCart();
  }, [syncCart]);

  const getCartTotal = useCallback(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [cartItems]);

  const getCartItemCount = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount,
    refreshCart: syncCart,
  };

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
