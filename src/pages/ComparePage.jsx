import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Trash2, ShieldCheck, Check } from "lucide-react";
import { useCompare } from "@/context/CompareContext";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import api from "@/api/axios";

export default function ComparePage() {
  const { compareList, removeCompare } = useCompare();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [reports, setReports] = useState({});

  useEffect(() => {
    const fetchReports = async () => {
      const newReports = {};
      for (const p of compareList) {
        const id = p._id || p.id;
        if (!id) continue;
        try {
          const { data } = await api.get(`/testing/${id}`);
          if (data && data.data) {
            newReports[id] = data.data;
          }
        } catch (e) {
          // No report or error
        }
      }
      setReports(newReports);
    };

    if (compareList.length > 0) {
      fetchReports();
    }
  }, [compareList]);

  const handleAddToCart = async (product) => {
    try {
      if (product.isSold) return;
      await addToCart(product);
      toast({ title: "Added to cart", description: product.name });
    } catch (e) {
      toast({ title: "Error", description: "Failed to add to cart" });
    }
  };

  if (compareList.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4 text-foreground">Compare Phones</h1>
        <p className="text-muted-foreground mb-8">You haven't selected any phones to compare.</p>
        <Button asChild>
          <Link to="/browse">Browse Phones</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Link
        to="/browse"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6 transition"
      >
        <ChevronLeft className="h-4 w-4" /> Back to browse
      </Link>
      
      <h1 className="text-3xl font-bold text-foreground mb-8">Compare Phones</h1>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr>
              <th className="p-4 w-48 border-b-2 border-border font-medium text-muted-foreground">Feature</th>
              {compareList.map((p) => (
                <th key={p._id || p.id} className="p-4 border-b-2 border-border text-center relative w-64">
                  <button 
                    onClick={() => removeCompare(p._id || p.id)}
                    className="absolute top-4 right-4 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 bg-secondary rounded-lg overflow-hidden mb-3">
                      {(p.images?.length > 0 || p.image) ? (
                        <img src={p.images?.[0] || p.image} alt={p.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-4xl">📱</div>
                      )}
                    </div>
                    <span className="font-semibold text-foreground line-clamp-1">{p.name}</span>
                    <span className="text-primary font-bold mt-1">₹{Number(p.price).toLocaleString()}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-sm">
            <tr>
              <td className="p-4 text-muted-foreground font-medium bg-secondary/30">Action</td>
              {compareList.map((p) => (
                <td key={p._id || p.id} className="p-4 text-center bg-card">
                  <Button 
                    className="w-full" 
                    onClick={() => handleAddToCart(p)}
                    disabled={p.isSold}
                  >
                    {p.isSold ? "Sold Out" : "Buy Now"}
                  </Button>
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 text-muted-foreground font-medium bg-secondary/30">Condition</td>
              {compareList.map((p) => (
                <td key={p._id || p.id} className="p-4 text-center text-foreground font-medium bg-card">
                  {p.condition}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 text-muted-foreground font-medium bg-secondary/30">Storage</td>
              {compareList.map((p) => (
                <td key={p._id || p.id} className="p-4 text-center text-foreground bg-card">
                  {p.storage || "—"}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 text-muted-foreground font-medium bg-secondary/30">Battery Health</td>
              {compareList.map((p) => (
                <td key={p._id || p.id} className="p-4 text-center text-foreground bg-card">
                  {reports[p._id || p.id]?.batteryHealth || p.batteryHealth ? `${reports[p._id || p.id]?.batteryHealth || p.batteryHealth}%` : "—"}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 text-muted-foreground font-medium bg-secondary/30">Seller Verification</td>
              {compareList.map((p) => (
                <td key={p._id || p.id} className="p-4 text-center bg-card">
                  {p.verified ? (
                    <span className="inline-flex items-center text-primary gap-1 font-medium"><ShieldCheck className="w-4 h-4"/> Yes</span>
                  ) : "No"}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 text-muted-foreground font-medium bg-secondary/30 pt-8 border-t-2 border-border">Testing Score</td>
              {compareList.map((p) => (
                <td key={p._id || p.id} className="p-4 text-center pt-8 border-t-2 border-border font-bold text-foreground bg-card">
                  {reports[p._id || p.id]?.overallScore ? `${reports[p._id || p.id].overallScore}/100` : "No Report"}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 text-muted-foreground font-medium bg-secondary/30">Screen / Camera</td>
              {compareList.map((p) => {
                const r = reports[p._id || p.id];
                return (
                  <td key={p._id || p.id} className="p-4 text-center text-foreground bg-card">
                    {r ? (
                      <span className="text-xs">{r.screenCondition} / {r.cameraStatus}</span>
                    ) : "—"}
                  </td>
                );
              })}
            </tr>
            <tr>
              <td className="p-4 text-muted-foreground font-medium bg-secondary/30 pb-8">Device Certified?</td>
              {compareList.map((p) => (
                <td key={p._id || p.id} className="p-4 text-center pb-8 bg-card">
                  {reports[p._id || p.id]?.certification ? (
                    <span className="inline-flex items-center gap-1 font-bold text-green-600 bg-green-100 px-2 py-1 rounded"><Check className="w-4 h-4"/> Certified</span>
                  ) : "—"}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
