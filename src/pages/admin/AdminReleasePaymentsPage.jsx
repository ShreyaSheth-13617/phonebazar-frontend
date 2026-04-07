import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import api from "@/api/axios";

export default function AdminReleasePaymentsPage() {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        fetchPayments();
    }, []);

    const fetchPayments = async () => {
        try {
            const res = await api.get("/payments");
            // Only keep 'online' or specifically 'Razorpay' ones, and sort newest first
            const data = (res.data?.data || []).sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
            setPayments(data);
        } catch (error) {
            console.error("Error fetching payments", error);
            toast({ title: "Failed to fetch payments", variant: "destructive" });
        } finally {
            setLoading(false);
        }
    };

    const handleRelease = async (paymentId) => {
        try {
            await api.put(`/payments/${paymentId}/release`);
            toast({ title: "Funds Released \u2705" });
            fetchPayments();
        } catch (err) {
            toast({ title: "Failed to release funds", variant: "destructive" });
        }
    };

    if (loading) return <div className="p-8 text-center text-muted-foreground">Loading payments...</div>;

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Escrow Hub</h1>
                    <p className="text-muted-foreground mt-1">Manage and release seller funds manually.</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm border-collapse">
                            <thead>
                                <tr className="border-b text-muted-foreground">
                                    <th className="py-3 px-4 font-medium">Payment ID</th>
                                    <th className="py-3 px-4 font-medium">Order DB ID</th>
                                    <th className="py-3 px-4 font-medium">Amount</th>
                                    <th className="py-3 px-4 font-medium">Status</th>
                                    <th className="py-3 px-4 font-medium text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {payments.map((payment) => (
                                    <tr key={payment._id} className="hover:bg-muted/50 transition-colors">
                                        <td className="py-3 px-4">...{payment._id.slice(-6)}</td>
                                        <td className="py-3 px-4">
                                            {payment.orderId ? `...${payment.orderId._id?.slice(-6) || payment.orderId.slice(-6)}` : "N/A"}
                                        </td>
                                        <td className="py-3 px-4 font-semibold text-primary">₹{(payment.amount || 0).toLocaleString()}</td>
                                        <td className="py-3 px-4">
                                            {payment.paymentStatus === "Released" ? (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-500">
                                                    <CheckCircle className="h-3.5 w-3.5" />
                                                    Released
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-500">
                                                    <Clock className="h-3.5 w-3.5" />
                                                    {payment.paymentStatus}
                                                </span>
                                            )}
                                        </td>
                                        <td className="py-3 px-4 text-right">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                disabled={payment.paymentStatus === "Released"}
                                                onClick={() => handleRelease(payment._id)}
                                                className={payment.paymentStatus === "Released" ? "opacity-50" : "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"}
                                            >
                                                {payment.paymentStatus === "Released" ? "Released" : "Release Funds"}
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                {payments.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="py-10 text-center text-muted-foreground">
                                            No payment records found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
