# PLAYBOOK_REFATORADOR.md

Playbook Institucional — Refatoração Corretiva — Stack 003

Versão: v2.0 — Playbook de Correção

**Stack:** 003_next_front_python_back_mongo

---

## 1. Objetivo

Corrigir violações arquiteturais detectadas pelo **003_PLAYBOOK_AUDITOR**, sem alterar funcionalidades ou escopo.

Este playbook é executado **condicionalmente** pelo 003_PLAYBOOK_PIPELINE, apenas quando a auditoria detecta violações corrigíveis (status BLOQUEADO).

**Princípio fundamental:** Refatorar é reorganizar código para melhorar estrutura **sem alterar comportamento**.

---

## 2. Quando Executar

Executar apenas se:

- Auditoria retornou status **BLOQUEADO**
- Violações são **corrigíveis** (não exigem decisão humana)
- Pipeline está em ciclo de correção (P3)

**NÃO executar se:**

- Auditoria retornou APROVADO ou APROVADO COM RESSALVAS
- Violações exigem decisão de produto
- Violações exigem alteração de escopo

---

## 3. Escopo de Atuação

### 3.1 Permitido

#### **Frontend Next.js:**

- ✅ Reorganizar estrutura de pastas (src/components, src/features)
- ✅ Mover componentes entre shared e feature
- ✅ Corrigir uso do apiClient (substituir fetch direto)
- ✅ Refatorar hooks customizados
- ✅ Eliminar fetch direto (usar services)
- ✅ Corrigir imports (absolutos vs relativos)
- ✅ Padronizar error handling
- ✅ Extrair lógica complexa de componentes
- ✅ Melhorar type safety (TypeScript)
- ✅ Adicionar error boundaries faltantes

#### **Backend Python/FastAPI:**

- ✅ Reorganizar camadas (routes, services, repositories)
- ✅ Extrair lógica de routes para services
- ✅ Mover queries de routes para repositories
- ✅ Refatorar services pesados (extrair funções auxiliares)
- ✅ Adicionar validações Pydantic faltantes
- ✅ Melhorar tratamento de erros (HTTPException)
- ✅ Padronizar responses (schemas Pydantic)
- ✅ Converter funções sync em async
- ✅ Adicionar type hints faltantes
- ✅ Otimizar queries Motor (MongoDB async)
- ✅ Extrair lógica complexa em funções auxiliares
- ✅ Melhorar estrutura de pastas (app/routes, app/services, etc)

#### **Integração:**

- ✅ Sincronizar DTOs entre frontend (TypeScript) e backend (Pydantic)
- ✅ Corrigir contratos HTTP (mesmos campos, mesmos tipos)
- ✅ Ajustar CORS (permitir frontend)
- ✅ Padronizar formato de erros

### 3.2 Proibido

**NUNCA faça:**

- ❌ Criar novas funcionalidades não documentadas
- ❌ Alterar escopo do Passaporte
- ❌ Modificar regras de negócio
- ❌ Adicionar novas páginas
- ❌ Remover funcionalidades existentes
- ❌ Misturar código frontend com backend
- ❌ Conectar a serviços externos na ETAPA MOC
- ❌ Adicionar MongoDB antes da ETAPA 3
- ❌ Alterar autenticação JWT (a menos que esteja quebrada)
- ❌ Modificar estrutura de dados (schemas) sem motivo técnico
- ❌ Adicionar dependências não aprovadas

---

## 4. Violações Comuns e Correções

### 4.1 Frontend: Fetch Direto

❌ **Violação:**

```typescript
// Componente fazendo fetch direto
const LoginPage = () => {
  const handleLogin = async () => {
    const response = await fetch("http://localhost:8000/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  };
};
```

✅ **Correção:**

```typescript
// Usar service + apiClient
import { authService } from "@/services/authService";

const LoginPage = () => {
  const handleLogin = async () => {
    const result = await authService.login(email, password);
  };
};

// Em src/services/authService.ts
import { apiClient } from "./apiClient";

export const authService = {
  login: async (email: string, password: string) => {
    const { data } = await apiClient.post("/auth/login", { email, password });
    return data;
  },
};
```

### 4.2 Frontend: Lógica Complexa em Componente

❌ **Violação:**

```typescript
// Lógica complexa no componente
const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/api/users/me")
      .then((res) => res.json())
      .then((data) => {
        // Processamento complexo aqui
        const formatted = {
          ...data,
          fullName: `${data.firstName} ${data.lastName}`,
          age: calculateAge(data.birthDate),
        };
        setUser(formatted);
      });
  }, []);
};
```

✅ **Correção:**

```typescript
// Extrair para hook customizado
import { useUser } from "@/hooks/useUser";

const UserProfile = () => {
  const { user, isLoading, error } = useUser();

  if (isLoading) return <Loading />;
  if (error) return <Error message={error} />;

  return <div>{user.fullName}</div>;
};

// Em src/hooks/useUser.ts
export const useUser = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    userService
      .getMe()
      .then((data) => setUser(formatUser(data)))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  return { user, isLoading, error };
};
```

### 4.3 Backend: Lógica em Route

❌ **Violação:**

```python
# Route com lógica de negócio
from fastapi import APIRouter, Depends
from passlib.context import CryptContext

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"])

@router.post("/register")
async def register(email: str, name: str, password: str):
    # Lógica de negócio na route! ❌
    hashed_password = pwd_context.hash(password)

    user = await db.users.insert_one({
        "email": email,
        "name": name,
        "password": hashed_password,
    })

    return {"id": str(user.inserted_id)}
```

✅ **Correção:**

```python
# Route apenas trata HTTP
from fastapi import APIRouter, Depends, HTTPException, status
from app.schemas.auth import RegisterRequest, RegisterResponse
from app.services.auth_service import AuthService

router = APIRouter()

@router.post("/register", response_model=RegisterResponse, status_code=status.HTTP_201_CREATED)
async def register(
    request: RegisterRequest,
    auth_service: AuthService = Depends()
):
    try:
        result = await auth_service.register(
            email=request.email,
            name=request.name,
            password=request.password
        )
        return result
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

# Em app/services/auth_service.py
from app.repositories.user_repository import UserRepository
from app.core.security import get_password_hash

class AuthService:
    def __init__(self, user_repo: UserRepository = Depends()):
        self.user_repo = user_repo

    async def register(self, email: str, name: str, password: str):
        # Lógica de negócio aqui
        if await self.user_repo.find_by_email(email):
            raise ValueError("Email already registered")

        hashed_password = get_password_hash(password)
        user = await self.user_repo.create({
            "email": email,
            "name": name,
            "password": hashed_password,
        })

        return {"id": str(user.id), "email": user.email, "name": user.name}
```

### 4.4 Backend: Query Direto na Route

❌ **Violação:**

```python
# Query direto na route
from app.core.database import get_database

@router.get("/users")
async def get_users(db = Depends(get_database)):
    users = await db.users.find({}).to_list(100)  # ❌ Query direto!
    return users
```

✅ **Correção:**

```python
# Route usa service, service usa repository
@router.get("/users", response_model=List[UserResponse])
async def get_users(user_service: UserService = Depends()):
    users = await user_service.get_all_users()
    return users

# Em app/services/user_service.py
class UserService:
    def __init__(self, user_repo: UserRepository = Depends()):
        self.user_repo = user_repo

    async def get_all_users(self) -> List[User]:
        return await self.user_repo.find_all()

# Em app/repositories/user_repository.py
from motor.motor_asyncio import AsyncIOMotorDatabase

class UserRepository:
    def __init__(self, db: AsyncIOMotorDatabase = Depends(get_database)):
        self.db = db
        self.collection = db.users

    async def find_all(self) -> List[User]:
        cursor = self.collection.find({})
        users = await cursor.to_list(100)
        return [User(**user) for user in users]
```

### 4.5 Backend: Função Sync ao invés de Async

❌ **Violação:**

```python
# Função sync em contexto async
def get_user(user_id: str):  # ❌ Não é async!
    user = db.users.find_one({"_id": user_id})  # Operação de I/O bloqueante!
    return user
```

✅ **Correção:**

```python
# Função async com await
async def get_user(user_id: str) -> User:  # ✅ async
    user = await self.collection.find_one({"_id": ObjectId(user_id)})  # ✅ await
    if not user:
        return None
    return User(**user)
```

### 4.6 Backend: Type Hints Ausentes

❌ **Violação:**

```python
# Sem type hints
async def create_user(email, name, password):  # ❌ Sem tipos!
    user = await user_repo.create({
        "email": email,
        "name": name,
        "password": password,
    })
    return user
```

✅ **Correção:**

```python
# Com type hints completos
async def create_user(
    email: str,
    name: str,
    password: str
) -> User:  # ✅ Tipos explícitos
    user = await self.user_repo.create({
        "email": email,
        "name": name,
        "password": password,
    })
    return user
```

### 4.7 Backend: Validação Pydantic Ausente

❌ **Violação:**

```python
# Endpoint sem validação
@router.post("/users")
async def create_user(request: dict):  # ❌ dict genérico!
    # Sem validação de campos obrigatórios
    email = request.get("email")  # Pode ser None!
    name = request.get("name")
```

✅ **Correção:**

```python
# Com schema Pydantic
from pydantic import BaseModel, EmailStr, Field

class CreateUserRequest(BaseModel):
    email: EmailStr  # ✅ Valida formato de email
    name: str = Field(..., min_length=2, max_length=100)  # ✅ Valida tamanho
    password: str = Field(..., min_length=8)  # ✅ Valida mínimo

@router.post("/users")
async def create_user(request: CreateUserRequest):  # ✅ Validação automática
    # FastAPI valida automaticamente, não aceita requisição inválida
    user = await user_service.create(request)
    return user
```

### 4.8 Componente em Pasta Errada

❌ **Violação:**

```
src/components/shared/UserProfileCard.tsx  # ❌ Componente específico em shared
src/components/shared/DashboardWidget.tsx  # ❌ Componente de dashboard em shared
```

✅ **Correção:**

```
src/features/users/components/UserProfileCard.tsx  # ✅ Em feature
src/features/dashboard/components/DashboardWidget.tsx  # ✅ Em feature

src/components/shared/Button.tsx  # ✅ Shared genérico
src/components/shared/Input.tsx   # ✅ Shared genérico
```

---

## 5. Processo de Refatoração

### 5.1 Etapa 1: Análise

1. **Ler relatório de auditoria completo**

   - Identificar todas as violações listadas
   - Entender contexto de cada violação

2. **Classificar violações por prioridade:**

   - **Críticas** — Bloqueiam funcionalidade (ex: build quebrado)
   - **Importantes** — Degradam arquitetura (ex: lógica em lugar errado)
   - **Menores** — Melhorias de qualidade (ex: type hints faltantes)

3. **Identificar dependências:**
   - Quais correções dependem de outras?
   - Qual ordem minimiza retrabalho?

### 5.2 Etapa 2: Planejamento

1. **Listar todas as correções necessárias**

   Exemplo:

   ```
   1. [Crítica] Converter função sync em async no user_service.py
   2. [Importante] Mover lógica de register_route para auth_service
   3. [Importante] Adicionar validação Pydantic em /users POST
   4. [Menor] Adicionar type hints em user_repository.py
   ```

2. **Definir ordem de execução**

   Princípio: Críticas → Importantes → Menores

3. **Verificar impacto**

   - Quais arquivos serão alterados?
   - Quais funcionalidades podem ser afetadas?

### 5.3 Etapa 3: Execução

Para cada violação:

1. **Localizar código problemático**

   - Abrir arquivo mencionado no relatório
   - Encontrar linha/função específica

2. **Aplicar correção conforme dossiês**

   - Seguir padrões de [003_DOSSIE_NEXT_FRONTEND](../003_01-identidades_estrutura/003_DOSSIE_NEXT_FRONTEND.md)
   - Seguir padrões de [003_DOSSIE_PYTHON_BACKEND](../003_01-identidades_estrutura/003_DOSSIE_PYTHON_BACKEND.md)

3. **Verificar integridade**

   - Código compila/roda?
   - Funcionalidade mantida?
   - Sem novos erros?

4. **Testar localmente**
   - Frontend: `npm run dev`
   - Backend: `uvicorn app.main:app --reload`
   - Testar fluxo afetado

### 5.4 Etapa 4: Validação

1. **Rodar builds:**

   ```bash
   # Frontend
   cd frontend
   npm run build

   # Backend (verificar imports)
   cd backend
   python -m app.main
   ```

2. **Verificar ausência de erros:**

   - Zero erros de compilação (frontend)
   - Zero erros de import (backend)
   - Zero warnings críticos

3. **Testar funcionalidades afetadas:**
   - Login/Register funcionando?
   - Páginas carregando?
   - APIs respondendo?

---

## 6. Checklist de Refatoração

### 6.1 Frontend Next.js

- [ ] Todos os fetches usam apiClient
- [ ] Nenhum fetch direto (sem `fetch()` raw)
- [ ] Componentes shared vs feature corretos
- [ ] Lógica complexa extraída para hooks ou services
- [ ] Error handling padronizado (try/catch, error boundaries)
- [ ] States gerenciados adequadamente (useState, Context)
- [ ] TypeScript types corretos (sem `any`)
- [ ] Imports organizados (absolutos com alias @/)
- [ ] `npm run build` executa sem erros
- [ ] `npm run dev` executa sem warnings críticos

### 6.2 Backend Python/FastAPI

- [ ] Camadas separadas corretamente:
  - `app/routes/` — apenas HTTP handling
  - `app/services/` — lógica de negócio
  - `app/repositories/` — acesso a dados
  - `app/models/` — schemas Pydantic
  - `app/core/` — config, security, database
- [ ] Routes apenas tratam HTTP (validação, status codes)
- [ ] Services contêm lógica de negócio
- [ ] Repositories acessam MongoDB via Motor
- [ ] Todas as funções são `async` (com `await`)
- [ ] Validação Pydantic em todos os endpoints
- [ ] Error handling com HTTPException
- [ ] Type hints em todas as funções
- [ ] Imports organizados
- [ ] `uvicorn app.main:app` inicia sem erros

### 6.3 Integração

- [ ] Contratos HTTP consistentes (frontend ↔ backend)
- [ ] DTOs sincronizados (TypeScript types ↔ Pydantic models)
- [ ] CORS configurado para http://localhost:3000
- [ ] Autenticação JWT funcional end-to-end
- [ ] Refresh token operacional
- [ ] Erros HTTP tratados no frontend

---

## 7. Testes Pós-Refatoração

### 7.1 Frontend

```bash
cd frontend
npm run build
npm run dev
```

**Verificar:**

- [ ] Compila sem erros
- [ ] Aplicação abre em http://localhost:3000
- [ ] Login funciona
- [ ] Register funciona
- [ ] Navegação funciona
- [ ] Estados loading/error funcionam
- [ ] Logout funciona

### 7.2 Backend

```bash
cd backend
source .venv/bin/activate  # ou .venv\Scripts\activate no Windows
uvicorn app.main:app --reload
```

**Verificar:**

- [ ] Inicia sem erros
- [ ] Swagger disponível em http://localhost:8000/docs
- [ ] `/health` responde 200
- [ ] POST `/auth/register` funciona
- [ ] POST `/auth/login` funciona
- [ ] Endpoints protegidos exigem token
- [ ] CORS permite frontend

### 7.3 Integração

```bash
# Backend rodando em :8000
# Frontend rodando em :3000
```

**Testar fluxo completo:**

- [ ] Register via frontend → cria usuário no backend
- [ ] Login via frontend → retorna token
- [ ] Token armazenado (localStorage ou cookie)
- [ ] Requisições autenticadas incluem token
- [ ] Refresh token funciona
- [ ] Logout limpa token

---

## 8. Relatório de Refatoração

**Documentar em:** `003_03-passaporte_de_criacao/RELATORIO_REFATORACAO_[DATA].md`

**Template:**

```markdown
# Relatório de Refatoração — Stack 003

**Data:** [DATA]  
**Etapa:** [CRIAÇÃO / MOC / INTEGRAÇÃO]  
**Violações Corrigidas:** [NÚMERO]

## Sumário Executivo

- **Status Inicial:** BLOQUEADO
- **Violações Críticas:** [N]
- **Violações Importantes:** [N]
- **Violações Menores:** [N]
- **Status Final:** APROVADO / APROVADO COM RESSALVAS

## Correções Aplicadas

### Frontend Next.js

#### Estrutura de Pastas

- [x] Movido `UserCard` de `shared/` para `features/users/components/`
- [x] Movido `DashboardWidget` de `shared/` para `features/dashboard/components/`

#### ApiClient

- [x] Substituído fetch direto em `LoginPage` por `authService.login()`
- [x] Criado `userService` com métodos `getAll()`, `getById()`, `update()`

#### Componentização

- [x] Extraído lógica de `UserProfile` para hook `useUser()`
- [x] Criado error boundary para feature `users`

#### Type Safety

- [x] Removido `any` de `UserContext`
- [x] Adicionado types para responses HTTP

### Backend Python/FastAPI

#### Camadas

- [x] Extraído lógica de `/auth/register` para `AuthService.register()`
- [x] Movido queries de `user_routes` para `UserRepository`
- [x] Criado `UserService` para lógica de negócio de usuários

#### Async/Await

- [x] Convertido `get_user()` de sync para async
- [x] Adicionado `await` em todas as queries Motor

#### Validação Pydantic

- [x] Criado `RegisterRequest` schema para POST `/auth/register`
- [x] Criado `UserResponse` schema para GET `/users/{id}`
- [x] Adicionado validação de email (EmailStr)

#### Type Hints

- [x] Adicionado type hints em `auth_service.py` (100%)
- [x] Adicionado type hints em `user_repository.py` (100%)

#### Error Handling

- [x] Substituído `raise Exception()` por `HTTPException`
- [x] Adicionado status codes corretos (400, 401, 404)
- [x] Padronizado mensagens de erro

### Integração

- [x] Sincronizado `User` type (frontend) com `UserResponse` (backend)
- [x] Corrigido CORS para aceitar `Authorization` header
- [x] Ajustado formato de erro (frontend esperava `{ message }`)

## Arquivos Modificados

### Frontend

- `src/pages/login.tsx`
- `src/services/authService.ts` (novo)
- `src/services/userService.ts` (novo)
- `src/hooks/useUser.ts` (novo)
- `src/features/users/components/UserCard.tsx` (movido)

### Backend

- `app/routes/auth_routes.py`
- `app/routes/user_routes.py`
- `app/services/auth_service.py` (novo)
- `app/services/user_service.py` (novo)
- `app/repositories/user_repository.py` (atualizado)
- `app/schemas/auth.py` (novo)
- `app/schemas/user.py` (novo)

## Testes Realizados

- [x] Frontend: `npm run build` — ✅ Sucesso
- [x] Frontend: Login manual — ✅ Funciona
- [x] Frontend: Register manual — ✅ Funciona
- [x] Backend: `uvicorn` start — ✅ Sucesso
- [x] Backend: POST `/auth/register` — ✅ 201 Created
- [x] Backend: POST `/auth/login` — ✅ 200 OK
- [x] Backend: GET `/users/me` — ✅ 200 OK (com token)
- [x] Integração: Login end-to-end — ✅ Funciona

## Observações

- Todas as violações críticas foram corrigidas
- Código agora em conformidade com dossiês
- Funcionalidades mantidas (sem quebra)
- Pronto para revalidação pelo AGENTE_AUDITOR

## Recomendações

- Considerar adicionar testes unitários (futura melhoria)
- Considerar adicionar logging estruturado (futura melhoria)

---

**Refatorado por:** 003_AGENTE_REFATORADOR  
**Próximo passo:** Revalidação (P4)
```

---

## 9. Padrões de Qualidade

### 9.1 Código Limpo

- **Funções pequenas** — Max 30 linhas
- **Single Responsibility** — Uma função, uma tarefa
- **Nomes descritivos** — `getUserById()` não `get()`
- **Sem código morto** — Remover imports/funções não usadas

### 9.2 Arquitetura

**Frontend:**

```
src/
├── components/shared/      # Reutilizáveis gerais
├── features/[nome]/        # Específicos de funcionalidade
├── services/               # Comunicação HTTP
├── hooks/                  # Lógica reutilizável
├── contexts/               # State global
└── pages/                  # Rotas Next.js
```

**Backend:**

```
app/
├── routes/                 # Apenas HTTP
├── services/               # Lógica de negócio
├── repositories/           # Acesso a dados
├── models/                 # Schemas Pydantic
├── core/                   # Config, security, DB
└── main.py                 # Entry point
```

### 9.3 Nomenclatura

**Python:**

- Classes: `PascalCase` (UserService, UserRepository)
- Funções/variáveis: `snake_case` (get_user_by_id, user_email)
- Constantes: `UPPER_SNAKE_CASE` (MAX_RETRIES, API_URL)

**TypeScript:**

- Interfaces/Types: `PascalCase` (User, UserResponse)
- Funções/variáveis: `camelCase` (getUserById, userEmail)
- Componentes: `PascalCase` (UserCard, LoginPage)
- Constantes: `UPPER_SNAKE_CASE` (MAX_RETRIES, API_URL)

---

## 10. Integração com Pipeline

Este playbook é chamado pelo **003_PLAYBOOK_PIPELINE** na Etapa P3 (Refatoração).

**Fluxo:**

```
P2: AGENTE_AUDITOR
      ↓
(Status: BLOQUEADO)
      ↓
P3: AGENTE_REFATORADOR  ← Você está aqui
      ↓
(Correções aplicadas)
      ↓
P4: Revalidação
      ↓
(P1: F-DESIGNER + P2: AUDITOR novamente)
```

**Output esperado:**

- Código refatorado (frontend + backend)
- Violações corrigidas
- Relatório de refatoração
- Status: Pronto para revalidação

---

**Governança Técnica**  
Engenharia de Software — Stack 003 — v2.0

© 2026 - Documentação Institucional Oficial
