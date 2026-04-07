import { createContext, useContext, useState, useCallback, useEffect } from "react";
import api, { TOKEN_KEY } from "@/api/axios";

const AuthContext = createContext(null);
const USER_KEY = "phonebazar_user";

export function normalizeRole(role) {
  if (!role) return "buyer";
  const r = String(role).toLowerCase();
  if (r === "seller") return "seller";
  if (r === "admin") return "admin";
  if (r === "retailer") return "retailer";
  return "buyer";
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(USER_KEY);
      const token = localStorage.getItem(TOKEN_KEY);
      if (raw && token) {
        const u = JSON.parse(raw);
        setUser({
          _id: u._id,
          name: u.name,
          email: u.email,
          role: normalizeRole(u.role),
        });
      }
    } catch {
      localStorage.removeItem(USER_KEY);
      localStorage.removeItem(TOKEN_KEY);
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    const token = data.token;
    const u = data.data;
    const role = normalizeRole(data.role || u.role);
    const payload = {
      _id: u._id,
      name: u.name,
      email: u.email,
      role,
    };
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(payload));
    setUser(payload);
    return { success: true, role };
  }, []);

  const register = useCallback(async (name, email, password, role = "buyer") => {
    const apiRole = role === "seller" ? "Seller" : "Buyer";
    await api.post("/auth/register", { name, email, password, role: apiRole });
    // return login(email, password);
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
  }, []);

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        logout,
        register,
        signup: register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
