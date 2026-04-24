import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore auth on refresh
  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      const parsed = JSON.parse(storedAuth);
      setUser(parsed);
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${parsed.token}`;
    }
    setLoading(false);
  }, []);

  const login = (data) => {
    const authData = {
      name:data.name,
      email: data.email,
      role: data.role,
      token: data.token,
    };

    localStorage.setItem("auth", JSON.stringify(authData));
    api.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${data.token}`;
    setUser(authData);
  };

  const logout = () => {
    localStorage.removeItem("auth");
    delete api.defaults.headers.common["Authorization"];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
