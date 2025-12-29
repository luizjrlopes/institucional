# Codigo do arquivo hoc/withAuth.tsx

```typescript
"use client";
import React, { useContext, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import StoreContext from "../store/Context";

/**
 * HOC para proteger rotas que requerem autenticação
 */
const withAuth = (WrappedComponent: React.ComponentType) => {
  const ComponentWithAuth = (props: any) => {
    const router = useRouter();
    const storeContext = useContext(StoreContext);

    const memoizedStoreContext = useMemo(() => storeContext, [storeContext]);

    useEffect(() => {
      if (!memoizedStoreContext?.token) {
        router.push("/login");
      }
    }, [memoizedStoreContext, router]);

    if (!memoizedStoreContext?.token) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
};

export default withAuth;

/**
 * HOC para proteger rotas que requerem nível de acesso Admin
 */
export const withAdminAuth = (WrappedComponent: React.ComponentType) => {
  const ComponentWithAdminAuth = (props: any) => {
    const router = useRouter();
    const storeContext = useContext(StoreContext);

    const memoizedStoreContext = useMemo(() => storeContext, [storeContext]);

    useEffect(() => {
      if (
        !memoizedStoreContext?.token ||
        memoizedStoreContext?.accessLevelType !== "admin"
      ) {
        router.push("/");
      }
    }, [memoizedStoreContext, router]);

    if (
      !memoizedStoreContext?.token ||
      memoizedStoreContext?.accessLevelType !== "admin"
    ) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAdminAuth;
};

/**
 * HOC para proteger rotas que requerem nível Admin ou Teacher
 */
export const withRoleAuth = (WrappedComponent: React.ComponentType) => {
  const ComponentWithRoleAuth = (props: any) => {
    const router = useRouter();
    const storeContext = useContext(StoreContext);

    const memoizedStoreContext = useMemo(() => storeContext, [storeContext]);

    useEffect(() => {
      const { token, accessLevelType } = memoizedStoreContext || {};
      if (
        !token ||
        (accessLevelType !== "admin" && accessLevelType !== "teacher")
      ) {
        router.push("/");
      }
    }, [memoizedStoreContext, router]);

    const { token, accessLevelType } = memoizedStoreContext || {};
    if (
      !token ||
      (accessLevelType !== "admin" && accessLevelType !== "teacher")
    ) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithRoleAuth;
};
```
