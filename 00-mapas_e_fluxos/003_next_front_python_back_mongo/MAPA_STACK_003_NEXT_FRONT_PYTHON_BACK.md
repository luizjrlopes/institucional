# MAPA_STACK_003_NEXT_FRONT_PYTHON_BACK.md

Stack 003 — Next.js (Frontend) + Python (Backend separado)

**stack_id:** STACK_003_NEXT_FRONT_PYTHON_BACK

**Versão:** v1.1 — Mapa de Stack

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

- Postgres
- MongoDB
- SQLite (protótipos)

Regras mínimas:

- frontend **nunca** acessa banco
- backend concentra toda persistência
- migrations/controle de schema são **obrigatórios** se banco relacional

---

## 5. Dossiês Técnicos Consumidos (Stack)

- Dossiê Institucional — Next Frontend
- Dossiê Backend Python — Stack 003 (quando existir)
- Dossiê Institucional — Regras de Criação

> Esta stack **exige** um dossiê backend próprio para Python. Se não existir, o processo deve **BLOQUEAR** ou marcar a stack como **draft**.

---

## 6. Playbooks Aplicáveis

### 6.1 Playbooks globais

- `PLAYBOOK_PIPELINE` (designer → auditor → refatorador → designer → auditor)

### 6.2 Playbooks específicos da Stack (quando existirem)

- `PLAYBOOK_CRIADOR_FRONT` (Next)
- `PLAYBOOK_CRIADOR_BACK_PY` (Python)
- `PLAYBOOK_AUTH_STACK_003` (auth distribuída)
- `PLAYBOOK_DB_STACK_003` (persistência conforme Brief)

---

## 7. Auth (diretriz de stack)

Como há backend separado, a autenticação **deve explicitar**:

- mecanismo de sessão/token (ex.: JWT + refresh)
- estratégia de expiração e renovação
- como o frontend mantém estado de auth sem violar regras institucionais
- como o backend valida credenciais

O padrão final de autenticação é definido por:

- dossiê backend Python
- playbook de auth da stack
- Brief do Produto (restrições específicas)

---

## 8. Contrato de Integração (Front ↔ Back)

- Frontend consome backend via **HTTP**
- A camada `apiClient` centraliza chamadas
- UI **não** faz fetch direto (usa services/hooks)
- Backend expõe **OpenAPI** como documentação oficial

---

## 9. Critérios de Bloqueio

Bloquear se:

- tentar implementar backend dentro do Next (isso pertence à Stack 001)
- tentar consumir banco diretamente do frontend
- tentar usar documentos técnicos das Stacks 001 ou 002
- banco não for declarado quando necessário

---

## 10. Regra Final

Selecionou `STACK_003` → **Next é exclusivamente frontend**. Backend é **Python separado**, integrado por contrato HTTP documentado.
