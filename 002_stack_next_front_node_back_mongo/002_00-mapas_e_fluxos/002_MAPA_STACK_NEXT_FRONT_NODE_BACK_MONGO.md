# 002_MAPA_STACK_NEXT_FRONT_NODE_BACK_MONGO.md

Stack 002 — Next.js (Frontend) + Node.js (Backend separado) + MongoDB

**stack_id:** `002_next_front_node_back_mongo`

**Versão:** v1.0 — Mapa de Stack

---

## 1. Objetivo

Este mapa governa a execução técnica quando a stack selecionada for `002_next_front_node_back_mongo`.

Ele define:

- decisões imutáveis desta stack
- estrutura técnica esperada (frontend e backend separados)
- contratos de integração entre frontend e backend
- critérios de bloqueio

---

## 2. Decisões Imutáveis da Stack

- Frontend: **Next.js (App Router)**
- Backend: **Node.js (API separada)**

  - Padrão recomendado: **Express + TypeScript** (ou Fastify + TS, se institucionalmente definido)

- Banco: **MongoDB**
- ODM: **Mongoose**
- Integração: frontend consome backend via **HTTP** (REST)

---

## 3. Estrutura Técnica Oficial (alto nível)

### 3.1 Frontend (Next)

- `src/app/` → rotas e layouts
- `src/components/` → Shared UI
- `src/features/` → Feature UI
- `src/lib/` → clients (ex.: apiClient), helpers

### 3.2 Backend (Node separado)

- `backend/` (ou repositório separado, conforme decisão institucional)

  - `database/` (conexão)
  - `models/` (schemas Mongoose)
  - `repositories/` (acesso a dados)
  - `services/` (regras de aplicação)
  - `controllers/` (handlers HTTP)
  - `routes/` (definição de rotas Express)
  - `index.js` ou `server.js` (bootstrap do servidor)

---

## 4. Dossiês Técnicos Consumidos (Stack)

- Dossiê Next Frontend (institucional)
- Dossiê Node Backend (Stack 002 — específico)
- Regras de Criação (Stack 002)

> Esta stack exige um dossiê backend próprio para Node. Se não existir, o sistema deve BLOQUEAR ou marcar como draft.

---

## 5. Playbooks Aplicáveis

### 5.1 Playbooks globais

- PLAYBOOK_PIPELINE (visual + auditoria + refatoração)

### 5.2 Playbooks da Stack

- PLAYBOOK_CRIADOR_FRONT (Next)
- PLAYBOOK_CRIADOR_BACK (Node)
- PLAYBOOK_AUTH_STACK_002 (integração de auth entre front/back)
- PLAYBOOK_DB_MONGO (Node + Mongoose)

---

## 6. Auth (diretriz de stack)

Como há backend separado, a autenticação deve explicitar:

- mecanismo de sessão/token (JWT recomendado)
- como o frontend armazena o estado de auth (sem violar regras institucionais)
- como o backend valida credenciais
- estratégia de refresh/expiração

O padrão final deve ser definido por:

- dossiê backend da stack
- playbook de auth
- Brief do Produto (se precisar restringir)

---

## 7. Contrato de Integração (Front ↔ Back)

- Frontend **não** acessa banco
- Frontend consome backend via HTTP
- A camada `apiClient` deve concentrar chamadas
- UI não faz fetch direto (usa services/hooks)
- Backend expõe APIs REST documentadas
- Versionamento de API quando necessário (`/api/v1`, `/api/v2`)

---

## 8. Critérios de Bloqueio

Bloquear se:

- backend for criado dentro do Next (isso é Stack 001)
- frontend acessar DB diretamente
- documentos da Stack 001 forem usados para Stack 002
- tentativa de usar Prisma ou outro ORM não autorizado

---

## 9. Regra Final

Frontend e backend são **separados**, integrados por contrato HTTP.

Selecionou `STACK_002` → frontend e backend devem ser projetos distintos com comunicação via REST API.

---
