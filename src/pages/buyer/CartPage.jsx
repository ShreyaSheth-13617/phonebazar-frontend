import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Trash2, Plus, Minus, ShoppingCart, CreditCard, Truck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import api from "@/api/axios";

const loadRazorpayScript = () => {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
  } = useCart();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [shippingInfo, setShippingInfo] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const [deliveryType, setDeliveryType] = useState("Normal");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await updateQuantity(productId, newQuantity);
    } catch (e) {
      toast({
        title: "Update failed",
        description: e.response?.data?.message || e.message,
        variant: "destructive",
      });
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      await removeFromCart(productId);
      toast({
        title: "Item removed",
        description: "Item has been removed from your cart.",
      });
    } catch (e) {
      toast({
        title: "Could not remove",
        description: e.response?.data?.message || e.message,
        variant: "destructive",
      });
    }
  };

  const handleShippingInfoChange = (field, value) => {
    setShippingInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Please login",
        description: "You need to login to place an order.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    const requiredFields = ["name", "email", "phone", "address", "city", "pincode"];
    const missingFields = requiredFields.filter((field) => !shippingInfo[field].trim());

    if (missingFields.length > 0) {
      toast({
        title: "Missing information",
        description: `Please fill in: ${missingFields.join(", ")}`,
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      const subtotal = getCartTotal();
      const baseShipping = subtotal > 500 ? 0 : 50;
      const extraShipping = deliveryType === "Insured" ? 500 : 0;
      const totalAmount = subtotal + baseShipping + extraShipping;

      if (paymentMethod === "online") {
        const res = await loadRazorpayScript();
        if (!res) {
          toast({ title: "Failed to load Razorpay SDK", variant: "destructive" });
          setIsProcessing(false);
          return;
        }

        const { data: orderData } = await api.post("/payments/create-order", { amount: totalAmount });

        const options = {
          key: "rzp_test_SZsPTCAMtVJDU1", // Test key
          amount: orderData.order.amount,
          currency: "INR",
          name: "PhoneBazar",
          description: "Purchase Transaction",
          order_id: orderData.order.id,
          handler: async function (response) {
            try {
              const serializedItems = cartItems.map(item => ({
                phoneId: item.phoneId,
                price: item.price,
                quantity: item.quantity
              }));

              const verifyData = {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                cartItems: serializedItems,
                shippingInfo,
                deliveryType
              };

              const result = await api.post("/payments/verify-payment", verifyData);
              if (result.data.success) {
                await clearCart();
                toast({
                  title: "Payment Successful \u2705",
                  description: "Your order has been placed successfully.",
                });
                navigate("/orders");
              }
            } catch (err) {
              toast({ title: "Payment verification failed", variant: "destructive" });
              setIsProcessing(false);
            }
          },
          prefill: {
            name: shippingInfo.name,
            email: shippingInfo.email,
            contact: shippingInfo.phone
          },
          theme: {
            color: "#eab308" // Theme yellow
          },
          modal: {
            ondismiss: function() {
               toast({ title: "Payment Cancelled \u274c", description: "You closed the payment window. Try again.", variant: "destructive" });
               setIsProcessing(false);
            }
          }
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();

      } else {
        // COD LOGIC
        const shipping = baseShipping + extraShipping;
        let first = true;
        for (const item of cartItems) {
          const lineTotal = item.price * item.quantity;
          const shipPart = first ? shipping : 0;
          first = false;
          await api.post("/orders", {
            phoneId: item.phoneId,
            quantity: item.quantity,
            orderDate: new Date().toISOString(),
            orderStatus: "Processing",
            shippingInfo,
            paymentMethod,
            deliveryType,
            returnEligible: deliveryType === "Insured",
            totalAmount: lineTotal + shipPart,
          });
        }
        await clearCart();
        toast({
          title: "Order placed successfully!",
          description: "You can track orders under My orders.",
        });
        navigate("/orders");
      }
    } catch (e) {
      toast({
        title: "Checkout failed",
        description: e.response?.data?.message || e.message || "Try again.",
        variant: "destructive",
      });
      setIsProcessing(false);
    } finally {
      if (paymentMethod !== "online") {
        setIsProcessing(false);
      }
    }
  };

  const subtotal = getCartTotal();
  const baseShipping = subtotal > 500 ? 0 : 50;
  const shipping = baseShipping + (deliveryType === "Insured" ? 500 : 0);
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="text-center">
          <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">Add some products to get started!</p>
          <Button onClick={() => navigate("/browse")}>Browse Products</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-foreground mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Cart Items ({cartItems.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.phoneId} className="flex gap-4 p-4 border rounded-lg">
                  <div className="w-20 h-20 rounded-lg bg-secondary flex items-center justify-center overflow-hidden">
                    {typeof item.image === "string" && item.image.startsWith("http") ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-2xl">{item.image || "📱"}</span>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.condition}</p>
                    <p className="text-lg font-bold text-primary mt-1">₹{item.price.toLocaleString()}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuantityChange(item.phoneId, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuantityChange(item.phoneId, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold">₹{(item.price * item.quantity).toLocaleString()}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveItem(item.phoneId)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span>Subtotal ({cartItems.length} items)</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Shipping Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={shippingInfo.name}
                    onChange={(e) => handleShippingInfoChange("name", e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={shippingInfo.email}
                    onChange={(e) => handleShippingInfoChange("email", e.target.value)}
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={shippingInfo.phone}
                  onChange={(e) => handleShippingInfoChange("phone", e.target.value)}
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={shippingInfo.address}
                  onChange={(e) => handleShippingInfoChange("address", e.target.value)}
                  placeholder="Enter your full address"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={shippingInfo.city}
                    onChange={(e) => handleShippingInfoChange("city", e.target.value)}
                    placeholder="Enter your city"
                  />
                </div>
                <div>
                  <Label htmlFor="pincode">Pincode</Label>
                  <Input
                    id="pincode"
                    value={shippingInfo.pincode}
                    onChange={(e) => handleShippingInfoChange("pincode", e.target.value)}
                    placeholder="Enter pincode"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Delivery Options
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <label className={`flex items-start gap-3 p-3 border rounded-xl cursor-pointer transition ${deliveryType === "Normal" ? "border-primary bg-primary/5" : "border-border"}`}>
                  <input type="radio" className="mt-1 accent-primary" name="delivery" checked={deliveryType === "Normal"} onChange={() => setDeliveryType("Normal")} />
                  <div>
                    <h4 className="font-semibold">Normal Delivery (Standard)</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">Standard shipping times. No returns accepted upon peer-to-peer condition agreement.</p>
                  </div>
                </label>
                <label className={`flex items-start gap-3 p-3 border rounded-xl cursor-pointer transition ${deliveryType === "Insured" ? "border-primary bg-primary/5" : "border-border"}`}>
                  <input type="radio" className="mt-1 accent-primary" name="delivery" checked={deliveryType === "Insured"} onChange={() => setDeliveryType("Insured")} />
                  <div>
                    <h4 className="font-semibold text-primary">Insured Delivery (+₹500)</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">Eligibility for 3-day returns/refund if the device doesn't match the seller's condition.</p>
                  </div>
                </label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span>Cash on Delivery</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="online"
                    checked={paymentMethod === "online"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span>Online Payment (Razorpay)</span>
                </label>
              </div>
            </CardContent>
          </Card>

          <Button onClick={handleCheckout} disabled={isProcessing} className="w-full" size="lg">
            {isProcessing ? "Processing..." : `Place Order - ₹${total.toLocaleString()}`}
          </Button>
        </div>
      </div>
    </div>
  );
}
