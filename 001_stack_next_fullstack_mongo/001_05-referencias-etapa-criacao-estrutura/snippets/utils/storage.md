# Codigo do arquivo utils/storage.ts

```typescript
import Cookies from "js-cookie";

/**
 * Obtém um item do storage (localStorage ou cookie)
 */
export function getItem<T>(
  key: string,
  storageType: "localStorage" | "cookie" = "localStorage"
): T | null {
  try {
    if (typeof window === "undefined") return null;

    let item: string | undefined;

    if (storageType === "localStorage") {
      item = window.localStorage.getItem(key) || undefined;
    } else {
      item = Cookies.get(key);
    }

    if (!item) return null;

    try {
      return JSON.parse(item) as T;
    } catch {
      return item as T;
    }
  } catch (error) {
    console.error(`Error getting item from ${storageType}:`, error);
    return null;
  }
}

/**
 * Define um item no storage (localStorage ou cookie)
 */
export function setItem<T>(
  key: string,
  value: T,
  storageType: "localStorage" | "cookie" = "localStorage",
  options?: Cookies.CookieAttributes
): void {
  try {
    if (typeof window === "undefined") return;

    const valueToStore =
      typeof value === "string" ? value : JSON.stringify(value);

    if (storageType === "localStorage") {
      window.localStorage.setItem(key, valueToStore);
    } else {
      Cookies.set(key, valueToStore, {
        expires: 7, // 7 dias por padrão
        ...options,
      });
    }
  } catch (error) {
    console.error(`Error setting item in ${storageType}:`, error);
  }
}

/**
 * Remove um item do storage (localStorage ou cookie)
 */
export function removeItem(
  key: string,
  storageType: "localStorage" | "cookie" = "localStorage"
): void {
  try {
    if (typeof window === "undefined") return;

    if (storageType === "localStorage") {
      window.localStorage.removeItem(key);
    } else {
      Cookies.remove(key);
    }
  } catch (error) {
    console.error(`Error removing item from ${storageType}:`, error);
  }
}

/**
 * Limpa todo o storage (localStorage ou cookies)
 */
export function clearStorage(
  storageType: "localStorage" | "cookie" = "localStorage"
): void {
  try {
    if (typeof window === "undefined") return;

    if (storageType === "localStorage") {
      window.localStorage.clear();
    } else {
      // Remove todos os cookies
      const cookies = Cookies.get();
      Object.keys(cookies).forEach((key) => {
        Cookies.remove(key);
      });
    }
  } catch (error) {
    console.error(`Error clearing ${storageType}:`, error);
  }
}
```
