import { createContext, useContext, useState, useCallback } from "react";

const AuthContext = createContext(null);

const MOCK_USERS = [
  { email: "buyer@test.com", password: "password", name: "John Buyer", role: "buyer" },
  { email: "seller@test.com", password: "password", name: "Jane Seller", role: "seller" },
  { email: "admin@test.com", password: "password", name: "Admin User", role: "admin" },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const isAuthenticated = !!user;

  const login = useCallback((email, password) => {
    const found = MOCK_USERS.find((u) => u.email === email && u.password === password);
    if (found) {
      setUser({ name: found.name, email: found.email, role: found.role });
      return { success: true, role: found.role };
    }
    return { success: false };
  }, []);

  const signup = useCallback((name, email, password, role = "buyer") => {
    setUser({ name, email, role });
    return { success: true, role };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
