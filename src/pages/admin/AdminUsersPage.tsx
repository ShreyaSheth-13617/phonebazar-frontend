import { Ban, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const users = [
  { id: 1, name: "Rahul Sharma", email: "rahul@test.com", role: "Buyer", status: "Active", joined: "Jan 2026" },
  { id: 2, name: "Priya Mehra", email: "priya@test.com", role: "Seller", status: "Active", joined: "Feb 2026" },
  { id: 3, name: "Amit Kumar", email: "amit@test.com", role: "Buyer", status: "Blocked", joined: "Dec 2025" },
  { id: 4, name: "Sneha Roy", email: "sneha@test.com", role: "Seller", status: "Active", joined: "Mar 2026" },
  { id: 5, name: "Vikash Patel", email: "vikash@test.com", role: "Buyer", status: "Active", joined: "Mar 2026" },
];

export default function AdminUsersPage() {
  const { toast } = useToast();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-foreground mb-1">Manage Users</h1>
      <p className="text-muted-foreground mb-8">{users.length} registered users</p>
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="text-left text-muted-foreground border-b border-border">
              <th className="px-5 py-3">User</th><th className="px-5 py-3">Role</th><th className="px-5 py-3">Status</th><th className="px-5 py-3">Joined</th><th className="px-5 py-3">Actions</th>
            </tr></thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-border last:border-0">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">{u.name.charAt(0)}</div>
                      <div>
                        <p className="text-foreground font-medium">{u.name}</p>
                        <p className="text-xs text-muted-foreground">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3"><span className="text-xs px-2 py-1 rounded-md bg-secondary text-muted-foreground">{u.role}</span></td>
                  <td className="px-5 py-3"><span className={`text-xs font-medium ${u.status === "Active" ? "text-green-400" : "text-destructive"}`}>{u.status}</span></td>
                  <td className="px-5 py-3 text-muted-foreground">{u.joined}</td>
                  <td className="px-5 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => toast({ title: `${u.name} ${u.status === "Active" ? "blocked" : "unblocked"}` })}
                        className="p-1.5 rounded-md hover:bg-secondary transition text-muted-foreground hover:text-primary"><Ban className="h-4 w-4" /></button>
                      <button onClick={() => toast({ title: `${u.name} deleted`, variant: "destructive" })}
                        className="p-1.5 rounded-md hover:bg-destructive/10 transition text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
