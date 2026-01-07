# PLAYBOOK_AUDITOR.md

Playbook Institucional — Auditoria de Conformidade — Stack 003

Versão: v1.0 — Playbook Obrigatório

**Stack:** 003_next_front_python_back_mongo

---

## 1. Objetivo

Garantir que o código entregue (frontend Next.js + backend Python/FastAPI) está em conformidade com os dossiês institucionais e as regras de arquitetura da Stack 003.

Este playbook é executado automaticamente pelo **PLAYBOOK_PIPELINE** e pode ser executado manualmente a qualquer momento.

---

## 2. Documentos de Referência

- [MAPA_STACK_NEXT_FRONT_PYTHON_BACK_MONGO](../003_00-mapas_e_fluxos/003_MAPA_STACK_NEXT_FRONT_PYTHON_BACK_MONGO.md)
- [DOSSIE_REGRAS_DE_CRIACAO](../003_01-identidades_estrutura/003_DOSSIE_REGRAS_DE_CRIACAO.md)
- [DOSSIE_NEXT_FRONTEND](../003_01-identidades_estrutura/003_DOSSIE_NEXT_FRONTEND.md)
- [DOSSIE_PYTHON_BACKEND](../003_01-identidades_estrutura/003_DOSSIE_PYTHON_BACKEND.md)

---

## 3. Critérios de Auditoria Detalhados

### 3.1 Auditoria de Estrutura de Projetos

#### Frontend Next.js

**Verificações obrigatórias:**

- [ ] Projeto frontend completamente separado do backend
- [ ] Estrutura de pastas conforme dossiê:
  ```
  src/
  ├── app/              # Pages (App Router)
  ├── components/
  │   ├── shared/       # UI genéricos
  │   └── features/     # Específicos
  ├── contexts/         # AuthContext, etc
  ├── services/         # API calls
  ├── lib/              # apiClient, utils
  ├── types/            # TypeScript
  └── styles/           # Theme, global
  ```
- [ ] `lib/apiClient.ts` existe e centraliza HTTP
- [ ] `services/` para comunicação com backend
- [ ] `contexts/` para estado global (AuthContext)
- [ ] Componentes shared separados de features

#### Backend Python/FastAPI

**Verificações obrigatórias:**

- [ ] Projeto backend completamente separado do frontend
- [ ] Estrutura de camadas clara:
  ```
  app/
  ├── main.py
  ├── core/
  │   ├── config.py
  │   ├── security.py
  │   └── dependencies.py
  ├── db/
  │   └── mongodb.py
  ├── models/           # Estruturas MongoDB
  ├── schemas/          # Pydantic
  ├── repositories/     # Acesso dados (Motor)
  ├── services/         # Lógica negócio
  └── api/
      └── routes/       # Endpoints FastAPI
  ```
- [ ] `models/` para estruturas MongoDB (dict-based)
- [ ] `schemas/` para Pydantic (validação)
- [ ] `repositories/` para acesso ao banco (Motor async)
- [ ] `services/` para lógica de negócio
- [ ] `routes/` para endpoints FastAPI

---

### 3.2 Auditoria de Separação de Responsabilidades

#### Frontend Next.js

**❌ VIOLAÇÕES CRÍTICAS (bloqueiam):**

- Fetch direto em componentes (sem usar apiClient)
- Lógica de negócio no frontend
- Acesso direto a banco de dados
- Importação de código do backend
- Hardcoded URLs (não usar .env)
- Token exposto em logs ou console

**✅ CONFORMIDADE ESPERADA:**

- Componentes usam hooks ou contexts
- Hooks usam services
- Services usam apiClient configurado
- apiClient faz requisições HTTP para backend
- Variáveis de ambiente para URLs
- Loading/erro/vazio tratados
- TypeScript strict sem warnings críticos

**Validação prática:**

```bash
# Procurar fetch direto
grep -r "fetch(" src/app/ src/components/features/

# Procurar URL hardcoded
grep -r "http://localhost" src/ --exclude-dir=node_modules

# Verificar TypeScript
npm run type-check
```

#### Backend Python/FastAPI

**❌ VIOLAÇÕES CRÍTICAS (bloqueiam):**

- Lógica de negócio em routes
- Queries diretas em routes (Motor chamado fora de repositories)
- Routes com lógica complexa
- Mistura de camadas (route → repository direto)
- Código sync ao invés de async
- PyMongo ao invés de Motor
- Validação manual ao invés de Pydantic
- ObjectId exposto em responses (não converter para str)
- hashed_password em responses

**✅ CONFORMIDADE ESPERADA:**

- Routes apenas definem endpoints e delegates para services
- Services contêm toda lógica de negócio
- Repositories acessam banco (Motor async)
- Models definem estruturas MongoDB
- Schemas Pydantic validam entrada/saída
- **Todas funções são async** (repositories, services, routes)
- ObjectId sempre convertido para str em responses
- Passwords sempre hasheados (bcrypt via passlib)

**Validação prática:**

```bash
# Procurar código sync suspeito
grep -r "def " app/repositories/ app/services/ --exclude="__init__.py"
# Deve retornar apenas "async def"

# Procurar PyMongo (proibido)
grep -r "from pymongo" app/

# Verificar se Motor está sendo usado
grep -r "from motor" app/

# Procurar validação manual (deve usar Pydantic)
grep -r "if not " app/api/routes/
```

---

### 3.3 Auditoria de Comunicação HTTP/REST

**Checklist Frontend ↔ Backend:**

- [ ] Frontend usa `NEXT_PUBLIC_API_URL` do .env
- [ ] apiClient configurado com baseURL
- [ ] Interceptors configurados (token, erro 401)
- [ ] Backend aceita requisições do frontend (CORS)
- [ ] CORS permite origem do frontend
- [ ] CORS permite credentials
- [ ] Contratos HTTP respeitados (schemas Pydantic)
- [ ] DTOs/Types consistentes em ambos os lados
- [ ] Tratamento de erros HTTP no frontend
- [ ] Responses padronizadas no backend (Pydantic)
- [ ] Status codes corretos (200, 201, 400, 401, 404, 500)

**Validação CORS:**

```python
# Verificar configuração em main.py
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS.split(","),  # http://localhost:3000
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

**Validação Frontend:**

```typescript
// Verificar apiClient.ts
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,  // http://localhost:8000
});
```

---

### 3.4 Auditoria de Autenticação JWT

**Checklist Backend:**

- [ ] JWT implementado (python-jose)
- [ ] SECRET_KEY configurado (não hardcoded)
- [ ] Algoritmo HS256 configurado
- [ ] Expiração configurada (ACCESS_TOKEN_EXPIRE_MINUTES)
- [ ] Password hashing com bcrypt (via passlib)
- [ ] Dependency `get_current_user` implementado
- [ ] Rotas protegidas usam `Depends(get_current_user)`
- [ ] Token validado em cada request protegido
- [ ] hashed_password **nunca** retornado em responses

**Checklist Frontend:**

- [ ] Token salvo após login (localStorage ou cookie)
- [ ] Token incluído em requisições (header Authorization)
- [ ] Interceptor adiciona token automaticamente
- [ ] Logout limpa token
- [ ] Erro 401 redireciona para login
- [ ] AuthContext gerencia autenticação
- [ ] Token não exposto em logs

**Validação JWT Backend:**

```python
# Verificar core/security.py
def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)

def decode_token(token: str) -> TokenData:
    payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
    # ...
```

**Validação JWT Frontend:**

```typescript
// Verificar apiClient interceptor
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

---

### 3.5 Auditoria de Async/Await (CRÍTICO)

**❌ VIOLAÇÃO CRÍTICA:** Código sync onde deve ser async

**Verificações obrigatórias Backend:**

- [ ] **TODOS** os repositories são async:
  ```python
  async def create_user(user_data: dict) -> dict
  async def get_user_by_email(email: str) -> Optional[dict]
  ```

- [ ] **TODOS** os services são async:
  ```python
  async def register_user(data: UserCreate) -> UserResponse
  async def login_user(email: str, password: str) -> dict
  ```

- [ ] **TODAS** as routes são async:
  ```python
  @router.post("/register")
  async def register_endpoint(data: UserCreate):
      return await auth_service.register_user(data)
  ```

- [ ] Motor (não PyMongo) é usado:
  ```python
  from motor.motor_asyncio import AsyncIOMotorClient
  
  # Correto
  user = await db.users.find_one({"email": email})
  
  # Errado (sync)
  user = db.users.find_one({"email": email})
  ```

**Comandos de validação:**

```bash
# Verificar se há funções sync nos repositories
grep -E "^\s*def\s+" app/repositories/*.py

# Verificar se há funções sync nos services
grep -E "^\s*def\s+" app/services/*.py

# Verificar uso de Motor
grep "from motor" app/db/mongodb.py

# Verificar PyMongo (proibido)
grep "from pymongo" app/ -r
```

---

### 3.6 Auditoria de Validação

#### Backend Python/FastAPI

**Checklist Pydantic:**

- [ ] Schemas Pydantic criados para entrada:
  ```python
  class UserCreate(BaseModel):
      name: str
      email: EmailStr
      password: str
  ```

- [ ] Schemas Pydantic criados para saída:
  ```python
  class UserResponse(BaseModel):
      id: str
      name: str
      email: str
      is_active: bool
  ```

- [ ] Validação automática via type hints:
  ```python
  @router.post("/register", response_model=UserResponse)
  async def register(data: UserCreate):  # Pydantic valida automaticamente
      ...
  ```

- [ ] Erros de validação retornam 422 automaticamente
- [ ] Nenhuma validação manual if/else (Pydantic faz isso)

**❌ VIOLAÇÃO:** Validação manual ao invés de Pydantic

```python
# Errado
if not email or "@" not in email:
    raise HTTPException(400, "Email inválido")

# Correto
class UserCreate(BaseModel):
    email: EmailStr  # Pydantic valida automaticamente
```

#### Frontend Next.js

**Checklist:**

- [ ] Validação de formulários (React Hook Form + Zod)
- [ ] Feedback visual de erros
- [ ] Estados loading/erro/vazio tratados
- [ ] Validação client-side antes de enviar

---

### 3.7 Auditoria de Build e Compilação

#### Frontend Next.js

**Comandos de validação:**

```bash
cd frontend/

# Build produção
npm run build

# Type-check TypeScript
npm run type-check
# ou
npx tsc --noEmit

# Lint
npm run lint
```

**Checklist:**

- [ ] `npm run build` sem erros
- [ ] `npm run build` sem warnings críticos
- [ ] TypeScript compila sem erros
- [ ] ESLint sem erros críticos
- [ ] Nenhum import não resolvido

#### Backend Python/FastAPI

**Comandos de validação:**

```bash
cd backend/

# Rodar servidor
uvicorn app.main:app --reload

# Type-check (se usar mypy)
mypy app/

# Lint
ruff check app/
# ou
pylint app/
```

**Checklist:**

- [ ] Servidor roda sem erros
- [ ] Swagger docs acessível (http://localhost:8000/docs)
- [ ] Nenhum import não resolvido
- [ ] Nenhum erro de sintaxe
- [ ] Todas dependências instaladas (requirements.txt)

---

### 3.8 Auditoria de Fase MOC

Durante Fase MOC (Mock-Oriented Construction):

**Frontend:**

- [ ] Frontend usa MOCs em `src/data/mocks/` (não banco real)
- [ ] Testes não dependem de backend ativo

**Backend:**

- [ ] Backend pode retornar dados mocados em repositories
- [ ] Motor não estabelece conexão ativa com MongoDB durante testes
- [ ] Repositories têm flag para modo MOC:
  ```python
  if settings.MOC_MODE:
      return mock_users
  else:
      return await db.users.find().to_list(100)
  ```

**Validação:**

- [ ] Sistema funciona sem MongoDB rodando
- [ ] MOCs representam dados reais
- [ ] Fácil transição de MOC para produção

---

## 4. Classificação de Resultado

### ✅ APROVADO

**Critérios:**

- Todas as verificações críticas passaram
- Builds limpos (frontend e backend)
- Arquitetura conforme dossiês
- Separação de projetos respeitada
- Async/await correto
- Pydantic validando tudo
- CORS configurado
- JWT funcional

**Ação:**

- ✅ Pode prosseguir para próxima fase
- ✅ Deploy permitido (após testes)

### ⚠️ APROVADO COM RESSALVAS

**Critérios:**

- Pequenas violações não-críticas detectadas
- Recomendações para melhorias
- Funcionalidade não comprometida

**Exemplos:**

- Componente em pasta não ideal
- Falta de comentários
- Variável mal nomeada
- Log excessivo

**Ação:**

- ✅ Pode prosseguir
- ⚠️ Criar issues para melhorias
- ⚠️ Revisar em próximo refactoring

### 🚫 BLOQUEADO

**Critérios:**

- Violações críticas detectadas
- Arquitetura comprometida
- Funcionalidade quebrada
- Segurança vulnerável

**Exemplos:**

- Backend dentro do Next.js
- Frontend acessando MongoDB
- Código sync ao invés de async
- Lógica em routes
- CORS não configurado
- JWT não implementado
- Passwords não hasheados
- Build com erros

**Ação:**

- 🚫 **BLOQUEADO:** Não pode prosseguir
- 🚫 **OBRIGATÓRIO:** Acionar PLAYBOOK_REFATORADOR
- 🚫 **OBRIGATÓRIO:** Corrigir violações críticas
- 🚫 **OBRIGATÓRIO:** Re-auditar após correções

---

## 5. Violações Críticas (Bloqueiam Aprovação)

### Frontend Next.js

- 🚫 Frontend acessa banco diretamente
- 🚫 Fetch direto sem apiClient
- 🚫 Backend dentro do projeto Next.js
- 🚫 Importação cruzada frontend ↔ backend
- 🚫 Lógica de negócio em componentes
- 🚫 URLs hardcoded
- 🚫 Token exposto em logs
- 🚫 Build com erros

### Backend Python/FastAPI

- 🚫 Backend dentro do projeto frontend
- 🚫 Lógica de negócio em routes
- 🚫 Queries diretas em routes (fora de repositories)
- 🚫 Código sync ao invés de async
- 🚫 PyMongo ao invés de Motor
- 🚫 Flask ou Django ao invés de FastAPI
- 🚫 Validação manual ao invés de Pydantic
- 🚫 ObjectId exposto em responses
- 🚫 hashed_password em responses
- 🚫 CORS não configurado
- 🚫 JWT não implementado
- 🚫 Passwords não hasheados
- 🚫 Servidor não roda

### Integração

- 🚫 CORS bloqueando requisições
- 🚫 JWT não validando
- 🚫 Frontend não consegue chamar backend
- 🚫 Contratos HTTP inconsistentes

---

## 6. Formato de Relatório de Auditoria

Gerar relatório estruturado ao final:

```markdown
# RELATÓRIO DE AUDITORIA — Stack 003

**Data:** 2026-01-07  
**Auditor:** AGENTE_AUDITOR  
**Stack:** 003_next_front_python_back_mongo

---

## 1. Frontend Next.js

### Estrutura
- ✅ Projeto separado
- ✅ Pastas conforme dossiê
- ✅ apiClient configurado

### Código
- ✅ TypeScript strict OK
- ✅ Services implementados
- ✅ AuthContext OK
- ❌ Componente `UserCard` está em `shared/` mas deveria estar em `features/users/`

### Build
- ✅ `npm run build` OK
- ✅ Type-check OK

---

## 2. Backend Python/FastAPI

### Estrutura
- ✅ Projeto separado
- ✅ Camadas separadas (routes/services/repos)
- ✅ Models e Schemas corretos

### Código
- ✅ Async/await correto
- ✅ Pydantic validando tudo
- ✅ Motor configurado
- ✅ JWT implementado
- ✅ CORS configurado

### Build
- ✅ Servidor roda OK
- ✅ Swagger docs OK (http://localhost:8000/docs)

---

## 3. Integração

- ✅ CORS OK (sem bloqueios)
- ✅ JWT funcional
- ✅ Frontend → Backend OK
- ✅ Tipos consistentes

---

## 4. Classificação: ⚠️ APROVADO COM RESSALVAS

### Ações Necessárias:

1. **Mover componente `UserCard`**
   - De: `components/shared/UserCard.tsx`
   - Para: `components/features/users/UserCard.tsx`
   - Prioridade: BAIXA
   - Responsável: Dev Frontend

2. **Adicionar comentários**
   - Arquivo: `services/auth_service.py`
   - Funções sem docstring
   - Prioridade: BAIXA

---

## 5. Conclusão

Sistema está funcional e em conformidade com dossiês institucionais. Pequenos ajustes recomendados mas não bloqueiam avanço.

✅ **APROVADO para prosseguir**

---

**Assinatura Digital:** AGENTE_AUDITOR  
**Timestamp:** 2026-01-07T14:30:00Z
```

---

## 7. Próximos Passos Após Auditoria

### Se APROVADO

1. Prosseguir para **PLAYBOOK_EVOLUTOR** (criar features)
2. Ou prosseguir para **deploy** (se já concluído)

### Se APROVADO COM RESSALVAS

1. Criar issues para melhorias
2. Prosseguir para próxima fase
3. Revisar em próximo ciclo de refactoring

### Se BLOQUEADO

1. ⚠️ **PARAR imediatamente**
2. Acionar **PLAYBOOK_REFATORADOR**
3. Corrigir **TODAS** as violações críticas
4. Re-executar **PLAYBOOK_AUDITOR**
5. Só prosseguir após aprovação

---

**Governança Técnica**  
Engenharia de Software — Stack 003 — Python/FastAPI + Next.js — v1.0

**Responsável:** AGENTE_AUDITOR

**Próximo Playbook:** PLAYBOOK_REFATORADOR (se bloqueado) ou PLAYBOOK_EVOLUTOR (se aprovado)

---

© 2026 - Documentação Institucional Oficial
