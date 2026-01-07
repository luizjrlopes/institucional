# 003_STACK_NEXT_FRONT_PYTHON_BACK_MONGO

**Stack 003** — Next.js Frontend + Python/FastAPI Backend + MongoDB  
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

- Python 3.11+
- FastAPI
- Motor (async MongoDB driver)
- Pydantic (validação)
- JWT (autenticação)
- Uvicorn (servidor ASGI)

**Banco:**

- MongoDB

---

## Estrutura Completa

```
003_stack_next_front_python_back_mongo/
│
├── 003_00-mapas_e_fluxos/
│   └── 003_MAPA_STACK_NEXT_FRONT_PYTHON_BACK_MONGO.md
│
├── 003_01-identidades_estrutura/
│   ├── 003_DOSSIE_REGRAS_DE_CRIACAO.md
│   ├── 003_DOSSIE_NEXT_FRONTEND.md
│   └── 003_DOSSIE_PYTHON_BACKEND.md
│
├── 003_02-playbooks/
│   ├── Readme.md
│   ├── 003_PLAYBOOK_CRIADOR.md
│   ├── 003_PLAYBOOK_PIPELINE.md
│   ├── 003_PLAYBOOK_AUDITOR.md
│   ├── 003_PLAYBOOK_F_DESIGNER.md
│   ├── 003_PLAYBOOK_REFATORADOR.md
│   └── 003_PLAYBOOK_EVOLUTOR.md
│
├── 003_03-passaporte_de_criacao/
│   └── [PASSAPORTE_DA_CRIACAO.md] (gerado)
│
├── 003_04-agentes/
│   ├── 003_AGENTE_CRIADOR.md
│   ├── 003_AGENTE_AUDITOR.md
│   ├── 003_AGENTE_F_DESIGNER.md
│   ├── 003_AGENTE_REFATORADOR.md
│   ├── 003_AGENTE_EVOLUTOR.md
│   ├── 003_AGENTE_GERADOR_PASSAPORTE_DA_CRIACAO.md
│   ├── 003_AGENTE_VALIDADOR_PASSAPORTE_DA_CRIACAO.md
│   ├── 003_AGENTE_GERADOR_PASSAPORTE_DO_PRODUTO.md
│   └── 003_AGENTE_VALIDADOR_PASSAPORTE_DO_PRODUTO.md
│
└── 003_05-referencias-etapa-criacao-estrutura/
    ├── snippets-frontend/
    └── snippets-backend/
```

---

## Diferencial da Stack 003

### vs Stack 001 (Fullstack Monolítico)

**Stack 001:** Backend dentro do Next.js (API Routes)  
**Stack 003:** Backend separado em projeto Python/FastAPI

### vs Stack 002 (Node.js Backend)

**Stack 002:** Backend Node.js/Express (TypeScript)  
**Stack 003:** Backend Python/FastAPI (async nativo)

### Vantagens

- ✅ Escalabilidade independente
- ✅ Deploy separado
- ✅ Python para data science/ML
- ✅ FastAPI alto desempenho
- ✅ Async/await nativo
- ✅ Swagger docs automático

### Regras

- Frontend **NUNCA** acessa banco
- Comunicação **APENAS** via HTTP
- Backend é projeto **SEPARADO**
- JWT para autenticação distribuída
- CORS obrigatório
- **SEMPRE async/await no backend**

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

Use o [003_AGENTE_CRIADOR.md](003_04-agentes/003_AGENTE_CRIADOR.md):

> "Crie a estrutura base completa da Stack 003 com frontend Next.js e backend Python/FastAPI, incluindo autenticação JWT"

### 2. Auditar Código

Use o [003_AGENTE_AUDITOR.md](003_04-agentes/003_AGENTE_AUDITOR.md):

> "Audite o código criado e verifique conformidade com os dossiês"

### 3. Evoluir Produto

Use o [003_AGENTE_EVOLUTOR.md](003_04-agentes/003_AGENTE_EVOLUTOR.md):

> "Implemente a página `/produtos` conforme PASSAPORTE_DO_PRODUTO"

---

## Documentos Obrigatórios

### Leitura Obrigatória (Antes de Criar Código)

1. [MAPA_STACK](003_00-mapas_e_fluxos/003_MAPA_STACK_NEXT_FRONT_PYTHON_BACK_MONGO.md) — Decisões arquiteturais
2. [DOSSIE_REGRAS_DE_CRIACAO](003_01-identidades_estrutura/003_DOSSIE_REGRAS_DE_CRIACAO.md) — Regras gerais
3. [DOSSIE_NEXT_FRONTEND](003_01-identidades_estrutura/003_DOSSIE_NEXT_FRONTEND.md) — Frontend
4. [DOSSIE_PYTHON_BACKEND](003_01-identidades_estrutura/003_DOSSIE_PYTHON_BACKEND.md) — Backend

### Playbooks

- [PLAYBOOK_CRIADOR](003_02-playbooks/003_PLAYBOOK_CRIADOR.md)
- [PLAYBOOK_PIPELINE](003_02-playbooks/003_PLAYBOOK_PIPELINE.md)
- [PLAYBOOK_AUDITOR](003_02-playbooks/003_PLAYBOOK_AUDITOR.md)
- [PLAYBOOK_F_DESIGNER](003_02-playbooks/003_PLAYBOOK_F_DESIGNER.md)
- [PLAYBOOK_REFATORADOR](003_02-playbooks/003_PLAYBOOK_REFATORADOR.md)
- [PLAYBOOK_EVOLUTOR](003_02-playbooks/003_PLAYBOOK_EVOLUTOR.md)

---

## Status Final

✅ **COMPLETO** — Todos os documentos institucionais criados

- ✅ Mapas e Fluxos (1)
- ✅ Dossiês (3)
- ✅ Playbooks (6)
- ✅ Agentes (9)
- ✅ Snippets Backend Python (5)
- ✅ Snippets Frontend (4)

---

## Observações Importantes

### Async/Await

**CRÍTICO:** Todas operações de banco no backend Python **DEVEM** ser async:

```python
# ✅ CORRETO
async def get_product(product_id: str):
    product = await repository.find_by_id(product_id)
    return product

# ❌ ERRADO
def get_product(product_id: str):
    product = repository.find_by_id(product_id)
    return product
```

### Pydantic

Sempre use Pydantic para validação:

```python
# ✅ CORRETO
class ProductCreate(BaseModel):
    name: str = Field(..., min_length=3)
    price: float = Field(..., ge=0)

# ❌ ERRADO
def create_product(name, price):
    if len(name) < 3:
        raise Exception("Nome curto")
```

---

© 2026 - Documentação Institucional Oficial

- **Estilização:** Styled Components
- **Estado:** Context API + React Query
- **Autenticação:** JWT (client-side)

### Backend

- **Linguagem:** Python 3.11+
- **Framework:** FastAPI
- **Padrão:** Clean Architecture (Routes → Services → Repositories)
- **Autenticação:** JWT (server-side)

### Banco de Dados

- **Database:** MongoDB
- **ODM:** Motor (async) ou PyMongo
- **Padrão:** Repository Pattern

---

## Estrutura Esperada

```
003_stack_next_front_python_back_mongo/
├── 001_00-mapas_e_fluxos/
│   └── 003_MAPA_STACK_NEXT_FRONT_PYTHON_BACK.md (TODO)
├── 001_01-identidades_estrutura/
│   ├── 003_DOSSIE_REGRAS_DE_CRIACAO.md (TODO)
│   ├── 003_DOSSIE_NEXT_FRONTEND.md (TODO)
│   └── 003_DOSSIE_PYTHON_BACKEND.md (TODO)
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

## Diferenças das Outras Stacks

| Aspecto            | Stack 001 (Fullstack) | Stack 002 (Node) | Stack 003 (Python)       |
| ------------------ | --------------------- | ---------------- | ------------------------ |
| **Backend**        | Next.js API Routes    | Node.js/Express  | Python/FastAPI           |
| **Tipagem**        | TypeScript            | TypeScript       | Python Type Hints        |
| **Async**          | Promises              | Promises         | async/await (asyncio)    |
| **ODM**            | Mongoose              | Mongoose         | Motor/PyMongo            |
| **Deploy Backend** | N/A                   | Node servers     | Python servers (Uvicorn) |

---

## Casos de Uso Ideais

- Projetos com necessidade de ML/AI (Python)
- Integração com bibliotecas científicas (NumPy, Pandas, etc.)
- Processamento de dados pesados no backend
- Equipes com expertise em Python

---

## Roadmap

- [ ] Criar MAPA da stack
- [ ] Criar DOSSIE_REGRAS_DE_CRIACAO
- [ ] Criar DOSSIE_FRONTEND
- [ ] Criar DOSSIE_BACKEND (Python/FastAPI)
- [ ] Criar playbooks específicos
- [ ] Criar agentes específicos (adaptados para Python)
- [ ] Criar templates de passaporte
- [ ] Criar referências visuais
- [ ] Criar snippets Python reutilizáveis
- [ ] Testar fluxo completo
- [ ] Marcar como ✅ ATIVO

---

## Contribuindo

Para ajudar no desenvolvimento desta stack:

1. Seguir estrutura da Stack 001 como referência
2. Adaptar para arquitetura frontend/backend separado com Python
3. Documentar padrões Python (PEP 8, type hints, etc.)
4. Criar snippets para FastAPI, Pydantic models, etc.
5. Testar com projeto real antes de marcar como ATIVO

---

**Última Atualização:** Janeiro 2026
