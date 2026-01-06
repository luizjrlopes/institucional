# MAPA_STACK_002_NEXT_FRONT_NODE_BACK_MONGO.md

Stack 002 — Next.js (Frontend) + Node.js (Backend separado) + MongoDB

**stack_id:** STACK_002_NEXT_FRONT_NODE_BACK_MONGO

**Versão:** v1.0 — Mapa de Stack

---

## 1. Objetivo

Este mapa governa a execução técnica quando a stack selecionada for `STACK_002_NEXT_FRONT_NODE_BACK_MONGO`.

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
  - `models/` (schemas)
  - `repositories/`
  - `services/`
  - `controllers/`
  - `routes/`
  - `index/` (bootstrap do servidor)

---

## 4. Dossiês Técnicos Consumidos (Stack)

- Dossiê Next Frontend (institucional)
- Dossiê Node Backend (Stack 002 — quando existir)
- Regras de Criação (institucional)

> Esta stack exige um dossiê backend próprio para Node. Se não existir, o sistema deve BLOQUEAR ou marcar como draft.

---

## 5. Playbooks Aplicáveis

### 5.1 Playbooks globais

- PLAYBOOK_PIPELINE (visual + auditoria + refatoração)

### 5.2 Playbooks da Stack

- PLAYBOOK_CRIADOR_FRONT (Next)
- PLAYBOOK_CRIADOR_BACK (Node)
- PLAYBOOK_AUTH_STACK_002 (integração de auth entre front/back)
- PLAYBOOK_DB_MONGO (Node)

---

## 6. Auth (diretriz de stack)

Como há backend separado, a autenticação deve explicitar:

- mecanismo de sessão/token
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

---

## 8. Critérios de Bloqueio

Bloquear se:

- tentar implementar backend dentro do Next (isso é Stack 001)
- tentar consumir DB direto do frontend
- tentar usar documentos técnicos da Stack 001

---

## 9. Regra Final

Selecionou `STACK_002` → Next é somente frontend. Backend é Node separado.
