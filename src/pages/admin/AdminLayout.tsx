import { Link, useLocation, Outlet } from "react-router-dom";
import { LayoutDashboard, Users, Package, ShoppingCart, BarChart3 } from "lucide-react";

const sidebarItems = [
  { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Users", path: "/admin/users", icon: Users },
  { label: "Listings", path: "/admin/listings", icon: Package },
  { label: "Orders", path: "/admin/orders", icon: ShoppingCart },
  { label: "Analytics", path: "/admin/analytics", icon: BarChart3 },
];

export default function AdminLayout() {
  const location = useLocation();

  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      <aside className="w-60 border-r border-border bg-card shrink-0 hidden md:block">
        <div className="p-4">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Admin Panel</h2>
          <nav className="space-y-1">
            {sidebarItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                  location.pathname === item.path
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
