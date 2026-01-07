# 003_MAPA_STACK_NEXT_FRONT_PYTHON_BACK_MONGO.md

Stack 003 — Next.js (Frontend) + Python (Backend separado) + MongoDB

**stack_id:** `003_next_front_python_back_mongo`

**Versão:** v1.1 — Mapa de Stack

---

## 1. Objetivo

Este mapa governa a execução técnica quando a stack selecionada for `003_next_front_python_back_mongo`.

Ele define:

- decisões imutáveis desta stack
- estrutura técnica esperada
- contratos de integração entre frontend e backend
- critérios de bloqueio

---

## 2. Decisões Imutáveis da Stack

- Frontend: **Next.js (App Router)**
- Backend: **Python (API separada)**

  - Padrão recomendado: **FastAPI**

- Banco: **MongoDB** (ou definido no Brief)
- Integração: frontend consome backend via **HTTP** (REST)
- Contrato: backend deve expor APIs estáveis e documentadas (**OpenAPI**)

> Observação institucional: o framework Python final (FastAPI / Flask / Django) pode ser restringido pelo **Brief do Produto**. Na ausência de restrição explícita, **FastAPI é o padrão obrigatório**.

---

## 3. Estrutura Técnica Oficial (alto nível)

### 3.1 Frontend (Next)

- `src/app/` → rotas e layouts
- `src/components/` → Shared UI
- `src/features/` → Feature UI
- `src/lib/` → clients (ex.: `apiClient`), helpers

### 3.2 Backend (Python separado)

- `backend/` (ou repositório separado, conforme decisão institucional)

  - `app/`

    - `api/` → routers (HTTP)
    - `controllers/` → handlers de request (finos)
    - `services/` → regras de aplicação
    - `repositories/` → acesso a dados
    - `models/` → modelos de domínio
    - `schemas/` → DTOs (Pydantic)
    - `core/` → config, settings, logging
    - `database/` → conexão, sessão, migrations (quando aplicável)

  - `tests/`
  - `main.py` → bootstrap da aplicação

---

## 4. Banco e Persistência (diretriz)

Esta stack **não fixa banco por padrão**.

O banco **deve ser definido obrigatoriamente** no `BRIEF_PRODUTO` (ou em documento formal de decisão técnica do produto), por exemplo:

- MongoDB (padrão recomendado)
- Postgres
- SQLite (protótipos)

Regras mínimas:

- frontend **nunca** acessa banco
- backend concentra toda persistência
- migrations/controle de schema são **obrigatórios** se banco relacional

---

## 5. Dossiês Técnicos Consumidos (Stack)

- Dossiê Institucional — Next Frontend
- Dossiê Backend Python — Stack 003 (específico)
- Dossiê Institucional — Regras de Criação

> Esta stack **exige** um dossiê backend próprio para Python. Se não existir, o processo deve **BLOQUEAR** ou marcar a stack como **draft**.

---

## 6. Playbooks Aplicáveis

### 6.1 Playbooks globais

- `PLAYBOOK_PIPELINE` (designer → auditor → refatorador → designer → auditor)

### 6.2 Playbooks da Stack

- `PLAYBOOK_CRIADOR_FRONT` (Next)
- `PLAYBOOK_CRIADOR_BACK` (Python/FastAPI)
- `PLAYBOOK_AUTH_STACK_003` (integração auth distribuída)
- `PLAYBOOK_DB` (configuração de banco)

---

## 7. Auth (diretriz de stack)

Autenticação distribuída entre frontend e backend:

- Mecanismo: **JWT** (access + refresh) ou sessão compatível
- Backend: endpoints `/auth/login`, `/auth/refresh`, `/auth/logout`, `/auth/me`
- Frontend: armazenar estado de auth sem violar regras institucionais (evitar `localStorage` para tokens long-lived)
- Guards de rota no Next (middleware/layouts protegidos)

---

## 8. Contrato de Integração (Front ↔ Back)

1. **Frontend não acessa banco**
2. Toda integração via `apiClient` (HTTP)
3. Backend expõe contratos estáveis documentados (OpenAPI)
4. Versionar APIs quando necessário (`/v1`, `/v2`)
5. DTOs (Pydantic) para validação de entrada/saída
6. Nunca expor modelos internos diretamente nas respostas

---

## 9. Critérios de Bloqueio

Bloquear se:

- backend for implementado dentro do Next (isso é Stack 001)
- frontend acessar banco diretamente
- documentos de outras stacks forem usados incorretamente
- tentativa de usar ORM não autorizado

---

## 10. Regra Final

Frontend e backend são **separados**, integrados por contrato HTTP.

Selecionou `STACK_003` → frontend Next.js + backend Python/FastAPI como projetos distintos.

---
