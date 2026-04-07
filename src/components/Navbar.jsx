import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useCompare } from "@/context/CompareContext";
import { ShoppingBag, Heart, Package, LogOut, LayoutDashboard, Menu, X, ShoppingCart, GitCompare } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
export default function Navbar() {
    const { isAuthenticated, user, logout } = useAuth();
    const { getCartItemCount } = useCart();
    const { compareList } = useCompare();
    const location = useLocation();
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
    const dropdownRef = useRef(null);
    const isActive = (path) => location.pathname === path;
    useEffect(() => {
        const handler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target))
                setDropdownOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);
    const handleLogout = () => {
        logout();
        setDropdownOpen(false);
        setLogoutDialogOpen(false);
        navigate("/");
    };
    const openLogoutConfirm = () => {
        setLogoutDialogOpen(true);
        setDropdownOpen(false);
        setMobileOpen(false);
    };
    const navLinks = [
        { label: "Browse", path: "/browse" },
        { label: "About", path: "/about" },
        { label: "Contact", path: "/contact" },
    ];
    const getDashboardPath = () => {
        if (!user)
            return "/";
        if (user.role === "seller")
            return "/seller/dashboard";
        if (user.role === "admin")
            return "/admin/dashboard";
        return "/dashboard";
    };
    return (<nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <ShoppingBag className="h-6 w-6 text-primary"/>
            <span className="text-xl font-bold text-foreground">PhoneBazar</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (<Link key={l.path} to={l.path} className={`text-sm font-medium transition-colors ${isActive(l.path) ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>
                {l.label}
              </Link>))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {compareList.length > 0 && (
              <Link to="/compare" className="relative px-3 py-1.5 rounded-lg hover:bg-secondary transition flex items-center gap-2 text-sm font-medium border border-border mr-2">
                <GitCompare className="h-4 w-4 text-primary"/>
                <span className="text-foreground">Compare ({compareList.length}/3)</span>
              </Link>
            )}
            {!isAuthenticated ? (<>
                <Link to="/signup?role=seller" className="text-sm font-medium px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition">
                  Start Selling
                </Link>
                <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition">
                  Login
                </Link>
                <Link to="/signup" className="text-sm font-medium px-4 py-2 rounded-lg border border-border text-foreground hover:bg-secondary transition">
                  Sign Up
                </Link>
              </>) : (<div className="flex items-center gap-3">
                {user.role === "buyer" && (
                  <Link to="/cart" className="relative p-2 rounded-lg hover:bg-secondary transition">
                    <ShoppingCart className="h-5 w-5 text-foreground"/>
                    {getCartItemCount() > 0 && (
                      <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center min-w-[20px]">
                        {getCartItemCount()}
                      </span>
                    )}
                  </Link>
                )}
                <div className="relative" ref={dropdownRef}>
                  <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary transition">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-semibold">
                      {user.name.charAt(0)}
                    </div>
                    <span className="text-sm font-medium text-foreground">{user.name}</span>
                  </button>

                {dropdownOpen && (<div className="absolute right-0 mt-2 w-56 rounded-xl bg-card border border-border shadow-xl py-2 animate-fade-in">
                    <div className="px-4 py-2 border-b border-border">
                      <p className="text-sm font-medium text-foreground">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                      <span className="text-xs text-primary capitalize">{user.role}</span>
                    </div>
                    <Link to={getDashboardPath()} onClick={() => setDropdownOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-secondary transition">
                      <LayoutDashboard className="h-4 w-4"/> Dashboard
                    </Link>
                    {user.role === "buyer" && (<>
                        <Link to="/orders" onClick={() => setDropdownOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-secondary transition">
                          <Package className="h-4 w-4"/> My Orders
                        </Link>
                        <Link to="/wishlist" onClick={() => setDropdownOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-secondary transition">
                          <Heart className="h-4 w-4"/> Saved ads
                        </Link>
                      </>)}
                    <button type="button" onClick={openLogoutConfirm} className="flex items-center gap-2 w-full px-4 py-2 text-sm text-destructive hover:bg-secondary transition">
                      <LogOut className="h-4 w-4"/> Logout
                    </button>
                  </div>)}
                </div>
              </div>)}
          </div>

          <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-6 w-6"/> : <Menu className="h-6 w-6"/>}
          </button>
        </div>
      </div>

      {mobileOpen && (<div className="md:hidden border-t border-border bg-background px-4 py-4 space-y-3 animate-fade-in">
          {navLinks.map((l) => (<Link key={l.path} to={l.path} onClick={() => setMobileOpen(false)} className={`block text-sm font-medium py-2 ${isActive(l.path) ? "text-primary" : "text-muted-foreground"}`}>
              {l.label}
            </Link>))}
          {compareList.length > 0 && (
            <Link to="/compare" onClick={() => setMobileOpen(false)} className="flex items-center justify-between text-sm font-medium py-2 bg-secondary/50 px-3 rounded-lg border border-border text-primary">
              <span className="flex items-center gap-2"><GitCompare className="h-4 w-4"/> Compare Products</span>
              <span>{compareList.length}/3</span>
            </Link>
          )}
          {!isAuthenticated ? (<>
              <Link to="/login" onClick={() => setMobileOpen(false)} className="block text-sm text-foreground py-2">Login</Link>
              <Link to="/signup" onClick={() => setMobileOpen(false)} className="block text-sm text-primary py-2">Sign Up</Link>
            </>) : (<>
              <Link to={getDashboardPath()} onClick={() => setMobileOpen(false)} className="block text-sm text-foreground py-2">Dashboard</Link>
              {user.role === "buyer" && (<>
                  <Link to="/cart" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 text-sm text-foreground py-2">
                    <div className="relative">
                      <ShoppingCart className="h-4 w-4"/>
                      {getCartItemCount() > 0 && (
                        <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {getCartItemCount()}
                        </span>
                      )}
                    </div>
                    Cart ({getCartItemCount()})
                  </Link>
                  <Link to="/orders" onClick={() => setMobileOpen(false)} className="block text-sm text-foreground py-2">My Orders</Link>
                  <Link to="/wishlist" onClick={() => setMobileOpen(false)} className="block text-sm text-foreground py-2">Saved ads</Link>
                </>)}
              <button type="button" onClick={openLogoutConfirm} className="block text-sm text-destructive py-2">Logout</button>
            </>)}
        </div>)}

      <AlertDialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
            <AlertDialogDescription>
              You will need to sign in again to access your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Log out
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </nav>);
}
