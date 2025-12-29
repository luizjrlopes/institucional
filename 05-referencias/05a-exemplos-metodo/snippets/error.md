# Codigo do arquivo error.tsx

```typescript
"use client"; // Este é necessário para componentes que usam hooks do React no App Router

import { FallbackProps } from "react-error-boundary";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Error({ error, resetErrorBoundary }: FallbackProps) {
  const router = useRouter();

  useEffect(() => {
    console.error("Captured error:", error);
  }, [error]);

  return (
    <div>
      <h1>Something went wrong</h1>
      <p>{error.message}</p>
      <button onClick={resetErrorBoundary}>Try again</button>
      <button onClick={() => router.push("/")}>Go to Home</button>
    </div>
  );
}
```
