// AuthContext.example.tsx
// Provider de autenticação

"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { apiClient } from "@/services/apiClient";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    try {
      const token = localStorage.getItem("@app:token");
      if (!token) {
        setIsLoading(false);
        return;
      }

      apiClient.setToken(token);
      const response = await apiClient.get<{ user: User }>("/auth/me");
      setUser(response.user);
    } catch (error) {
      localStorage.removeItem("@app:token");
      apiClient.setToken(null);
    } finally {
      setIsLoading(false);
    }
  }

  async function login(email: string, password: string) {
    const response = await apiClient.post<{ token: string; user: User }>(
      "/auth/login",
      {
        email,
        password,
      }
    );

    localStorage.setItem("@app:token", response.token);
    apiClient.setToken(response.token);
    setUser(response.user);
  }

  async function logout() {
    await apiClient.post("/auth/logout", {});
    localStorage.removeItem("@app:token");
    apiClient.setToken(null);
    setUser(null);
  }

  async function refreshUser() {
    await loadUser();
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
