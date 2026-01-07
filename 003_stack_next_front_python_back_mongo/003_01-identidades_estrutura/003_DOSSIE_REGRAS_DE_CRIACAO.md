# Dossiê Institucional

## Regras de Criação — Stack 003 (Next.js Frontend + Python Backend)

> Nota terminológica: As "Fases" descritas neste Dossiê são internas ao próprio Dossiê (Fase D\*) e não substituem, nem conflitam com, as "Etapas" operacionais do `FLUXO_ORQUESTRADOR`. As Etapas do Fluxo são a referência obrigatória para execução operacional.

---

## OFFICIAL DOC

---

### 📋 Metadados

- **Stack:** Next.js (Frontend) + Python/FastAPI (Backend separado) + MongoDB
- **stack_id:** `003_next_front_python_back_mongo`
- **Versão:** v1.1
- **Status:** Documento Institucional Oficial

---

## 📑 Sumário

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

Este documento estabelece o processo institucional **obrigatório** para criação de aplicações utilizando a Stack 003: frontend Next.js separado comunicando-se via HTTP com backend Python/FastAPI independente.

### Benefícios

- ✓ Separação clara entre frontend e backend
- ✓ Deploys independentes
- ✓ Possibilidade de usar bibliotecas Python (ML, Data Science)
- ✓ APIs autodocumentadas (OpenAPI)
- ✓ Base arquitetural sólida

## 2. Escopo

- `/003_04-agentes` Qualquer agente automatizado responsável por gerar código.
- `/003_03-passaporte_de_criacao` Qualquer evolução estrutural relevante (novos módulos, grandes features).

## 3. Princípios Institucionais

### Camadas

Separação explícita entre frontend e backend como **aplicações independentes**.

### Contratos HTTP

Frontend e backend se comunicam **exclusivamente** via REST API com contratos tipados (OpenAPI/Pydantic).

### Backend 1st Class

Backend Python/FastAPI tratado como aplicação completa e independente.

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
| **Backend**         | Python + FastAPI               |
| **Comunicação**     | REST API via HTTP (OpenAPI)    |
| **Banco**           | MongoDB (ou definido no Brief) |
| **Estilo Frontend** | Styled Components              |
| **Deploy**          | Separado (frontend e backend)  |
| **Python Version**  | Python 3.11+                   |

> **Nota institucional obrigatória:** O MongoDB é o banco recomendado, mas pode ser substituído por Postgres ou SQLite conforme definido no `BRIEF_PRODUTO`. Durante a Fase MOC (fase de construção/integração com MOCs), NENHUMA base de dados externa deve ser utilizada como fonte primária de dados; os MOCs residem exclusivamente em `data/` (frontend) e são a fonte de verdade até a migração explícita. Sobre a estilização, pode apenas com styled Components, estilo inline é proibido. o uso de tailwind é proibido.

#### UI / Componentização (Frontend)

- **Shared UI:** `src/components/` (Header, Footer, Modals, Loading, Base Form)
- **Feature UI:** `src/features/<dominio>` (Obrigatório)
- **Promoção para Shared:** Somente após 2+ páginas de uso real

#### Autenticação Distribuída

- JWT (access + refresh tokens)
- Frontend armazena tokens de forma segura
- Backend valida e renova tokens (Python/JWT)
- Endpoints: login, register, logout, me, reset/forgot password

#### Camadas Backend (Python/FastAPI)

```text
routers → controllers → services → repositories → models
```

### ✅ CRITÉRIO DE ACEITE DA FASE D0

**✓** Estrutura documental criada e validada

---

## Fase D1 — Estrutura Base

**Número interno do Dossiê:** `D1`

### 5.1 Objetivo

Criar a estrutura mínima de **dois projetos separados**: frontend Next.js e backend Python/FastAPI.

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
  app/
    api/
      __init__.py
    controllers/
      __init__.py
    services/
      __init__.py
    repositories/
      __init__.py
    models/
      __init__.py
    schemas/
      __init__.py
    core/
      config.py
      security.py
    database/
      client.py
    utils/
      errors.py
      response.py
      logger.py
  tests/
  main.py
  requirements.txt
```

**Implementação:**

- Estrutura FastAPI
- Configuração de CORS
- Endpoint `/health` funcional
- Documentação OpenAPI automática
- Configuração de variáveis de ambiente (pydantic-settings)
- Logger básico

**Nota operacional sobre `database/client.py` e MongoDB:**

O arquivo `database/client.py` poderá conter a configuração estrutural (esqueleto) do cliente MongoDB (Motor/PyMongo), mas durante a Fase MOC ele NÃO deve estabelecer conexões ativas nem ser usado como fonte primária de dados. Enquanto durar a Fase MOC, os MOCs em `data/` são a fonte oficial de verdade e o MongoDB só será utilizado como tal na Fase 4 — Transição para Produção.

### ✅ CRITÉRIOS DE ACEITE DA FASE D1

- ✓ Frontend compila e roda
- ✓ Backend roda (uvicorn)
- ✓ `/health` do backend responde
- ✓ `/docs` (Swagger) acessível
- ✓ Frontend consegue chamar backend via `apiClient`
- ✓ CORS configurado corretamente
- ✓ ENV centralizado em ambos projetos
- ✓ requirements.txt com dependências mínimas

---

## Fase D2 — Usuário e Autenticação

**Número interno do Dossiê:** `D2`

### 6.1 Objetivo

Validar integração completa front ↔ back, com login funcional até uma home vazia protegida.

### 6.2 Backend — Usuário/Auth

**CAMADAS:**

- `models/user.py` - Modelo de domínio
- `schemas/user.py` - DTOs Pydantic (UserCreate, UserResponse, Token)
- `repositories/user_repository.py` - Acesso a dados
- `services/auth_service.py` - Lógica de autenticação
- `controllers/auth_controller.py` - Handlers (opcional, pode ser direto no router)
- `api/routes/auth.py` - Routers FastAPI

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

**DEPENDENCIES:**

- `core/security.py` - JWT encoding/decoding, password hashing
- `api/dependencies.py` - Dependency para validar JWT (get_current_user)

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
- ✓ OpenAPI docs mostrando endpoints de auth

---

## Fase D3 — Páginas de Domínio

**Número interno do Dossiê:** `D3`

### 7.1 Objetivo

Implementar páginas do produto consumindo dados via API.

### 7.2 Ordem de criação por página

**BACKEND PRIMEIRO:**

1. Criar schema Pydantic (DTOs)
2. Criar model (se necessário)
3. Criar repository
4. Criar service
5. Criar router com endpoints
6. Testar via `/docs` (Swagger)

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
- **OBRIGATÓRIO:** DTOs Pydantic para validação

### ✅ DEFINIÇÃO DE "PÁGINA FINALIZADA"

| Critério Frontend                | Status |
| -------------------------------- | ------ |
| Rota acessível                   | ✓      |
| UI renderiza corretamente        | ✓      |
| Estados loading/erro tratados    | ✓      |
| apiClient usado para comunicação | ✓      |
| Componentes classificados        | ✓      |
| Padrão visual respeitado         | ✓      |

| Critério Backend                | Status |
| ------------------------------- | ------ |
| Endpoint funcional              | ✓      |
| Schemas Pydantic definidos      | ✓      |
| Camadas respeitadas             | ✓      |
| Validação automática (Pydantic) | ✓      |
| Tratamento de erros             | ✓      |
| Documentado no OpenAPI          | ✓      |

---

## 9. Regras Institucionais de Decisão

### Quando algo é Shared? (Frontend)

Estrutural ou usado em 2+ páginas.

### Quando algo é Feature? (Frontend)

Domínio específico, não reutilizável genericamente.

### Onde fica a lógica?

| Tipo              | Localização                    |
| ----------------- | ------------------------------ |
| Regra de negócio  | Backend: `services`            |
| Acesso a dados    | Backend: `repositories`        |
| HTTP handler      | Backend: `routers`             |
| Validação entrada | Backend: `schemas` (Pydantic)  |
| UI                | Frontend: `app + features`     |
| Estado global     | Frontend: apenas quando global |
| Comunicação API   | Frontend: `lib/api.ts`         |

---

## 10. Critério de Conformidade

### Uma aplicação está em conformidade quando

- ✅ Frontend e backend em projetos separados
- ✅ Todas as etapas seguidas
- ✅ Nenhuma camada misturada
- ✅ Frontend não acessa banco diretamente
- ✅ Backend expõe APIs REST documentadas (OpenAPI)
- ✅ DTOs Pydantic para todos os endpoints
- ✅ Type hints Python em todo código
- ✅ CORS configurado adequadamente
- ✅ Autenticação JWT funcional
- ✅ Documentação acompanha código
- ✅ Ordem de criação respeitada
- ✅ Tests básicos implementados

---

## 11. Conclusão

Este documento transforma a criação de aplicações com frontend Next.js e backend Python/FastAPI em um processo institucional previsível, replicável por humanos ou agentes automatizados. Ele prioriza sustentabilidade técnica, clareza arquitetural, typesafety e crescimento controlado.

---

### 📊 Status Institucional

## Homologado & Mandatório

**Governança Técnica**  
Engenharia de Software — Stack 003 — v1.1

---

© 2026 - Documentação Institucional Oficial - Padronização de Processos Stack 003
