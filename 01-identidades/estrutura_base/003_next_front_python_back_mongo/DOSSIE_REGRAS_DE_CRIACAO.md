# Dossiê Institucional

## Regras de Criação de Aplicações — Stack: Next.js (front) + Python (FastAPI) + MongoDB

> Nota terminológica: As "Fases" descritas neste Dossiê são internas ao próprio Dossiê (Fase D\*) e não substituem, nem conflitam com, as "Etapas" operacionais do `FLUXO_ORQUESTRADOR`.

---

### 📋 Metadados

- **Front-end:** Next.js (App Router)
- **Back-end:** Python (FastAPI)
- **Banco:** MongoDB (Motor/Beanie)
- **Versão:** v1.0
- **Status:** Padrão Institucional para stack separada

---

## 📑 Sumário

1. [Objetivo](#1-objetivo)
2. [Escopo](#2-escopo)
3. [Princípios Institucionais](#3-princípios-institucionais)
4. Processo Sequencial (Fases Internas)
5. Regras de Implantação e Dev
6. Critérios de Aceite

---

## 1. Objetivo

Estabelecer regras obrigatórias para criação de aplicações compostas por um frontend Next.js e um backend Python (FastAPI), comunicando via API e persistindo em MongoDB.

---

## 2. Escopo

- Geração automática de skeletons
- Criação de contratos Pydantic/TypeScript
- Scripts de dev (docker-compose para orquestrar front+back+mongo)

---

## 3. Princípios Institucionais

- Contracts-first: definir Pydantic schemas antes de implementar
- Testes de contrato entre front e back (geração de tipos via OpenAPI)
- Deploys independentes e pipelines separados
- Environment parity: dev ≈ staging ≈ prod (com variáveis seguras)

---

## 4. Processo Sequencial (Fases Internas)

### Fase D0 — Preparação

- Criar repositórios e skeletons para front e back
- Criar `docker-compose.dev.yml` com frontend, backend e mongo
- Criar `README` com instruções de setup

### Fase D1 — Estrutura Base

- Frontend: `src/app`, `src/components`, `src/services/api.ts`, `src/styles`
- Backend: `app/api` (FastAPI routers), `app/models` (Pydantic), `app/services`, `app/repos`, `app/db`, `app/core/config.py`

### Fase D2 — Autenticação

- Endpoints: `/auth/login`, `/auth/register`, `/auth/me`, `/auth/logout`
- Front: providers e pages de login/register

### Fase D3 — Páginas de Domínio

- Criar páginas e features por ordem de prioridade

### Fase D4 — Governança

- Testes, CI, análise estática, contratos e deploys

---

## 5. Regras de Implantação e Dev

- Usar `API_BASE_URL` no frontend apontando para backend
- CORS no backend configurado com política mínima (origem do frontend)
- Tokens: preferir cookies HTTP-only; se usar JWT em header, documentar trade-offs
- Scripts:
  - `dev:docker` que sobe front+back+mongo
  - `test:unit` e `test:integration`
- Preferir geração de tipos TypeScript a partir do OpenAPI automático do FastAPI

---

## 6. Critérios de Aceite

- Projeto compila localmente
- `docker-compose.dev.yml` inicia serviços
- Tests unitários e de integração rodando
- Documentação mínima no README para setup
- Contratos Pydantic/TypeScript implementados e testados

---

## Conclusão

Seguir estas regras garante entregas previsíveis e pipelines independentes para frontend e backend Python.

---

© 2026 - Documentação Institucional - Engenharia de Software
