import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function PaymentSuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const paymentDetails = location.state?.paymentDetails;

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center shadow-lg border-green-100">
        <CardHeader>
          <div className="mx-auto bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <CardTitle className="text-2xl text-green-700">Payment Successful ✅</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Thank you for your purchase! Your order has been placed successfully.
          </p>
          
          {paymentDetails && (
            <div className="bg-secondary/50 p-4 rounded-lg text-left text-sm space-y-2 mt-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order ID:</span>
                <span className="font-medium">{paymentDetails.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment ID:</span>
                <span className="font-medium">{paymentDetails.paymentId}</span>
              </div>
            </div>
          )}

          <div className="pt-6 space-y-3">
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white" onClick={() => navigate("/orders")}>
              View Orders
            </Button>
            <Button variant="outline" className="w-full" onClick={() => navigate("/browse")}>
              Continue Shopping
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
