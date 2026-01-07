# PLAYBOOK_CRIADOR.md

Playbook Institucional — Criação Inicial do Projeto Stack 003

Versão: v1.0 — Playbook Oficial de Bootstrap

**Stack:** 003_next_front_python_back_mongo

---

## 1. Objetivo

Este playbook define o **processo completo de criação inicial** de um projeto com arquitetura separada: frontend Next.js + backend Python/FastAPI.

Ele é responsável por **fazer o projeto nascer**, garantindo que:

- A estrutura de **dois projetos separados** esteja correta
- A **comunicação HTTP/REST** entre frontend e backend funcione
- A autenticação distribuída opere corretamente
- As páginas institucionais existam
- Ambos os projetos rodem sem erros

Este playbook **não cria produto final**. Ele cria uma **base saudável e operacional com dois serviços independentes**.

---

## 2. Momento de Execução

Este playbook deve ser executado **uma única vez por projeto**, logo no início.

Pré-condição:

- Projeto ainda não iniciado

Pós-condição:

- Frontend Next.js e backend FastAPI funcionais, comunicando-se via HTTP
- Autenticação distribuída operacional com JWT

---

## 3. Entradas Obrigatórias

- [MAPA_INSTITUCIONAL_CENTRAL.md](../../mapas_e_fluxos_centrais/MAPA_INSTITUCIONAL_CENTRAL.md)
- [FLUXO_ORQUESTRADOR_CENTRAL.md](../../mapas_e_fluxos_centrais/FLUXO_ORQUESTRADOR_CENTRAL.md)
- [MAPA_STACK_NEXT_FRONT_PYTHON_BACK.md](../003_00-mapas_e_fluxos/003_MAPA_STACK_NEXT_FRONT_PYTHON_BACK_MONGO.md)
- [DOSSIE_REGRAS_DE_CRIACAO.md](../003_01-identidades_estrutura/003_DOSSIE_REGRAS_DE_CRIACAO.md)
- [DOSSIE_NEXT_FRONTEND.md](../003_01-identidades_estrutura/003_DOSSIE_NEXT_FRONTEND.md)
- [DOSSIE_PYTHON_BACKEND.md](../003_01-identidades_estrutura/003_DOSSIE_PYTHON_BACKEND.md)
- Referências Visuais (../003_05-referencias-etapa-criacao-estrutura/referencias-visuais/)

---

## 4. Stack Institucional Fixa (NÃO NEGOCIÁVEL)

### Arquitetura

- Frontend e Backend **SEPARADOS**
- Comunicação **apenas HTTP/REST**
- Sem código compartilhado entre projetos

### Frontend

- Next.js 15 (App Router)
- TypeScript
- Styled Components (CSS-in-JS)
- React Hook Form + Zod

### Backend

- Python 3.11+
- FastAPI
- Motor (async MongoDB driver)
- Pydantic (validação)
- JWT (autenticação)
- Uvicorn (servidor ASGI)

### Banco

- MongoDB (via Motor)

### Proibições

- ❌ Tailwind CSS
- ❌ Backend dentro do Next.js
- ❌ Frontend acessando banco
- ❌ Outros frameworks Python (Flask, Django)

---

## 5. Etapas de Execução Detalhadas

### 5.1 Etapa C1 — Criação da Estrutura Base (Dois Projetos Separados)

Ações obrigatórias:

**PROJETO FRONTEND (Next.js 15):**

1. Inicializar projeto Next.js com TypeScript
2. Configurar variáveis de ambiente:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```
3. Criar estrutura de pastas:
   ```
   src/
   ├── app/
   │   ├── layout.tsx
   │   └── page.tsx (home vazia)
   ├── components/
   │   └── shared/
   ├── lib/
   │   └── apiClient.ts
   ├── contexts/
   ├── services/
   ├── types/
   └── styles/
   ```

**PROJETO BACKEND (Python/FastAPI):**

1. Criar ambiente virtual Python
2. Instalar dependências:
   ```txt
   fastapi
   uvicorn[standard]
   motor
   pydantic
   python-jose[cryptography]
   passlib[bcrypt]
   python-multipart
   ```
3. Configurar variáveis de ambiente:
   ```env
   PORT=8000
   MONGO_URI=mongodb://localhost:27017/app_db
   JWT_SECRET=your-secret-key-here
   JWT_ALGORITHM=HS256
   ACCESS_TOKEN_EXPIRE_MINUTES=30
   CORS_ORIGINS=http://localhost:3000
   ```
4. Criar estrutura de pastas:
   ```
   app/
   ├── main.py
   ├── core/
   │   ├── config.py
   │   ├── security.py
   │   └── dependencies.py
   ├── db/
   │   └── mongodb.py
   ├── models/
   ├── schemas/
   ├── repositories/
   ├── services/
   └── api/
       └── routes/
   ```

**Resultado esperado:**

- ✅ Dois projetos compiláveis e executáveis
- ✅ Backend responde em http://localhost:8000
- ✅ Frontend roda em http://localhost:3000
- ✅ Projetos são completamente separados

---

### 5.2 Etapa C2 — Infraestrutura de Comunicação

Ações obrigatórias:

**BACKEND (FastAPI):**

1. **Configurar CORS:**

   ```python
   # main.py
   from fastapi.middleware.cors import CORSMiddleware

   app.add_middleware(
       CORSMiddleware,
       allow_origins=settings.CORS_ORIGINS.split(","),
       allow_credentials=True,
       allow_methods=["*"],
       allow_headers=["*"],
   )
   ```

2. **Criar endpoint de saúde:**

   ```python
   @app.get("/health")
   async def health_check():
       return {"status": "healthy", "timestamp": datetime.utcnow()}
   ```

3. **Configurar tratamento de erros:**

   ```python
   # core/exceptions.py
   from fastapi import HTTPException

   class AppException(HTTPException):
       pass
   ```

4. **Configurar logging:**
   ```python
   import logging
   logging.basicConfig(level=logging.INFO)
   logger = logging.getLogger(__name__)
   ```

**FRONTEND (Next.js):**

1. **Implementar apiClient:**

   ```typescript
   // lib/apiClient.ts
   import axios from "axios";

   export const apiClient = axios.create({
     baseURL: process.env.NEXT_PUBLIC_API_URL,
     headers: {
       "Content-Type": "application/json",
     },
   });

   // Interceptor para adicionar token
   apiClient.interceptors.request.use((config) => {
     const token = localStorage.getItem("token");
     if (token) {
       config.headers.Authorization = `Bearer ${token}`;
     }
     return config;
   });

   // Interceptor para tratamento de erros
   apiClient.interceptors.response.use(
     (response) => response,
     (error) => {
       if (error.response?.status === 401) {
         localStorage.removeItem("token");
         window.location.href = "/login";
       }
       return Promise.reject(error);
     }
   );
   ```

2. **Testar comunicação:**
   ```typescript
   // Chamar /health do backend
   const response = await apiClient.get("/health");
   console.log(response.data);
   ```

**Resultado esperado:**

- ✅ Frontend consegue fazer requisições HTTP ao backend
- ✅ CORS configurado adequadamente (sem bloqueios)
- ✅ Interceptors funcionando
- ✅ Tratamento de erros operando

---

### 5.3 Etapa C3 — Infraestrutura Visual Frontend

Ações obrigatórias:

1. **Implementar componentes shared obrigatórios:**

   - `Button.tsx` (primary, secondary, danger variants)
   - `Input.tsx` (text, password, email types)
   - `Card.tsx` (container genérico)
   - `Loading.tsx` (spinner/skeleton)
   - `Modal.tsx` (diálogos)
   - `Header.tsx` (navegação)
   - `Typography.tsx` (h1, h2, h3, body, caption)

2. **Configurar theme:**

   ```typescript
   // styles/theme.ts
   export const theme = {
     colors: {
       primary: "#0070f3",
       secondary: "#7928ca",
       danger: "#ff0000",
       text: "#333333",
       background: "#ffffff",
     },
     spacing: {
       xs: "4px",
       sm: "8px",
       md: "16px",
       lg: "24px",
       xl: "32px",
     },
   };
   ```

3. **Criar layout base:**
   ```typescript
   // app/layout.tsx
   export default function RootLayout({ children }) {
     return (
       <html>
         <body>
           <Header />
           <main>{children}</main>
           <Footer />
         </body>
       </html>
     );
   }
   ```

**Resultado esperado:**

- ✅ Componentes shared disponíveis
- ✅ Theme configurado
- ✅ Layout base aplicado

---

### 5.4 Etapa C4 — Autenticação Distribuída (Backend Python/FastAPI)

Ações obrigatórias no **BACKEND:**

1. **Criar estrutura MongoDB (dict-based):**

   ```python
   # app/models/user.py
   # Estrutura:
   {
       "_id": ObjectId,
       "name": str,
       "email": str (único),
       "hashed_password": str,
       "is_active": bool,
       "created_at": datetime,
       "updated_at": datetime
   }
   ```

2. **Criar Pydantic Schemas:**

   ```python
   # app/schemas/user.py
   class UserBase(BaseModel):
       name: str
       email: EmailStr

   class UserCreate(UserBase):
       password: str

   class UserResponse(UserBase):
       id: str
       is_active: bool
       created_at: datetime

   class Token(BaseModel):
       access_token: str
       token_type: str
   ```

3. **Criar User Repository (async):**

   ```python
   # app/repositories/user_repository.py
   async def create_user(user_data: dict) -> dict
   async def get_user_by_email(email: str) -> Optional[dict]
   async def get_user_by_id(user_id: str) -> Optional[dict]
   ```

4. **Criar Auth Service (async):**

   ```python
   # app/services/auth_service.py
   async def register_user(data: UserCreate) -> UserResponse
   async def login_user(email: str, password: str) -> dict
   def hash_password(password: str) -> str  # bcrypt
   def verify_password(plain: str, hashed: str) -> bool
   ```

5. **Criar Security Utils:**

   ```python
   # app/core/security.py
   def create_access_token(data: dict) -> str  # JWT
   def decode_token(token: str) -> TokenData
   ```

6. **Criar rotas de autenticação:**

   ```python
   # app/api/routes/auth.py
   router = APIRouter(prefix="/auth", tags=["Auth"])

   @router.post("/register", response_model=UserResponse)
   @router.post("/login", response_model=Token)
   @router.get("/me", response_model=UserResponse)
   @router.post("/logout")
   @router.post("/forgot-password")
   @router.post("/reset-password")
   ```

7. **Criar dependency de autenticação:**

   ```python
   # app/core/dependencies.py
   async def get_current_user(
       token: str = Depends(oauth2_scheme)
   ) -> UserResponse:
       # Valida JWT e retorna usuário
   ```

8. **Criar usuário root (seed):**
   ```python
   # admin@exemplo.com / admin123
   ```

**Nota operacional:** Durante Fase MOC, repositories podem retornar dados mocados. Motor não precisa conectar ao MongoDB real ainda.

**Resultado esperado:**

- ✅ Swagger docs funcionam (http://localhost:8000/docs)
- ✅ POST /auth/register cria usuário
- ✅ POST /auth/login retorna JWT
- ✅ GET /auth/me retorna dados do usuário (com token)
- ✅ Password está hasheado (bcrypt via passlib)
- ✅ Todas funções são async

---

### 5.5 Etapa C5 — Autenticação Distribuída (Frontend Next.js)

Ações obrigatórias no **FRONTEND:**

1. **Criar páginas de autenticação (usar HTMLs de referência LITERALMENTE):**

   - `app/login/page.tsx`
   - `app/register/page.tsx`
   - `app/forgot-password/page.tsx`
   - `app/reset-password/page.tsx`

2. **Criar auth service:**

   ```typescript
   // services/authService.ts
   export const authService = {
     login: async (email: string, password: string) => {
       const { data } = await apiClient.post("/auth/login", {
         email,
         password,
       });
       return data;
     },
     register: async (userData: RegisterData) => {
       const { data } = await apiClient.post("/auth/register", userData);
       return data;
     },
     getMe: async () => {
       const { data } = await apiClient.get("/auth/me");
       return data;
     },
   };
   ```

3. **Implementar AuthContext:**

   ```typescript
   // contexts/AuthContext.tsx
   interface AuthContextType {
     user: User | null;
     token: string | null;
     isAuthenticated: boolean;
     login: (email: string, password: string) => Promise<void>;
     logout: () => void;
   }
   ```

4. **Implementar proteção de rotas:**

   ```typescript
   // components/ProtectedRoute.tsx
   // Redireciona para /login se não autenticado
   ```

5. **Criar página home protegida:**

   ```typescript
   // app/page.tsx (dashboard vazio)
   // Só acessível com autenticação
   ```

6. **Gerenciar tokens:**
   - Salvar em localStorage
   - Auto-set no apiClient
   - Limpar no logout

**Regra sobre HTMLs de referência:**

- ✅ Replicar LITERALMENTE os HTMLs de referência
- ✅ Permitido alterar apenas `{APP_NAME}` e `{BRAND_PALETTE}`
- 🚫 Proibido reorganizar DOM ou classes

**Resultado esperado:**

- ✅ Usuário cadastra → redireciona para login
- ✅ Usuário loga → recebe token → redireciona para home
- ✅ Token persiste em localStorage
- ✅ Rotas protegidas redirecionam não autenticados
- ✅ Logout limpa token e state
- ✅ AuthContext disponível em toda aplicação

---

### 5.6 Etapa C6 — Validação de Integração

Ações obrigatórias:

**TESTES MANUAIS:**

1. Cadastrar novo usuário via frontend
2. Fazer login com usuário criado
3. Acessar home protegida
4. Verificar dados do usuário (/auth/me)
5. Fazer logout
6. Verificar redirecionamento para login
7. Login com usuário root (admin@exemplo.com)

**VALIDAÇÕES TÉCNICAS:**

- ✅ `npm run build` (frontend) sem erros
- ✅ Backend roda sem erros (uvicorn app.main:app --reload)
- ✅ Swagger docs acessível e funcional
- ✅ CORS não bloqueia requisições
- ✅ Tokens JWT válidos
- ✅ Logs estruturados funcionando

**CHECKLIST FINAL:**

- [ ] Frontend compila e roda
- [ ] Backend compila e roda
- [ ] Comunicação HTTP funciona
- [ ] Login end-to-end funcional
- [ ] Cadastro end-to-end funcional
- [ ] Proteção de rotas operando
- [ ] Logout funciona e limpa estado
- [ ] Usuário root acessível

---

## 6. Critérios de Aceite Completos

### Frontend Next.js

- ✅ Projeto compila sem erros (`npm run build`)
- ✅ Todas as páginas de auth renderizam corretamente
- ✅ apiClient configurado e funcional
- ✅ Interceptors operando (token, erro 401)
- ✅ AuthContext implementado e disponível
- ✅ Proteção de rotas funcional
- ✅ Comunicação HTTP com backend sem CORS errors
- ✅ Loading states implementados
- ✅ Error handling funcionando
- ✅ TypeScript strict sem warnings críticos

### Backend Python/FastAPI

- ✅ Servidor Uvicorn roda sem erros
- ✅ Swagger docs acessível (http://localhost:8000/docs)
- ✅ Endpoint `/health` responde
- ✅ CORS configurado para frontend
- ✅ Todos endpoints de auth funcionais
- ✅ JWT gerado e validado corretamente
- ✅ Password hashing funcional (bcrypt via passlib)
- ✅ Pydantic valida entrada/saída
- ✅ Dependency `get_current_user` protege rotas
- ✅ Todas funções são async (repositories, services, routes)
- ✅ Logging estruturado operando

### Integração Frontend ↔ Backend

- ✅ Frontend e backend comunicam-se via HTTP/REST
- ✅ Login funcional end-to-end
- ✅ Cadastro funcional end-to-end
- ✅ Tokens persistem e são enviados em requests
- ✅ Rotas protegidas validam JWT
- ✅ Logout limpa tokens e redireciona
- ✅ Usuário root acessível
- ✅ Erros backend aparecem no frontend
- ✅ Nenhum erro de console (exceto warnings aceitáveis)

---

## 7. Fase MOC (Mock-Oriented Construction)

Durante o desenvolvimento inicial:

**Backend:**

- Repositories podem retornar dados mocados
- Motor não precisa conectar ao MongoDB real ainda
- Estrutura completa, mas com dados fake

**Frontend:**

- MOCs podem ficar em `src/data/mocks/`
- Trocar por API calls reais após validação

**Transição para Produção:**

- Conectar Motor ao MongoDB real
- Remover MOCs dos repositories
- Validar fluxo completo com banco real

---

## 8. Regras de Criação (NÃO QUEBRAR)

### Arquitetura Backend

- ✅ Routes Python **não contêm lógica de negócio**
- ✅ Lógica de negócio **apenas em services**
- ✅ Banco de dados acessado **apenas por repositories**
- ✅ **Sempre async/await** em repositories, services e routes
- ✅ **Sempre Pydantic** para validação
- ✅ **Sempre Motor** (não PyMongo sync)
- 🚫 **NUNCA** lógica em routes
- 🚫 **NUNCA** código sync quando deve ser async
- 🚫 **NUNCA** expor ObjectId sem converter para str
- 🚫 **NUNCA** retornar hashed_password em responses

### Arquitetura Frontend

- ✅ Frontend **nunca chama fetch direto** (usa apiClient)
- ✅ Shared UI **separados** de Feature UI
- ✅ Componentes de domínio em `features/<dominio>/`
- ✅ **Sempre TypeScript strict**
- ✅ **Sempre usar services** para API calls
- 🚫 **NUNCA** fetch direto nas páginas
- 🚫 **NUNCA** misturar shared com feature components
- 🚫 **NUNCA** hardcodar URLs (usar .env)

### Separação de Projetos

- ✅ Backend é projeto **completamente separado**
- ✅ Comunicação **apenas via HTTP/REST**
- ✅ Nenhum código compartilhado
- 🚫 **NUNCA** backend dentro do Next.js
- 🚫 **NUNCA** frontend acessando banco diretamente

---

## 9. Proibições Explícitas

### Processo

- 🚫 **Não pular etapas** (seguir C1 → C2 → C3 → C4 → C5 → C6)
- 🚫 **Não criar features** antes da base de autenticação
- 🚫 **Não avançar** sem validar critérios de aceite
- 🚫 **Não simplificar** arquitetura ou regras

### Tecnologia

- 🚫 **Não usar Flask ou Django** (apenas FastAPI)
- 🚫 **Não usar PyMongo sync** (apenas Motor async)
- 🚫 **Não usar Tailwind CSS** (apenas Styled Components)
- 🚫 **Não misturar** camadas de arquitetura
- 🚫 **Não ignorar** async/await

### Documentação

- 🚫 **Não usar** dossiês de outras stacks
- 🚫 **Não ignorar** referências visuais
- 🚫 **Não modificar** estrutura DOM dos HTMLs de referência

---

## 10. Regras de Bloqueio

**Bloquear execução e reportar erro se:**

- ✋ Tentar criar backend dentro do Next.js (isso é Stack 001)
- ✋ Frontend tentar acessar banco diretamente
- ✋ Usar documentos de outra stack
- ✋ Ignorar separação de projetos
- ✋ CORS não configurado
- ✋ Tokens não implementados
- ✋ HTMLs de referência não replicados literalmente
- ✋ Usar Flask ou Django ao invés de FastAPI
- ✋ Usar PyMongo ao invés de Motor
- ✋ Criar código sync ao invés de async
- ✋ Pular etapas obrigatórias

---

## 11. Próximos Passos

Após conclusão **bem-sucedida** deste playbook:

1. ✅ **PLAYBOOK_PIPELINE**

   - Executar F-Designer → Auditor → Refatorador
   - Validar estrutura criada
   - Refinar código

2. ✅ **PASSAPORTE_DO_PRODUTO**

   - Gerar passaporte do produto (etapa MOC)
   - Definir páginas e funcionalidades
   - Criar referências visuais

3. ✅ **PLAYBOOK_EVOLUTOR**
   - Criar páginas do produto página por página
   - Implementar backend antes de frontend
   - Validar integração

---

## 12. Saídas Esperadas

Ao final deste playbook, o projeto deve ter:

**Estrutura:**

- ✅ Dois projetos separados (frontend/ e backend/)
- ✅ Estrutura de pastas conforme dossiês
- ✅ Variáveis de ambiente configuradas

**Funcionalidades:**

- ✅ Autenticação completa (register, login, logout, me)
- ✅ Proteção de rotas operacional
- ✅ JWT funcionando
- ✅ Comunicação HTTP/REST funcional

**Código:**

- ✅ TypeScript strict no frontend
- ✅ Async/await no backend
- ✅ Pydantic validando tudo
- ✅ Componentes shared criados
- ✅ apiClient configurado

**Validação:**

- ✅ Testes manuais passando
- ✅ Compilação sem erros
- ✅ Nenhum bloqueio de CORS
- ✅ Logs funcionando

---

**Governança Técnica**  
Engenharia de Software — Stack 003 — Python/FastAPI + Next.js — v1.0

**Responsável:** AGENTE_CRIADOR

**Próximo Playbook:** PLAYBOOK_PIPELINE

---

© 2026 - Documentação Institucional Oficial

- 🚫 Não inventar stack
- 🚫 Não criar feature antes de auth
- 🚫 Não simplificar regras institucionais

---

© 2026 - Documentação Institucional Oficial
