# MAPA_STACK_003_NEXT_FRONT_PYTHON_BACK.md

Stack 003 — Next.js (Frontend) + Python (Backend separado)

**stack_id:** STACK_003_NEXT_FRONT_PYTHON_BACK

**Versão:** v1.0 — Mapa de Stack

---

## 1. Objetivo

Este mapa governa a execução técnica quando a stack selecionada for `STACK_003_NEXT_FRONT_PYTHON_BACK`.

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

- Integração: frontend consome backend via **HTTP** (REST)
- Contrato: backend deve expor APIs estáveis e documentadas (OpenAPI)

> Observação institucional: o framework Python final (FastAPI/Flask/Django) pode ser restringido pelo Brief, mas a stack assume FastAPI como padrão recomendado.

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

    - `api/` (routers)
    - `controllers/` (handlers de request, finos)
    - `services/` (regras de aplicação)
    - `repositories/` (acesso a dados)
    - `models/` (modelos de domínio / schemas)
    - `schemas/` (Pydantic DTOs)
    - `core/` (config, settings, logging)
    - `database/` (conexão, sessão, migrations quando aplicável)

  - `tests/`
  - `main.py` (bootstrap)

---

## 4. Banco e Persistência (diretriz)

Esta stack **não fixa banco por padrão**.

O banco deve ser definido no `BRIEF_PRODUTO` (ou em documento de decisão técnica do produto), por exemplo:

- Postgres
- MongoDB
- SQLite (protótipos)

Regras mínimas:

- frontend **nunca** acessa banco
- backend concentra persistência
- migrations/controle de schema devem ser explícitos se banco relacional

---

## 5. Dossiês Técnicos Consumidos (Stack)

- Dossiê Next Frontend (institucional)
- Dossiê Python Backend (Stack 003 — quando existir)
- Regras de Criação (institucional)

> Esta stack exige um dossiê backend próprio para Python. Se não existir, o sistema deve BLOQUEAR ou marcar como draft.

---

## 6. Playbooks Aplicáveis

### 6.1 Playbooks globais

- PLAYBOOK_PIPELINE (designer → auditor → refatorador → designer → auditor)

### 6.2 Playbooks da Stack (quando existirem)

- PLAYBOOK_CRIADOR_FRONT (Next)
- PLAYBOOK_CRIADOR_BACK_PY (Python)
- PLAYBOOK_AUTH_STACK_003 (integração auth entre front/back)
- PLAYBOOK_DB_STACK_003 (banco definido no Brief)

---

## 7. Auth (diretriz de stack)

Como há backend separado, a autenticação deve explicitar:

- mecanismo de sessão/token (ex.: JWT + refresh)
- estratégia de expiração e renovação
- como o frontend mantém estado de auth sem violar regras institucionais
- como o backend valida credenciais

O padrão final deve ser definido por:

- dossiê backend Python
- playbook de auth
- Brief do Produto (restrições específicas)

---

## 8. Contrato de Integração (Front ↔ Back)

- Frontend consome backend via HTTP
- A camada `apiClient` concentra chamadas
- UI não faz fetch direto (usa services/hooks)
- Backend expõe OpenAPI (FastAPI) como documentação

---

## 9. Critérios de Bloqueio

Bloquear se:

- tentar implementar backend dentro do Next (isso é Stack 001)
- tentar consumir DB direto do frontend
- tentar usar documentos técnicos da Stack 001/002
- banco não for declarado quando necessário

---

## 10. Regra Final

Selecionou `STACK_003` → Next é somente frontend. Backend é Python separado.
