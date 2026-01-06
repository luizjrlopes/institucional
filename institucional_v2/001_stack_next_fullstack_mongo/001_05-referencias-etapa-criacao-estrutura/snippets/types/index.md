# Codigo do arquivo @types/index.ts

```typescript
// Tipos globais da aplicação

export interface User {
  id: string;
  name: string;
  email: string;
  accessLevelType: "admin" | "teacher" | "student";
  createdAt: string;
  updatedAt: string;
}

export interface Session {
  token: string;
  user: User;
  expiresAt: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Tipos para formulários
export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ResetPasswordFormData {
  email: string;
}

export interface NewPasswordFormData {
  token: string;
  password: string;
  confirmPassword: string;
}

// Tipos para tema (styled-components)
import { theme } from "@/styles/theme";

export type Theme = typeof theme;

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
```
