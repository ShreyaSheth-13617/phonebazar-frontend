import { useEffect, useState } from "react";
import { Ban, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import api from "@/api/axios";

export default function AdminUsersPage() {
    const { toast } = useToast();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const { data } = await api.get("/users");
                setUsers(data.data || []);
            } catch (error) {
                toast({
                    title: "Failed to load users",
                    description: error.response?.data?.message || "Check network connection",
                    variant: "destructive"
                });
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, [toast]);

    if (loading) return <div className="p-6 text-muted-foreground">Loading users...</div>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-foreground mb-1">Manage Users</h1>
            <p className="text-muted-foreground mb-8">{users.length} registered users</p>
            <div className="glass-card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-left text-muted-foreground border-b border-border">
                                <th className="px-5 py-3">User</th>
                                <th className="px-5 py-3">Role</th>
                                <th className="px-5 py-3">Status</th>
                                <th className="px-5 py-3">Joined</th>
                                <th className="px-5 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((u) => (
                                <tr key={u._id} className="border-b border-border last:border-0 hover:bg-secondary/20 transition">
                                    <td className="px-5 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold shadow-sm">
                                                {(u.name || "U").charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="text-foreground font-medium">{u.name}</p>
                                                <p className="text-xs text-muted-foreground">{u.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3">
                                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-md bg-secondary text-muted-foreground">
                                            {u.role}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3">
                                        <span className={`text-xs font-medium px-2 py-1 rounded-md ${u.isBlocked ? "bg-destructive/10 text-destructive" : "bg-green-500/10 text-green-500"}`}>
                                            {u.isBlocked ? "Blocked" : "Active"}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3 text-muted-foreground">
                                        {new Date(u.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-5 py-3">
                                        <div className="flex gap-2">
                                            <button 
                                                onClick={() => toast({ title: "Action not permitted in demo." })} 
                                                className="p-1.5 rounded-md hover:bg-secondary transition text-muted-foreground hover:text-primary"
                                                title="Block/Unblock User"
                                            >
                                                <Ban className="h-4 w-4"/>
                                            </button>
                                            <button 
                                                onClick={() => toast({ title: "Action not permitted in demo.", variant: "destructive" })} 
                                                className="p-1.5 rounded-md hover:bg-destructive/10 transition text-muted-foreground hover:text-destructive"
                                                title="Delete User"
                                            >
                                                <Trash2 className="h-4 w-4"/>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {users.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-5 py-6 text-center text-muted-foreground italic">
                                        No users found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
