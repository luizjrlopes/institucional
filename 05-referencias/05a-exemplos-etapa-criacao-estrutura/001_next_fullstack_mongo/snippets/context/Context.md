# Codigo do arquivo store/Context.tsx

```typescript
"use client";
import { createContext } from "react";

// Definir o tipo do contexto
interface StoreContextType {
  token: string | null;
  user: any | null;
  accessLevelType: string | null;
  setToken: (token: string | null) => void;
  setUser: (user: any | null) => void;
  setAccessLevelType: (type: string | null) => void;
  logout: () => void;
}

// Criar o contexto com valor padrão
const StoreContext = createContext<StoreContextType | undefined>(undefined);

export default StoreContext;
export type { StoreContextType };
```
