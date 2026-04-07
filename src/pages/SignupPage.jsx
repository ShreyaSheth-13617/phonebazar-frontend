import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

export default function SignupPage() {
  const [searchParams] = useSearchParams();
  const defaultRole = searchParams.get("role") === "seller" ? "seller" : "buyer";
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: defaultRole,
  });
  const [busy, setBusy] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      const result = await signup(
        form.name,
        form.email,
        form.password,
        form.role
      );
      if (result?.success) {
        toast({ title: "Account created! Please login." });
        navigate("/login"); // ✅ always go to login
      }
    } catch (err) {
      toast({
        title: "Could not create account",
        description:
          err.response?.data?.message ||
          err.message ||
          "Try a different email.",
        variant: "destructive",
      });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md glass-card p-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          {form.role === "seller" ? "Start Selling" : "Create Account"}
        </h1>
        <p className="text-sm text-muted-foreground mb-6">
          {form.role === "seller"
            ? "Join thousands of sellers on PhoneBazar"
            : "Join PhoneBazar today"}
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Full Name"
            required
            className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <input
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            type="email"
            placeholder="Email"
            required
            className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <input
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            type="password"
            placeholder="Password"
            required
            className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          {form.role !== "seller" && (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setForm({ ...form, role: "buyer" })}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${form.role === "buyer"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary border border-border text-muted-foreground"
                  }`}
              >
                Buyer
              </button>
              <button
                type="button"
                onClick={() => setForm({ ...form, role: "seller" })}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${form.role === "seller"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary border border-border text-muted-foreground"
                  }`}
              >
                Seller
              </button>
            </div>
          )}
          <button
            type="submit"
            disabled={busy}
            className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition disabled:opacity-60"
          >
            {busy ? "Creating…" : "Create Account"}
          </button>
        </form>
        <p className="text-sm text-muted-foreground mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
