# PLAYBOOK INSTITUCIONAL 01 (Channel 1)

Trecho Oficial — Estrutura Base → Usuário/Auth (100% conforme)

## ETAPA 1 — Montagem da Estrutura Base Institucional (OBRIGATÓRIA)

### 1.0 Pré-etapas operacionais (antes de 1.2)

- **Casca vazia:** criar toda a árvore prevista (frontend/backend) com arquivos vazios suficientes para compilar.
- **Preencher padrões institucionais:** popular apenas os arquivos padrão que são iguais para qualquer projeto (Loading, AlertService, layout com providers, registry, theme/GlobalStyles, api.ts, helpers de erro/resposta/logger). Sem domínio.

### 1.1 Objetivo

Criar toda a estrutura base de Frontend e Backend conforme os dossiês institucionais, sem domínio e sem feature, garantindo compilação e endpoint de saúde.

### 1.2 Entregas obrigatórias (Frontend Base)

Criar exatamente a base institucional:

```code
src/app/
    layout.tsx (Providers globais + estilos globais)
    page.tsx (Home placeholder, sem domínio, sem dados reais)
src/components/ (SOMENTE Shared UI padrão)
    Header/
    Footer/ (se padrão do projeto)
    Modals/
    Loading/
    componentes base de formulário (ex.: Checkbox/, Input/, Button/) se fizerem parte do padrão
src/styles/
    theme.ts
    GlobalStyles.ts (ou equivalente institucional)
src/store/
    Context.ts
    Provider.tsx (incluindo o "esqueleto" do estado de sessão)
src/services/
    api.ts (client HTTP padronizado)
src/utils/
    errors.ts (padrão de erro)
    storage.ts (persistência local quando aplicável)
    alert/response helpers (se institucional)
```

#### Regras obrigatórias (Frontend)

- PROIBIDO criar `src/features/` nesta etapa
- PROIBIDO fazer fetch direto em UI (página/componente)
- PROIBIDO colocar componente específico de domínio em `src/components/`

### 1.3 Entregas obrigatórias (Backend Base — Opção A)

Criar exatamente a base institucional:

```code
src/app/api/health/route.ts (endpoint de saúde)
src/server/config/env.ts (único ponto de leitura/validação de env)
src/server/db/client.ts (conexão MongoDB + Mongoose)
src/server/utils/
    errors.ts
    response.ts
    logger.ts (se institucional)
```

#### Observação sobre mock/data (planejado)

- Definir interfaces de repositório/serviço desde já para permitir um adapter mock (data/) durante a macro fase 2 (produto) antes de conectar ao Mongo Atlas.
- A troca para Mongo deve ocorrer apenas trocando o adapter na factory, sem mudar contratos ou UI/services.

#### Regras obrigatórias (Backend)

- Backend só vive em `src/server/**`
- Rotas HTTP só vivem em `src/app/api/**/route.ts`
- PROIBIDO acessar Mongo/Mongoose diretamente dentro de `route.ts`
- PROIBIDO colocar regra de negócio em `route.ts` (rota é porta de entrada)

### 1.4 Critérios de aceite (Etapa 1)

- ✔ projeto compila
- ✔ `/api/health` responde 200
- ✔ `env.ts` centraliza e valida variáveis obrigatórias (sem `process.env` espalhado)
- ✔ `db/client.ts` configura Mongoose (mesmo sem domínio ainda)

## ETAPA 2 — Usuário e Autenticação (OBRIGATÓRIA até Home vazia protegida)

### 2.1 Objetivo

Implementar a lógica completa de usuário/autenticação, validando o circuito institucional:

cadastrar → logar → acessar Home vazia protegida → deslogar

#### Autenticação institucional fixa

- Sessão via cookie HTTP-only
- Persistência da sessão no MongoDB (collection de sessões ou estratégia equivalente documentada)
- `me` deve refletir o usuário autenticado

### 2.2 Entregas obrigatórias (Backend Auth/User)

#### Camadas obrigatórias (todas)

```code
src/server/models/User.model.ts
src/server/repositories/User.repository.ts
src/server/services/
    Auth.service.ts (regras de autenticação)
    User.service.ts (regras de usuário)
src/server/controllers/
    Auth.controller.ts (adaptador HTTP → domínio)
    User.controller.ts
src/server/validators/
    auth.schemas.ts
```

#### Sessão (persistida)

```code
src/server/models/Session.model.ts (ou equivalente institucional)
src/server/repositories/Session.repository.ts
```

Lógica de criação/validação/expiração em `Auth.service.ts`

#### Rotas HTTP obrigatórias (App Router)

```code
src/app/api/auth/register/route.ts
src/app/api/auth/login/route.ts
src/app/api/auth/logout/route.ts
src/app/api/auth/me/route.ts
src/app/api/auth/forgot-password/route.ts
src/app/api/auth/reset-password/route.ts
```

#### Regras obrigatórias (Backend Auth)

**route.ts apenas:**

- lê request/params/body
- valida entrada (ou chama validator)
- chama controller
- retorna response

**Regras de negócio e segurança** (hash/sessão) somente em services

**Acesso ao banco** somente via repositories

### 2.3 Entregas obrigatórias (Frontend Auth/User)

#### Páginas obrigatórias

```code
src/app/login/page.tsx
src/app/cadastro/page.tsx
src/app/resetarSenha/page.tsx
src/app/perfil/page.tsx (placeholder)
src/app/page.tsx (Home vazia protegida)
```

#### Infra obrigatória

- Provider de sessão em `src/store/Provider.tsx`
- Service de autenticação em `src/services/` (ex.: `auth.service.ts`)
- Proteção de rotas: `middleware.ts` ou HOC/guard institucional (um padrão oficial, consistente)

#### Regras obrigatórias (Frontend Auth)

- UI não chama fetch direto (sempre via services)
- Sessão e usuário atual vivem no Provider
- Home deve bloquear acesso sem sessão válida

### 2.4 Critérios de aceite (Etapa 2)

- ✔ Cadastro cria usuário no MongoDB via Mongoose
- ✔ Login cria sessão persistida no MongoDB e seta cookie HTTP-only
- ✔ `/api/auth/me` retorna usuário autenticado quando cookie válido
- ✔ Home (/) bloqueia usuário não autenticado (redireciona/login)
- ✔ Logout invalida sessão (Mongo) e remove/bloqueia cookie
- ✔ Nenhuma query em `route.ts`
- ✔ Nenhuma regra de negócio fora de services
