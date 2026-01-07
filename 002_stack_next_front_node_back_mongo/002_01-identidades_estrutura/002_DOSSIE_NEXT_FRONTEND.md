# Dossiê Institucional

## Arquitetura de Frontend — Next.js (App Router) — Stack 002

---

**Versão:** v1.0  
**Stack:** 002_next_front_node_back_mongo  
**Status:** Padrão Institucional (frontend com backend Node.js separado)

---

## 📑 Sumário

1. [Objetivo do Documento](#1-objetivo-do-documento)
2. [Princípios Arquiteturais](#2-princípios-arquiteturais)
3. [Visão Geral da Estrutura](#3-visão-geral-da-estrutura)
4. [Comunicação com Backend](#4-comunicação-com-backend)
5. [Camada de Roteamento e Páginas](#5-camada-de-roteamento-e-páginas)
6. [Componentes Compartilhados (Shared UI)](#6-componentes-compartilhados-shared-ui)
7. [Componentes de Domínio (Feature UI)](#7-componentes-de-domínio-feature-ui)
8. [Hooks](#8-hooks)
9. [Estado Global](#9-estado-global)
10. [Estilos e Design System](#10-estilos-e-design-system)
11. [ApiClient e Serviços](#11-apiclient-e-serviços)
12. [Autenticação](#12-autenticação)
13. [Utilitários](#13-utilitários)
14. [Dados Estáticos](#14-dados-estáticos)
15. [Tipagem Global](#15-tipagem-global)
16. [Fluxo Oficial de Renderização](#16-fluxo-oficial-de-renderização)
17. [Regras Institucionais Obrigatórias](#17-regras-institucionais-obrigatórias)
18. [Conclusão](#18-conclusão)

---

## 1. Objetivo do Documento

Este dossiê define o padrão oficial de arquitetura de frontend para aplicações desenvolvidas em Next.js com App Router, quando o backend é uma **aplicação Node.js/Express separada** (Stack 002).

Define contratos e boas práticas de comunicação entre frontend Next.js e backend Node.js via HTTP/REST.

---

## 2. Princípios Arquiteturais

- Frontend orientado a domínio
- UI desacoplada da implementação do backend
- **Comunicação exclusiva via API REST/HTTP** com contratos tipados
- Segurança: uso de JWT tokens com estratégia de refresh
- Frontend **nunca** acessa banco de dados diretamente
- Separação clara entre Server Components e Client Components

---

## 3. Visão Geral da Estrutura

```plaintext
src/
  app/              # Rotas e layouts (App Router)
  components/       # Shared UI
  features/         # Feature UI por domínio
  lib/
    api.ts          # ApiClient centralizado
  services/         # Camada de comunicação com backend
  styles/           # Theme e estilos globais
  hooks/            # Hooks compartilhados
  store/            # Context API / Estado global
  utils/            # Utilitários
  @types/           # Tipos TypeScript
  data/             # MOCs (durante Fase MOC)
```

---

## 4. Comunicação com Backend

### 4.1 ApiClient Centralizado

**Arquivo:** `src/lib/api.ts`

**Responsabilidade:**

- Centralizar todas as chamadas HTTP ao backend Node.js
- Configurar baseURL do backend (via ENV: `NEXT_PUBLIC_API_URL`)
- Adicionar interceptors para:
  - Incluir JWT token em todos os requests
  - Renovar token automaticamente quando expirado
  - Tratar erros globalmente
  - Logging de requests/responses

**Exemplo:**

```typescript
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api",
  withCredentials: true,
});

// Interceptor para adicionar token
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Tentar renovar token
      await refreshAccessToken();
      // Repetir request original
    }
    return Promise.reject(error);
  }
);

export default api;
```

### 4.2 Services

**Pasta:** `src/services/`

Services encapsulam chamadas específicas ao backend, organizadas por domínio.

**Exemplo:** `src/services/auth.service.ts`

```typescript
import api from "@/lib/api";

export const authService = {
  login: async (email: string, password: string) => {
    const { data } = await api.post("/auth/login", { email, password });
    return data;
  },

  register: async (userData: RegisterDTO) => {
    const { data } = await api.post("/auth/register", userData);
    return data;
  },

  me: async () => {
    const { data } = await api.get("/auth/me");
    return data;
  },
};
```

**Regras:**

- Services **nunca** contêm lógica de negócio
- Services apenas traduzem chamadas HTTP
- Services retornam dados tipados (DTOs)
- Erros são tratados no apiClient, não nos services

---

## 5. Camada de Roteamento e Páginas

**Pasta:** `src/app/`

- Cada rota é uma pasta com `page.tsx`
- `layout.tsx` para layouts compartilhados
- Server Components por padrão
- Client Components com "use client" quando necessário

**Regras:**

- Páginas **não** fazem fetch direto
- Páginas usam services
- Lógica complexa fica em hooks ou componentes

---

## 6. Componentes Compartilhados (Shared UI)

**Pasta:** `src/components/`

Componentes estruturais reutilizáveis:

- Header, Footer, Sidebar
- Modals, Alerts, Toasts
- Loading, Skeleton
- Form inputs, Buttons
- Layout components

**Regras:**

- Sem lógica de domínio
- Sem chamadas HTTP diretas
- Recebem dados via props
- Componentes controlados

---

## 7. Componentes de Domínio (Feature UI)

**Pasta:** `src/features/<dominio>/`

Estrutura por feature:

```plaintext
src/features/users/
  components/
    UserList.tsx
    UserCard.tsx
  hooks/
    useUsers.ts
  types/
    user.types.ts
```

**Regras:**

- Componentes específicos do domínio
- Podem usar services via hooks
- Promover para shared apenas após 2+ usos

---

## 8. Hooks

### Hooks Compartilhados

**Pasta:** `src/hooks/`

Exemplos:

- `useAuth.ts` - Autenticação
- `useLocalStorage.ts` - Persistência local
- `useDebounce.ts` - Debounce

### Hooks de Domínio

**Pasta:** `src/features/<dominio>/hooks/`

Exemplos:

- `useUsers.ts` - Lógica de usuários
- `useProducts.ts` - Lógica de produtos

**Exemplo de hook com service:**

```typescript
import { useState, useEffect } from "react";
import { userService } from "@/services/user.service";

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const data = await userService.getAll();
        setUsers(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  return { users, loading, error };
}
```

---

## 9. Estado Global

**Pasta:** `src/store/`

- Context API para estado global
- Providers em `app/layout.tsx`
- Usar apenas quando realmente global (auth, theme, etc.)

**Exemplo:** `src/store/AuthContext.tsx`

---

## 10. Estilos e Design System

**Pasta:** `src/styles/`

- `theme.ts` - Tokens de design
- `GlobalStyles.ts` - Estilos globais
- Styled Components para componentização

**Regras:**

- Proibido estilo inline
- Proibido Tailwind CSS
- Apenas Styled Components

---

## 11. ApiClient e Serviços

Hierarquia de comunicação:

```text
Component/Hook → Service → ApiClient → Backend Node.js
```

**NUNCA:**

```typescript
// ❌ ERRADO - fetch direto no componente
const response = await fetch("/api/users");
```

**SEMPRE:**

```typescript
// ✅ CORRETO - via service
const users = await userService.getAll();
```

---

## 12. Autenticação

### 12.1 Fluxo JWT

1. Login: backend retorna `accessToken` e `refreshToken`
2. Frontend armazena tokens (localStorage/cookies)
3. ApiClient adiciona token em todas requests
4. Quando token expira (401), fazer refresh automático
5. Renovar `accessToken` via `refreshToken`

### 12.2 Proteção de Rotas

```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken");
  if (!token && isProtectedRoute(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
```

---

## 13. Utilitários

**Pasta:** `src/utils/`

- `formatters.ts` - Formatação de dados
- `validators.ts` - Validações
- `storage.ts` - LocalStorage helpers
- `date.ts` - Manipulação de datas

---

## 14. Dados Estáticos

**Pasta:** `src/data/`

Durante Fase MOC:

- `users.mock.ts`
- `products.mock.ts`

**Importante:** MOCs são a fonte de verdade até Fase 4 (Transição para Produção).

---

## 15. Tipagem Global

**Pasta:** `src/@types/`

DTOs compartilhados com backend:

```typescript
// src/@types/user.d.ts
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface UserCreateDTO {
  email: string;
  name: string;
  password: string;
}
```

---

## 16. Fluxo Oficial de Renderização

1. Request chega ao Next.js
2. Server Component pode chamar backend via service (server-side)
3. Page renderiza e injeta Client Components
4. Client Components usam hooks para ações dinâmicas
5. Hooks chamam services
6. Services chamam apiClient
7. ApiClient faz request HTTP ao backend Node.js

---

## 17. Regras Institucionais Obrigatórias

### ✅ OBRIGATÓRIO

- Usar apiClient centralizado
- Usar services para comunicação com backend
- Tipar todos os DTOs
- Tratar estados loading/erro em componentes
- Interceptors para refresh token
- CORS configurado no backend
- ENV para `NEXT_PUBLIC_API_URL`

### ❌ PROIBIDO

- Fetch direto em componentes
- Acessar banco de dados do frontend
- Lógica de negócio no frontend
- Estilo inline ou Tailwind
- Expor secrets no frontend
- Ignorar erros HTTP

---

## 18. Conclusão

Este dossiê estabelece o padrão de frontend Next.js para Stack 002, onde o backend é uma aplicação Node.js/Express separada. A comunicação é feita exclusivamente via HTTP/REST com contratos tipados, mantendo separação clara de responsabilidades.

---

**Governança Técnica**  
Engenharia de Software — Stack 002 — v1.0

---

© 2026 - Documentação Institucional Oficial
