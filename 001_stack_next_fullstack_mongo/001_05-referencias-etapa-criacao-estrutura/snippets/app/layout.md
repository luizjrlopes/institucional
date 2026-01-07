# Codigo do arquivo app/layout.tsx

```typescript
import type { Metadata } from "next";
import StyledComponentsRegistry from "@/lib/registry";
import StoreProvider from "@/store/Provider";
import GlobalStyles from "@/styles/GlobalStyles";

export const metadata: Metadata = {
  title: "Nome da Aplicação",
  description: "Descrição da aplicação",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <StyledComponentsRegistry>
          <StoreProvider>
            <GlobalStyles />
            {children}
          </StoreProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
```
