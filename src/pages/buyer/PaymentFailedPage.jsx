import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { XCircle, RefreshCw } from "lucide-react";

export default function PaymentFailedPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center shadow-lg border-red-100">
        <CardHeader>
          <div className="mx-auto bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <XCircle className="w-10 h-10 text-red-600" />
          </div>
          <CardTitle className="text-2xl text-red-700">Payment Failed ❌</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            We couldn't process your payment. But don't worry, your cart is saved! Please try again.
          </p>

          <div className="pt-6 space-y-3">
            <Button className="w-full bg-red-600 hover:bg-red-700 text-white" onClick={() => navigate("/cart")}>
              <RefreshCw className="mr-2 h-4 w-4" /> Retry Payment
            </Button>
            <Button variant="outline" className="w-full" onClick={() => navigate("/browse")}>
              Cancel & Continue Shopping
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
