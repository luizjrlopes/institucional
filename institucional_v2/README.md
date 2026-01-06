# MAPA_INSTITUCIONAL_CENTRAL.md

Governança Central do Sistema Institucional (Multi-Stack)

**Versão:** v1.0 — Documento Central (Meta)

---

## 1. Objetivo

Este mapa central existe para:

- governar a **ordem de precedência** entre documentos
- definir **papéis** (o que cada documento faz)
- definir **como stacks são selecionadas**
- garantir que agentes executem apenas documentos **compatíveis com a stack selecionada**

Este documento é sempre a autoridade máxima do sistema.

---

## 2. Regra de Ouro — Seleção de Stack

Toda execução do sistema (criação/evolução) deve declarar explicitamente a stack via:

- `BRIEF_PRODUTO.stack_id`

**Sem `stack_id`, o sistema entra em estado BLOQUEADO.**

O `stack_id` selecionado define:

- quais dossiês técnicos são válidos
- quais playbooks técnicos podem ser executados
- qual mapa de stack deve ser seguido

---

## 3. Catálogo Oficial de Stacks

A lista de stacks reconhecidas institucionalmente é:

- **STACK_001_NEXT_FULLSTACK_MONGO**

  - Mapa: `MAPA_STACK_001_NEXT_FULLSTACK_MONGO.md`

- **STACK_002_NEXT_FRONT_NODE_BACK_MONGO**

  - Mapa: `MAPA_STACK_002_NEXT_FRONT_NODE_BACK_MONGO.md`

---

## 4. Hierarquia Oficial de Documentos (Precedência)

Em caso de dúvida, conflito ou ambiguidade, esta ordem deve ser respeitada:

1. **MAPA_INSTITUCIONAL_CENTRAL.md** → governa todo o sistema
2. **MAPA*STACK*<stack_id>.md** → governa a execução técnica da stack selecionada
3. **Dossiês Institucionais (Globais)** → regras imutáveis do sistema (governança, padrões)
4. **Dossiês Técnicos da Stack** → estrutura e decisões técnicas específicas da stack
5. **BRIEF_PRODUTO.md** → identidade mínima do produto + seleção de stack
6. **BIF / Protótipo de Interfaces (HTMLs)** → intenção visual (não normativo)
7. **Passaporte da Aplicação** → plano executável específico do produto
8. **Playbooks (Execução)** → criação/evolução e pipeline
9. **Relatórios (Auditoria/Validação)** → evidências e bloqueios

**Regra explícita:** em caso de divergência entre fluxo e playbooks, **playbooks prevalecem**.

---

## 5. Papéis dos Documentos

### 5.1 Constitucionais (não executáveis)

- MAPA_INSTITUCIONAL_CENTRAL
- MAPA_STACK
- Dossiês

Função: limitar e orientar.

### 5.2 Identidade e Planejamento (não executáveis)

- BRIEF_PRODUTO
- Passaporte

Função: declarar intenção e transformar intenção em plano.

### 5.3 Referência executável (não normativo)

- Protótipo HTML (BIF)

Função: demonstrar intenção visual e relações de UI.

### 5.4 Operacionais (executáveis)

- Playbooks

Função: executar criação/evolução/pipeline.

---

## 6. Regra de Escopo Documental por Stack

Quando uma stack é selecionada (`stack_id`):

- O sistema **só pode usar**:

  - documentos globais
  - documentos da stack selecionada

Qualquer tentativa de usar documento técnico de outra stack resulta em **BLOQUEADO**.

---

## 7. Agentes Institucionais (visão central)

- Orquestrador: aplica este mapa, lê `stack_id`, seleciona mapa de stack
- Criador: executa bootstrap conforme playbooks + dossiês da stack
- Gerador de Protótipo (opcional): cria HTMLs (BIF)
- Gerador de Passaporte: transforma BIF/refs em plano
- Validador de Passaporte: valida consistência institucional
- Evolutor: implementa páginas por passaporte
- F-Designer: normaliza UI
- Auditor: valida tecnicamente
- Refatorador: corrige violações

---

## 8. Fluxo Central (macro)

1. Ler `BRIEF_PRODUTO.stack_id`
2. Carregar `MAPA_STACK_<stack_id>`
3. Executar criação/evolução seguindo playbooks e pipeline
4. Bloquear se houver divergência, decisão pendente, ou documento fora da stack

---

## 9. Regra Final

Nada começa sem `stack_id`.

Nada executa fora do mapa de stack selecionado.

---

---

---

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
