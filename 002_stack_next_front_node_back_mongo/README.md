# 002_STACK_NEXT_FRONT_NODE_BACK_MONGO

**Stack 002** — Next.js Frontend + Node.js/Express Backend + MongoDB  
**Versão:** v1.0 — Documentação Completa  
**Status:** ✅ COMPLETO

---

## Visão Geral

Stack de desenvolvimento para aplicações com **frontend e backend separados**, comunicando-se via HTTP/REST.

### Tecnologias Core

**Frontend:**

- Next.js 15 (App Router)
- TypeScript
- Styled Components
- React Hook Form + Zod

**Backend:**

- Node.js
- Express
- TypeScript
- Mongoose
- JWT (autenticação)

**Banco:**

- MongoDB

---

## Estrutura Completa

```
002_stack_next_front_node_back_mongo/
│
├── 002_00-mapas_e_fluxos/
│   └── 002_MAPA_STACK_NEXT_FRONT_NODE_BACK_MONGO.md
│
├── 002_01-identidades_estrutura/
│   ├── 002_DOSSIE_REGRAS_DE_CRIACAO.md
│   ├── 002_DOSSIE_NEXT_FRONTEND.md
│   └── 002_DOSSIE_NODE_BACKEND.md
│
├── 002_02-playbooks/
│   ├── Readme.md
│   ├── 002_PLAYBOOK_CRIADOR.md
│   ├── 002_PLAYBOOK_PIPELINE.md
│   ├── 002_PLAYBOOK_AUDITOR.md
│   ├── 002_PLAYBOOK_F_DESIGNER.md
│   ├── 002_PLAYBOOK_REFATORADOR.md
│   └── 002_PLAYBOOK_EVOLUTOR.md
│
├── 002_03-passaporte_de_criacao/
│   └── [PASSAPORTE_DA_CRIACAO.md] (gerado)
│
├── 002_04-agentes/
│   ├── 002_AGENTE_CRIADOR.md
│   ├── 002_AGENTE_AUDITOR.md
│   ├── 002_AGENTE_F_DESIGNER.md
│   ├── 002_AGENTE_REFATORADOR.md
│   ├── 002_AGENTE_EVOLUTOR.md
│   ├── 002_AGENTE_GERADOR_PASSAPORTE_DA_CRIACAO.md
│   ├── 002_AGENTE_VALIDADOR_PASSAPORTE_DA_CRIACAO.md
│   ├── 002_AGENTE_GERADOR_PASSAPORTE_DO_PRODUTO.md
│   └── 002_AGENTE_VALIDADOR_PASSAPORTE_DO_PRODUTO.md
│
└── 002_05-referencias-etapa-criacao-estrutura/
    └── [exemplos de código]
```

---

## Diferencial da Stack 002

### vs Stack 001 (Fullstack Monolítico)

**Stack 001:** Backend dentro do Next.js (API Routes)  
**Stack 002:** Backend separado em projeto Node.js/Express

### Vantagens

- ✅ Escalabilidade independente
- ✅ Deploy separado
- ✅ Tecnologias especializadas
- ✅ Times independentes

### Regras

- Frontend **NUNCA** acessa banco
- Comunicação **APENAS** via HTTP
- Backend é projeto **SEPARADO**
- JWT para autenticação distribuída
- CORS obrigatório

---

## Fluxo de Trabalho

### Fase 1: Criação da Estrutura Base

1. **AGENTE_CRIADOR** → Cria frontend + backend
2. **PLAYBOOK_PIPELINE** → F-Designer → Auditor → Refatorador
3. **AGENTE_GERADOR_PASSAPORTE_DA_CRIACAO** → Documenta estrutura
4. **AGENTE_VALIDADOR_PASSAPORTE_DA_CRIACAO** → Valida passaporte

### Fase 2: Desenvolvimento do Produto

1. Criar **PASSAPORTE_DO_PRODUTO** (via AGENTE_GERADOR)
2. Validar (via AGENTE_VALIDADOR)
3. **AGENTE_EVOLUTOR** → Desenvolver página por página
4. **PLAYBOOK_PIPELINE** → Garantir qualidade

---

## Como Usar

### 1. Criar Estrutura Base

Use o [002_AGENTE_CRIADOR.md](002_04-agentes/002_AGENTE_CRIADOR.md):

> "Crie a estrutura base completa da Stack 002 com frontend Next.js e backend Node.js/Express, incluindo autenticação JWT"

### 2. Auditar Código

Use o [002_AGENTE_AUDITOR.md](002_04-agentes/002_AGENTE_AUDITOR.md):

> "Audite o código criado e verifique conformidade com os dossiês"

### 3. Evoluir Produto

Use o [002_AGENTE_EVOLUTOR.md](002_04-agentes/002_AGENTE_EVOLUTOR.md):

> "Implemente a página `/produtos` conforme PASSAPORTE_DO_PRODUTO"

---

## Documentos Obrigatórios

### Leitura Obrigatória (Antes de Criar Código)

1. [MAPA_STACK](002_00-mapas_e_fluxos/002_MAPA_STACK_NEXT_FRONT_NODE_BACK_MONGO.md) — Decisões arquiteturais
2. [DOSSIE_REGRAS_DE_CRIACAO](002_01-identidades_estrutura/002_DOSSIE_REGRAS_DE_CRIACAO.md) — Regras gerais
3. [DOSSIE_NEXT_FRONTEND](002_01-identidades_estrutura/002_DOSSIE_NEXT_FRONTEND.md) — Frontend
4. [DOSSIE_NODE_BACKEND](002_01-identidades_estrutura/002_DOSSIE_NODE_BACKEND.md) — Backend

### Playbooks

- [PLAYBOOK_CRIADOR](002_02-playbooks/002_PLAYBOOK_CRIADOR.md)
- [PLAYBOOK_PIPELINE](002_02-playbooks/002_PLAYBOOK_PIPELINE.md)
- [PLAYBOOK_AUDITOR](002_02-playbooks/002_PLAYBOOK_AUDITOR.md)
- [PLAYBOOK_F_DESIGNER](002_02-playbooks/002_PLAYBOOK_F_DESIGNER.md)
- [PLAYBOOK_REFATORADOR](002_02-playbooks/002_PLAYBOOK_REFATORADOR.md)
- [PLAYBOOK_EVOLUTOR](002_02-playbooks/002_PLAYBOOK_EVOLUTOR.md)

---

## Status Final

✅ **COMPLETO** — Todos os documentos institucionais criados

- ✅ Mapas e Fluxos (1)
- ✅ Dossiês (3)
- ✅ Playbooks (6)
- ✅ Agentes (9)

---

© 2026 - Documentação Institucional Oficial

**Não utilize em projetos reais.**

---

## Arquitetura Planejada

### Frontend

- **Framework:** Next.js 14+ (App Router)
- **Estilização:** Styled Components
- **Estado:** Context API + React Query
- **Autenticação:** JWT (client-side)

### Backend

- **Runtime:** Node.js + Express
- **Linguagem:** TypeScript
- **Padrão:** Clean Architecture (Controllers → Services → Repositories)
- **Autenticação:** JWT (server-side)

### Banco de Dados

- **Database:** MongoDB
- **ODM:** Mongoose
- **Padrão:** Repository Pattern

---

## Estrutura Esperada

```
002_stack_next_front_node_back_mongo/
├── 001_00-mapas_e_fluxos/
│   └── 002_MAPA_STACK_NEXT_FRONT_NODE_BACK.md (TODO)
├── 001_01-identidades_estrutura/
│   ├── 002_DOSSIE_REGRAS_DE_CRIACAO.md (TODO)
│   ├── 002_DOSSIE_NEXT_FRONTEND.md (TODO)
│   └── 002_DOSSIE_NODE_BACKEND.md (TODO)
├── 001_02-playbooks/
│   └── (TODO: criar playbooks específicos)
├── 001_03-passaporte_de_criacao/
│   └── (TODO: criar templates)
├── 001_04-agentes/
│   └── (TODO: criar agentes)
└── 001_05-referencias-etapa-criacao-estrutura/
    ├── referencias-visuais/ (TODO)
    └── snippets/ (TODO)
```

---

## Diferenças da Stack 001

| Aspecto          | Stack 001 (Fullstack) | Stack 002 (Separado)                   |
| ---------------- | --------------------- | -------------------------------------- |
| **Estrutura**    | Monorepo único        | Frontend + Backend separados           |
| **API Routes**   | Next.js API Routes    | Express Server independente            |
| **Deploy**       | Vercel/monolito       | Frontend (Vercel) + Backend (separado) |
| **Comunicação**  | Interno               | HTTP/REST                              |
| **Complexidade** | Menor                 | Maior (2 deployments)                  |

---

## Roadmap

- [ ] Criar MAPA da stack
- [ ] Criar DOSSIE_REGRAS_DE_CRIACAO
- [ ] Criar DOSSIE_FRONTEND
- [ ] Criar DOSSIE_BACKEND
- [ ] Criar playbooks específicos
- [ ] Criar agentes específicos
- [ ] Criar templates de passaporte
- [ ] Criar referências visuais
- [ ] Criar snippets reutilizáveis
- [ ] Testar fluxo completo
- [ ] Marcar como ✅ ATIVO

---

## Contribuindo

Para ajudar no desenvolvimento desta stack:

1. Seguir estrutura da Stack 001 como referência
2. Adaptar para arquitetura frontend/backend separado
3. Documentar diferenças e particularidades
4. Testar com projeto real antes de marcar como ATIVO

---

**Última Atualização:** Janeiro 2026
