# Dossiê Institucional

## Arquitetura de Frontend — Next.js (App Router) — Stack 003

---

**Versão:** v1.1  
**Stack:** 003_next_front_python_back_mongo  
**Status:** Padrão Institucional (frontend com backend Python/FastAPI separado)

---

## 📑 Diferenças para Stack 002

Este dossiê herda a maior parte do conteúdo do **002_DOSSIE_NEXT_FRONTEND.md**, com as seguintes **diferenças específicas**:

---

## 1. Backend de Destino

- Backend: **Python/FastAPI** (não Node.js)
- Documentação automática: **OpenAPI/Swagger** em `/docs`
- Contratos: **Pydantic Schemas**

---

## 2. ApiClient

### 2.1 URL do Backend

```typescript
// src/lib/api.ts
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
  // FastAPI geralmente roda na porta 8000
});
```

### 2.2 Documentação OpenAPI

O frontend pode consultar `/docs` do backend para ver todos os endpoints disponíveis.

```typescript
// Exemplo: acessar schema OpenAPI
const schemaUrl = `${process.env.NEXT_PUBLIC_API_URL}/openapi.json`;
```

---

## 3. Services

Services fazem chamadas ao backend Python/FastAPI:

```typescript
// src/services/auth.service.ts
import api from "@/lib/api";

export const authService = {
  login: async (email: string, password: string) => {
    // POST /api/auth/login (FastAPI endpoint)
    const { data } = await api.post("/auth/login", { email, password });
    return data;
  },

  register: async (userData: RegisterDTO) => {
    // POST /api/auth/register (FastAPI endpoint)
    const { data } = await api.post("/auth/register", userData);
    return data;
  },
};
```

---

## 4. DTOs e Tipagem

### 4.1 Schemas Pydantic no Backend

O backend Python usa Pydantic para validação:

```python
# backend: app/schemas/user.py
class UserCreate(BaseModel):
    email: EmailStr
    name: str
    password: str

class UserResponse(BaseModel):
    id: str
    email: str
    name: str
    created_at: datetime
```

### 4.2 Tipos TypeScript no Frontend

Frontend cria tipos equivalentes:

```typescript
// src/@types/user.d.ts
export interface UserCreateDTO {
  email: string;
  name: string;
  password: string;
}

export interface UserResponse {
  id: string;
  email: string;
  name: string;
  created_at: string; // ISO string
}
```

**Importante:** Manter sincronização manual entre Pydantic schemas e TypeScript types.

---

## 5. Respostas do Backend

### 5.1 Formato de Resposta FastAPI

FastAPI retorna JSON diretamente:

```json
{
  "id": "123",
  "email": "user@example.com",
  "name": "User Name"
}
```

Ou com wrapper (se padronizado):

```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

### 5.2 Tratamento no Frontend

```typescript
// src/services/user.service.ts
export const userService = {
  getAll: async () => {
    const { data } = await api.get("/users");
    // FastAPI pode retornar array diretamente ou com wrapper
    return data.data || data; // adaptar conforme padrão
  },
};
```

---

## 6. Autenticação

### 6.1 JWT com FastAPI

FastAPI usa JWT similar ao Node.js:

```python
# backend: POST /auth/login retorna:
{
  "access_token": "eyJ...",
  "refresh_token": "eyJ...",
  "token_type": "bearer"
}
```

### 6.2 Frontend

```typescript
// src/lib/api.ts
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

---

## 7. Validação

### Backend: Validação Automática (Pydantic)

FastAPI valida automaticamente via Pydantic schemas.

### Frontend: Validação Opcional

Frontend pode validar no cliente para UX:

```typescript
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
```

---

## 8. Tratamento de Erros

### 8.1 Erros FastAPI

FastAPI retorna erros HTTP com formato:

```json
{
  "detail": "Error message"
}
```

Ou validação Pydantic:

```json
{
  "detail": [
    {
      "loc": ["body", "email"],
      "msg": "value is not a valid email address",
      "type": "value_error.email"
    }
  ]
}
```

### 8.2 Tratamento no Frontend

```typescript
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.data?.detail) {
      // FastAPI error format
      const errorMsg = Array.isArray(error.response.data.detail)
        ? error.response.data.detail[0].msg
        : error.response.data.detail;

      AlertService.error(errorMsg);
    }
    return Promise.reject(error);
  }
);
```

---

## 9. CORS

Backend Python/FastAPI deve configurar CORS:

```python
# backend: main.py
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## 10. Regras Específicas Stack 003

### ✅ OBRIGATÓRIO

- Consultar `/docs` (Swagger) do backend para ver endpoints
- Sincronizar tipos TypeScript com Pydantic schemas
- Adaptar tratamento de erros ao formato FastAPI
- Usar `Bearer` token para autenticação
- Tratar erros de validação Pydantic

### ❌ PROIBIDO

- Assumir formato de resposta sem verificar backend
- Ignorar erros de validação do Pydantic
- Dessincronia entre tipos TS e Pydantic

---

## 11. Estrutura Completa

```plaintext
src/
  app/              # Rotas Next.js
  components/       # Shared UI
  features/         # Feature UI
  lib/
    api.ts          # ApiClient → Backend Python
  services/         # Chamadas ao FastAPI
  styles/
  hooks/
  store/
  utils/
  @types/           # Tipos equivalentes aos Pydantic schemas
  data/             # MOCs (Fase MOC)
```

---

## 12. Conclusão

Este dossiê adapta o padrão de frontend Next.js para comunicação com backend Python/FastAPI (Stack 003). As diferenças principais são:

- Backend FastAPI (porta 8000)
- OpenAPI/Swagger docs
- Pydantic schemas
- Formato de erros específico

O resto da arquitetura permanece igual ao padrão institucional.

---

**Governança Técnica**  
Engenharia de Software — Stack 003 — v1.1

---

© 2026 - Documentação Institucional Oficial
