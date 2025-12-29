# Codigo do arquivo store/Provider.tsx

```typescript
"use client";
import React, { useState, useEffect, ReactNode } from "react";
import StoreContext from "./Context";
import { useRouter } from "next/navigation";

interface ProviderProps {
  children: ReactNode;
}

const StoreProvider: React.FC<ProviderProps> = ({ children }) => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [accessLevelType, setAccessLevelType] = useState<string | null>(null);

  // Carregar dados do localStorage ao montar
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    const storedAccessLevel = localStorage.getItem("accessLevelType");

    if (storedToken) setToken(storedToken);
    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedAccessLevel) setAccessLevelType(storedAccessLevel);
  }, []);

  // Sincronizar token com localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  // Sincronizar user com localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // Sincronizar accessLevelType com localStorage
  useEffect(() => {
    if (accessLevelType) {
      localStorage.setItem("accessLevelType", accessLevelType);
    } else {
      localStorage.removeItem("accessLevelType");
    }
  }, [accessLevelType]);

  const logout = () => {
    setToken(null);
    setUser(null);
    setAccessLevelType(null);
    localStorage.clear();
    router.push("/login");
  };

  return (
    <StoreContext.Provider
      value={{
        token,
        user,
        accessLevelType,
        setToken,
        setUser,
        setAccessLevelType,
        logout,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
```
