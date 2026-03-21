import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(email, password);
    if (result.success) {
      toast({ title: "Welcome back!" });
      if (result.role === "seller") navigate("/seller/dashboard");
      else if (result.role === "admin") navigate("/admin/dashboard");
      else navigate("/");
    } else {
      toast({ title: "Invalid credentials", description: "Try: buyer@test.com / seller@test.com / admin@test.com (password: password)", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md glass-card p-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">Welcome Back</h1>
        <p className="text-sm text-muted-foreground mb-6">Sign in to your PhoneBazar account</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" required
            className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" required
            className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
          <button type="submit" className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition">Sign In</button>
        </form>
        <p className="text-sm text-muted-foreground mt-4 text-center">
          Don't have an account? <Link to="/signup" className="text-primary hover:underline">Sign Up</Link>
        </p>
        <div className="mt-4 p-3 rounded-lg bg-secondary text-xs text-muted-foreground">
          <p className="font-medium text-foreground mb-1">Demo Accounts:</p>
          <p>buyer@test.com / seller@test.com / admin@test.com</p>
          <p>Password: password</p>
        </div>
      </div>
    </div>
  );
}
