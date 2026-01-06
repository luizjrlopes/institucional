# Codigo do arquivo hooks/useStorage.ts

```typescript
import { useState, useEffect, useCallback } from "react";
import { getItem, setItem, removeItem } from "@/utils/storage";

export function useStorage<T>(
  key: string,
  initialValue: T,
  storageType: "localStorage" | "cookie" = "localStorage"
): [T, (value: T) => void, () => void] {
  // Estado para armazenar o valor
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = getItem(key, storageType);
      return item !== null ? item : initialValue;
    } catch (error) {
      console.error(`Error reading ${storageType}:`, error);
      return initialValue;
    }
  });

  // Função para atualizar o valor
  const setValue = useCallback(
    (value: T) => {
      try {
        setStoredValue(value);
        setItem(key, value, storageType);
      } catch (error) {
        console.error(`Error setting ${storageType}:`, error);
      }
    },
    [key, storageType]
  );

  // Função para remover o valor
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      removeItem(key, storageType);
    } catch (error) {
      console.error(`Error removing from ${storageType}:`, error);
    }
  }, [key, initialValue, storageType]);

  // Sincronizar com mudanças no storage (útil para múltiplas abas)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch {
          setStoredValue(e.newValue as T);
        }
      }
    };

    if (storageType === "localStorage") {
      window.addEventListener("storage", handleStorageChange);
      return () => window.removeEventListener("storage", handleStorageChange);
    }
  }, [key, storageType]);

  return [storedValue, setValue, removeValue];
}
```
