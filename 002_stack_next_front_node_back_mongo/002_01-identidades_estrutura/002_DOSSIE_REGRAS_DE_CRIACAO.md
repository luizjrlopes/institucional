# Dossiê Institucional

## Regras de Criação — Stack 002 (Next.js Frontend + Node.js Backend)

> Nota terminológica: As "Fases" descritas neste Dossiê são internas ao próprio Dossiê (Fase D\*) e não substituem, nem conflitam com, as "Etapas" operacionais do `FLUXO_ORQUESTRADOR`. As Etapas do Fluxo são a referência obrigatória para execução operacional.

---

## OFFICIAL DOC

---

### 📋 Metadados

- **Stack:** Next.js (Frontend) + Node.js (Backend separado) + MongoDB
- **stack_id:** `002_next_front_node_back_mongo`
- **Versão:** v1.0
- **Status:** Documento Institucional Oficial

---

## �️ REGRA SUPREMA 002 - SINCRONIZAÇÃO DE TIPOS

### ⚠️ REGRA CRÍTICA ANTI-ALUCINAÇÃO

**VIOLAÇÃO DESTA REGRA = ERRO DE TIPAGEM EM PRODUÇÃO**

#### Declaração da Regra

```
Qualquer alteração no Backend que mude um JSON de resposta
OBRIGA a atualização IMEDIATA da interface TypeScript correspondente.

Hierarquia de Tipos:
1. Backend define os tipos (source of truth)
2. shared/types/ contém a definição compartilhada
3. Frontend importa APENAS de shared/types/

O apiClient é a ÚNICA fonte de verdade para comunicação HTTP.
```

#### Fluxo Obrigatório de Sincronização

```typescript
// 1. BACKEND: Definir Controller/Service
// backend/src/controllers/UserController.ts
export const getUser = async (req, res) => {
  const user = {
    id: "123",
    name: "John",
    email: "john@example.com",
    createdAt: new Date(),
  };
  res.json(user);
};

// 2. SHARED: Criar interface correspondente
// shared/types/user.types.ts
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface GetUserResponse {
  user: User;
}

// 3. FRONTEND: Importar de shared e usar no apiClient
// frontend/src/services/apiClient.ts
import { User, GetUserResponse } from "@shared/types/user.types";

export const userApi = {
  getUser: async (id: string): Promise<User> => {
    const response = await fetch(`${API_URL}/users/${id}`);
    const data: GetUserResponse = await response.json();
    return data.user;
  },
};

// 4. FRONTEND: Usar tipos do apiClient
// frontend/src/features/user/UserProfile.tsx
import { userApi } from "@/services/apiClient";

export function UserProfile() {
  const [user, setUser] = useState<User | null>(null);
  // ...
}
```

#### Exemplos Proibidos ❌

```typescript
// ❌ ERRADO - Frontend define seus próprios tipos
// frontend/src/types/user.ts (duplicação!)
interface User {
  // Duplicado!
  id: string;
  name: string;
}

// ❌ ERRADO - Fetch sem tipagem
const response = await fetch("/api/users");
const data = await response.json(); // any! 😱

// ❌ ERRADO - Tipos inline
const [user, setUser] = useState<{ id: string; name: string }>(null);
```

#### Exemplos Corretos ✅

```typescript
// ✅ CORRETO - Importar de shared
import { User } from "@shared/types/user.types";

// ✅ CORRETO - apiClient tipado
export const userApi = {
  getUser: (id: string): Promise<User> => apiClient.get<User>(`/users/${id}`),
};

// ✅ CORRETO - Usar tipo do shared
const [user, setUser] = useState<User | null>(null);
```

#### Protocolo de Atualização

Quando alterar um endpoint no Backend:

```markdown
[ ] 1. Alterar Controller/Service no backend
[ ] 2. Atualizar/Criar tipo correspondente em shared/types/
[ ] 3. Atualizar método no apiClient (frontend/src/services/apiClient.ts)
[ ] 4. Verificar se algum componente precisa ser atualizado
[ ] 5. Executar TypeScript check: tsc --noEmit
[ ] 6. Atualizar PASSAPORTE_DE_CRIACAO.md com a mudança
```

#### Checklist de Validação

Antes de commit/push:

- [ ] Todo endpoint do Backend tem tipo em shared/types/
- [ ] apiClient usa tipos de shared/types/
- [ ] Nenhum tipo duplicado entre frontend/backend
- [ ] `tsc --noEmit` passa sem erros
- [ ] Nenhum `any` em respostas de API

#### Auditoria Automática

```bash
# Verificar tipos duplicados
# Se encontrar User tanto em frontend/ quanto shared/ → ERRO

# Verificar uso de any
grep -r ": any" frontend/src/services/
grep -r "as any" frontend/src/services/

# Se retornar resultados → ERRO CRÍTICO
```

#### Estrutura Obrigatória de Tipos

```
projeto/
├── backend/
│   └── src/
│       ├── controllers/  (usa tipos de shared/)
│       └── services/     (usa tipos de shared/)
├── shared/
│   └── types/
│       ├── index.ts      (exporta tudo)
│       ├── api.types.ts  (tipos genéricos de API)
│       ├── user.types.ts
│       ├── auth.types.ts
│       └── [dominio].types.ts
└── frontend/
    └── src/
        ├── services/
        │   └── apiClient.ts  (importa de shared/)
        └── features/
            └── [feature]/    (importa de shared/)
```

---

## �📑 Sumário

1. [Objetivo](#1-objetivo)
2. [Escopo](#2-escopo)
3. [Princípios Institucionais](#3-princípios-institucionais)
4. Processo Sequencial (Fases Internas do Dossiê)
   1. [Fase D0 — Preparação Institucional](#fase-d0--preparação-institucional)
   2. [Fase D1 — Estrutura Base](#fase-d1--estrutura-base)
   3. [Fase D2 — Usuário e Autenticação](#fase-d2--usuário-e-autenticação)
   4. [Fase D3 — Páginas de Domínio](#fase-d3--páginas-de-domínio)
5. Finalização
   1. [Regras Institucionais de Decisão](#9-regras-institucionais-de-decisão)
   2. [Critério de Conformidade](#10-critério-de-conformidade)

---

## 1. Objetivo

Este documento estabelece o processo institucional **obrigatório** para criação de aplicações utilizando a Stack 002: frontend Next.js separado comunicando-se via HTTP com backend Node.js/Express independente.

### Benefícios

- ✓ Separação clara entre frontend e backend
- ✓ Deploys independentes
- ✓ Escalabilidade horizontal
- ✓ Base arquitetural sólida

## 2. Escopo

- `/002_04-agentes` Qualquer agente automatizado responsável por gerar código.
- `/002_03-passaporte_de_criacao` Qualquer evolução estrutural relevante (novos módulos, grandes features).

## 3. Princípios Institucionais

### Camadas

Separação explícita entre frontend e backend como **aplicações independentes**.

### Contratos HTTP

Frontend e backend se comunicam **exclusivamente** via REST API com contratos tipados.

### Backend 1st Class

Backend Node.js tratado como aplicação completa e independente.

### UI por Domínio

UI orientada a domínio, não a telas soltas.

### Reuso Consciente

Shared ≠ genérico por conveniência.

### Ordem & Método

Ordem de criação mais importante que velocidade inicial.

---

## Fase D0 — Preparação Institucional

**Número interno do Dossiê:** `D0`

### 4.1 Objetivo

Estabelecer decisões tecnológicas e estruturais antes de iniciar a implementação.

### 4.2 Decisões Obrigatórias (Padrão Institucional Fixo)

| Aspecto             | Definição                      |
| ------------------- | ------------------------------ |
| **Frontend**        | Next.js (App Router)           |
| **Backend**         | Node.js + Express (TypeScript) |
| **Comunicação**     | REST API via HTTP              |
| **Banco**           | MongoDB / Mongoose             |
| **Estilo Frontend** | Styled Components              |
| **Deploy**          | Separado (frontend e backend)  |

> **Nota institucional obrigatória:** O MongoDB (com Mongoose) é o alvo institucional de persistência em produção. Durante a Fase MOC (fase de construção/integração com MOCs), NENHUMA base de dados externa deve ser utilizada como fonte primária de dados; os MOCs residem exclusivamente em `data/` (frontend) e são a fonte de verdade até a migração explícita. Sobre a estilização, pode apenas com styled Components, estilo inline é proibido. o uso de tailwind é proibido.

#### UI / Componentização (Frontend)

- **Shared UI:** `src/components/` (Header, Footer, Modals, Loading, Base Form)
- **Feature UI:** `src/features/<dominio>` (Obrigatório)
- **Promoção para Shared:** Somente após 2+ páginas de uso real

#### Autenticação Distribuída

- JWT (access + refresh tokens)
- Frontend armazena tokens de forma segura
- Backend valida e renova tokens
- Endpoints: login, register, logout, me, reset/forgot password

#### Camadas Backend (Node.js)

```text
routes → controllers → services → repositories → models
```

### ✅ CRITÉRIO DE ACEITE DA FASE D0

**✓** Estrutura documental criada e validada

---

## Fase D1 — Estrutura Base

**Número interno do Dossiê:** `D1`

### 5.1 Objetivo

Criar a estrutura mínima de **dois projetos separados**: frontend Next.js e backend Node.js.

### 5.2 Frontend — Base

```text
frontend/
  src/
    app/
      layout.tsx
      page.tsx
    components/ (Shared somente)
    features/
    lib/
      api.ts (apiClient)
    styles/
    store/
    utils/
```

**Implementação:**

- Criar casca dos arquivos essenciais
- Configurar providers básicos
- Implementar `apiClient` para comunicação com backend
- Configurar theme/GlobalStyles

### 5.3 Backend — Base

```text
backend/
  src/
    routes/
      health.route.ts
    controllers/
    services/
    repositories/
    models/
    database/
      client.ts
    config/
      env.ts
    utils/
      errors.ts
      response.ts
      logger.ts
    server.ts
```

**Implementação:**

- Estrutura Express com TypeScript
- Configuração de CORS
- Endpoint `/health` funcional
- Configuração de variáveis de ambiente
- Logger básico

**Nota operacional sobre `database/client.ts` e Mongoose:**

O arquivo `database/client.ts` poderá conter a configuração estrutural (esqueleto) do cliente Mongo/Mongoose, mas durante a Fase MOC ele NÃO deve estabelecer conexões ativas nem ser usado como fonte primária de dados. Enquanto durar a Fase MOC, os MOCs em `data/` são a fonte oficial de verdade e o MongoDB só será utilizado como tal na Fase 4 — Transição para Produção.

### ✅ CRITÉRIOS DE ACEITE DA FASE D1

- ✓ Frontend compila e roda
- ✓ Backend compila e roda
- ✓ `/api/health` do backend responde
- ✓ Frontend consegue chamar backend via `apiClient`
- ✓ CORS configurado corretamente
- ✓ ENV centralizado em ambos projetos

---

## Fase D2 — Usuário e Autenticação

**Número interno do Dossiê:** `D2`

### 6.1 Objetivo

Validar integração completa front ↔ back, com login funcional até uma home vazia protegida.

### 6.2 Backend — Usuário/Auth

**CAMADAS:**

- `models/User.model.ts` - Schema Mongoose
- `repositories/User.repository.ts` - Acesso a dados
- `services/Auth.service.ts` - Lógica de autenticação
- `controllers/Auth.controller.ts` - Handlers HTTP
- `validators/Auth.validator.ts` - Validação de entrada

**ROTAS:**

```text
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
POST /api/auth/forgot-password
POST /api/auth/reset-password
POST /api/auth/refresh
```

**MIDDLEWARES:**

- `authenticate.middleware.ts` - Valida JWT

### 6.3 Frontend — Autenticação

**PÁGINAS:**

- `/login` - Tela de login
- `/register` - Tela de cadastro
- `/forgot-password` - Recuperação de senha
- `/reset-password` - Redefinição de senha
- `/` - Home protegida (vazia)

**INFRA:**

- `lib/api.ts` - apiClient com interceptors para tokens
- `store/AuthContext.tsx` - Provider de sessão
- `hooks/useAuth.ts` - Hook de autenticação
- Middleware de proteção de rotas

### ✅ Validação da Etapa 2

- ✓ Página inicial é a página de login
- ✓ Pela página login se pode chegar a página register e forgot-password
- ✓ Usuário consegue cadastrar e logar
- ✓ Usuário pode acessar com o usuário root - email: <admin@exemplo.com> e senha admin
- ✓ Usuário acessa home vazia autenticada com placeholder
- ✓ Logout funcional e sessão persistente
- ✓ Comunicação front ↔ back validada via HTTP
- ✓ Tokens refresh funcionando

---

## Fase D3 — Páginas de Domínio

**Número interno do Dossiê:** `D3`

### 7.1 Objetivo

Implementar páginas do produto consumindo dados via API.

### 7.2 Ordem de criação por página

**BACKEND PRIMEIRO:**

1. Criar model (se necessário)
2. Criar repository
3. Criar service
4. Criar controller
5. Criar rota
6. Testar endpoint

**FRONTEND DEPOIS:**

1. Criar rota em `app/<pagina>/page.tsx`
2. Criar feature folder `features/<pagina>/`
3. Criar componentes UI
4. Integrar com apiClient

### 7.3 Regras de Reuso

⚠️ **ATENÇÃO:**

- Shared cresce apenas com reuso real (2+ páginas)
- Componentes específicos ficam na feature
- Modal, Header, Footer e Loading são sempre shared
- **PROIBIDO:** Fetch direto em componente de UI
- **OBRIGATÓRIO:** Usar apiClient centralizado

### ✅ DEFINIÇÃO DE "PÁGINA FINALIZADA"

| Critério Frontend                | Status |
| -------------------------------- | ------ |
| Rota acessível                   | ✓      |
| UI renderiza corretamente        | ✓      |
| Estados loading/erro tratados    | ✓      |
| apiClient usado para comunicação | ✓      |
| Componentes classificados        | ✓      |
| Padrão visual respeitado         | ✓      |

| Critério Backend     | Status |
| -------------------- | ------ |
| Endpoint funcional   | ✓      |
| Camadas respeitadas  | ✓      |
| Validação de entrada | ✓      |
| Tratamento de erros  | ✓      |
| Logs apropriados     | ✓      |

---

## 9. Regras Institucionais de Decisão

### Quando algo é Shared? (Frontend)

Estrutural ou usado em 2+ páginas.

### Quando algo é Feature? (Frontend)

Domínio específico, não reutilizável genericamente.

### Onde fica a lógica?

| Tipo             | Localização                     |
| ---------------- | ------------------------------- |
| Regra de negócio | Backend: `services`             |
| Acesso a dados   | Backend: `repositories`         |
| HTTP handler     | Backend: `controllers + routes` |
| UI               | Frontend: `app + features`      |
| Estado global    | Frontend: apenas quando global  |
| Comunicação API  | Frontend: `lib/api.ts`          |

---

## 10. Critério de Conformidade

### Uma aplicação está em conformidade quando

- ✅ Frontend e backend em projetos separados
- ✅ Todas as etapas seguidas
- ✅ Nenhuma camada misturada
- ✅ Frontend não acessa banco diretamente
- ✅ Backend expõe APIs REST documentadas
- ✅ Contratos tipados entre front e back
- ✅ CORS configurado adequadamente
- ✅ Autenticação JWT funcional
- ✅ Documentação acompanha código
- ✅ Ordem de criação respeitada

---

## 11. Conclusão

Este documento transforma a criação de aplicações com frontend e backend separados em um processo institucional previsível, replicável por humanos ou agentes automatizados. Ele prioriza sustentabilidade técnica, clareza arquitetural e crescimento controlado.

---

### 📊 Status Institucional

## Homologado & Mandatório

**Governança Técnica**  
Engenharia de Software — Stack 002 — v1.0

---

© 2026 - Documentação Institucional Oficial - Padronização de Processos Stack 002
