# MAPA_STACK_001_NEXT_FULLSTACK_MONGO.md

Stack 001 — Next.js Fullstack (App Router) + MongoDB (Mongoose)

**stack_id:** STACK_001_NEXT_FULLSTACK_MONGO

**Versão:** v1.0 — Mapa de Stack

---

## 1. Objetivo

Este mapa governa a execução técnica quando a stack selecionada for `STACK_001_NEXT_FULLSTACK_MONGO`.

---

## 2. Decisões Imutáveis da Stack

- Frontend: **Next.js (App Router)**
- Backend: **Next.js (Route Handlers / Server Actions quando aplicável)**
- Banco: **MongoDB**
- ODM: **Mongoose**
- Integração: camada de **services** e **repositories** (sem fetch direto na UI)

---

## 3. Estrutura Técnica Oficial (alto nível)

- `src/app/` → rotas e layouts
- `src/components/` → Shared UI (padrão)
- `src/features/` → Feature UI (por domínio)
- `src/lib/` → utilitários, clients, helpers
- `src/server/` → backend interno (camadas)

  - `database/` (conexão)
  - `models/` (schemas)
  - `repositories/` (acesso a dados)
  - `services/` (regras de aplicação)
  - `controllers/` (orquestração HTTP)
  - `routes/` (route handlers por domínio)

---

## 4. Dossiês Técnicos Consumidos (Stack)

- Dossiê Next Frontend (padrão institucional)
- Dossiê Next Backend (padrão institucional)
- Regras de Criação (institucional)

> Se algum dossiê estiver em múltiplas versões, esta stack deve apontar explicitamente a versão canônica.

---

## 5. Playbooks Aplicáveis

### 5.1 Playbooks globais (sempre)

- PLAYBOOK_PIPELINE (designer → auditor → refatorador → designer → auditor)

### 5.2 Playbooks da Stack (quando existirem)

- PLAYBOOK_CRIADOR (Stack 001)
- PLAYBOOK_AUTH (Stack 001)
- PLAYBOOK_DB_MONGO (Stack 001)

---

## 6. Auth (diretriz de stack)

A autenticação deve seguir o padrão institucional definido nos dossiês e no playbook de auth.

Regras mínimas:

- sessão/token conforme decisão do Brief (se existir)
- persistência de autenticação deve ser compatível com Next
- rotas protegidas devem usar guard institucional

---

## 7. Contrato de Backend (diretriz)

- UI não acessa banco diretamente
- route handlers chamam controllers
- controllers chamam services
- services chamam repositories
- repositories usam models (mongoose)

---

## 8. Critérios de Bloqueio

Bloquear se:

- tentar executar backend externo (Express/FastAPI)
- tentar usar ORM/DB fora do padrão (ex.: Prisma/Postgres)
- tentar usar documentos da Stack 002

---

## 9. Regra Final

Selecionou `STACK_001` → tudo deve existir e ser executado **dentro do Next**.

---

---

---
