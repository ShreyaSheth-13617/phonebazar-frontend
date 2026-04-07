import { createContext, useContext, useState } from "react";
import { useToast } from "@/hooks/use-toast";

const CompareContext = createContext();

export const CompareProvider = ({ children }) => {
  const [compareList, setCompareList] = useState([]);
  const { toast } = useToast();

  const toggleCompare = (product) => {
    setCompareList((prev) => {
      const exists = prev.find((p) => p._id === product._id || p.id === product.id);
      if (exists) {
        return prev.filter((p) => (p._id || p.id) !== (product._id || product.id));
      }
      
      if (prev.length >= 3) {
        toast({
          title: "Compare limit reached",
          description: "You can only compare up to 3 models at a time.",
          variant: "destructive"
        });
        return prev;
      }
      
      toast({
        title: "Added to compare",
        description: `${product.name} added. ${prev.length + 1}/3 slots used.`
      });
      return [...prev, product];
    });
  };

  const removeCompare = (productId) => {
    setCompareList((prev) => prev.filter((p) => (p._id || p.id) !== productId));
  };

  const isComparing = (productId) => {
    return compareList.some((p) => (p._id || p.id) === productId);
  };

  return (
    <CompareContext.Provider value={{ compareList, toggleCompare, removeCompare, isComparing }}>
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => useContext(CompareContext);
