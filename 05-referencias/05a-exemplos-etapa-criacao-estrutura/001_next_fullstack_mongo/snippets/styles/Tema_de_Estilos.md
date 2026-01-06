# Tema de Estilos

## Configuração de Tema

```typescript
export const theme = {
  colors: {
    background: "#f3f4f6",
    white: "#ffffff",
    text: "#1f2937",
    textLight: "#6b7280",
    azure: {
      primary: "#0078d4",
      secondary: "#005a9e",
      light: "#eff6ff",
      border: "#bfdbfe",
    },
    aws: {
      primary: "#ff9900",
      secondary: "#ff6600",
      light: "#fff7ed",
      border: "#fed7aa",
    },
    success: "#22c55e",
    gray: {
      100: "#f3f4f6",
      200: "#e5e7eb",
      300: "#d1d5db",
      400: "#9ca3af",
    },
  },
  shadows: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  },
  borderRadius: {
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "16px",
  },
};

export type ThemeType = typeof theme;
```
