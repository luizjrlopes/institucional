# 04-agentes — Agentes Institucionais por Stack

Este diretório contém os prompts institucionais de cada agente, organizados por stack tecnológica.

---

## Estrutura

```
04-agentes/
├── README.md (este arquivo)
└── stacks/
    ├── 001_next_fullstack_mongo/
    ├── 002_next_front_node_back_mongo/
    └── 003_next_front_python_back_mongo/
```

Cada pasta de stack contém os mesmos 7 agentes, ajustados com links relativos para os dossiês institucionais corretos da respectiva stack.

---

## Agentes Disponíveis

Cada stack possui os seguintes agentes:

### 1. [AGENTE_CRIADOR](stacks/001_next_fullstack_mongo/AGENTE_CRIADOR.md)

**Papel:** Criar projetos do zero seguindo rigorosamente os dossiês institucionais.

**Quando usar:** Início de novo projeto (Fase 1 — Estrutura Base).

**Links por stack:**

- [Stack 001 (Next Fullstack + Mongo)](stacks/001_next_fullstack_mongo/AGENTE_CRIADOR.md)
- [Stack 002 (Next Front + Node Back + Mongo)](stacks/002_next_front_node_back_mongo/AGENTE_CRIADOR.md)
- [Stack 003 (Next Front + Python Back + Mongo)](stacks/003_next_front_python_back_mongo/AGENTE_CRIADOR.md)

---

### 2. [AGENTE_GERADOR_PASSAPORTE](stacks/001_next_fullstack_mongo/AGENTE_GERADOR_PASSAPORTE.md)

**Papel:** Analisar referências visuais (HTML, imagens, anotações) e produzir o Passaporte da Aplicação.

**Quando usar:** Após estrutura base criada, antes de implementar features (Fase 2 — Planejamento).

**Links por stack:**

- [Stack 001](stacks/001_next_fullstack_mongo/AGENTE_GERADOR_PASSAPORTE.md)
- [Stack 002](stacks/002_next_front_node_back_mongo/AGENTE_GERADOR_PASSAPORTE.md)
- [Stack 003](stacks/003_next_front_python_back_mongo/AGENTE_GERADOR_PASSAPORTE.md)

---

### 3. [AGENTE_VALIDADOR_PASSAPORTE](stacks/001_next_fullstack_mongo/AGENTE_VALIDADOR_PASSAPORTE.md)

**Papel:** Validar se o Passaporte está completo, coerente e alinhado aos dossiês.

**Quando usar:** Após geração/atualização do Passaporte, antes de liberar para o Evolutor.

**Links por stack:**

- [Stack 001](stacks/001_next_fullstack_mongo/AGENTE_VALIDADOR_PASSAPORTE.md)
- [Stack 002](stacks/002_next_front_node_back_mongo/AGENTE_VALIDADOR_PASSAPORTE.md)
- [Stack 003](stacks/003_next_front_python_back_mongo/AGENTE_VALIDADOR_PASSAPORTE.md)

---

### 4. [AGENTE_EVOLUTOR](stacks/001_next_fullstack_mongo/AGENTE_EVOLUTOR.md)

**Papel:** Evoluir aplicação existente adicionando features, páginas e domínios conforme o Passaporte.

**Quando usar:** Fase 3 — Evolução MOC (implementação de páginas usando MOCs em `data/`).

**Links por stack:**

- [Stack 001](stacks/001_next_fullstack_mongo/AGENTE_EVOLUTOR.md)
- [Stack 002](stacks/002_next_front_node_back_mongo/AGENTE_EVOLUTOR.md)
- [Stack 003](stacks/003_next_front_python_back_mongo/AGENTE_EVOLUTOR.md)

---

### 5. [AGENTE_F_DESIGNER](stacks/001_next_fullstack_mongo/AGENTE_F_DESIGNER.md)

**Papel:** Normalizar, organizar e harmonizar visualmente interfaces existentes sem alterar comportamento funcional.

**Quando usar:** Após entregas do Evolutor/Refatorador (etapa final do pipeline).

**Links por stack:**

- [Stack 001](stacks/001_next_fullstack_mongo/AGENTE_F_DESIGNER.md)
- [Stack 002](stacks/002_next_front_node_back_mongo/AGENTE_F_DESIGNER.md)
- [Stack 003](stacks/003_next_front_python_back_mongo/AGENTE_F_DESIGNER.md)

---

### 6. [AGENTE_REFATORADOR](stacks/001_next_fullstack_mongo/AGENTE_REFATORADOR.md)

**Papel:** Melhorar, reorganizar e corrigir código existente sem alterar comportamento funcional.

**Quando usar:** Quando há dívida técnica ou violações arquiteturais detectadas (não durante Fase 2 — Planejamento).

**Links por stack:**

- [Stack 001](stacks/001_next_fullstack_mongo/AGENTE_REFATORADOR.md)
- [Stack 002](stacks/002_next_front_node_back_mongo/AGENTE_REFATORADOR.md)
- [Stack 003](stacks/003_next_front_python_back_mongo/AGENTE_REFATORADOR.md)

---

### 7. [AGENTE_AUDITOR](stacks/001_next_fullstack_mongo/AGENTE_AUDITOR.md)

**Papel:** Avaliar, validar e reportar conformidade arquitetural, estrutural e processual sem alterar código.

**Quando usar:** Pipeline obrigatório de entrega institucional (pós-implementação/pós-refatoração).

**Links por stack:**

- [Stack 001](stacks/001_next_fullstack_mongo/AGENTE_AUDITOR.md)
- [Stack 002](stacks/002_next_front_node_back_mongo/AGENTE_AUDITOR.md)
- [Stack 003](stacks/003_next_front_python_back_mongo/AGENTE_AUDITOR.md)

---

## Diferenças entre Stacks

### Stack 001 — Next.js Fullstack + MongoDB

- Backend integrado no Next.js (`src/app/api/**/route.ts`)
- Camadas em `src/server/**`
- Fullstack monolítico

### Stack 002 — Next.js Front + Node Back (separado) + MongoDB

- Frontend Next.js standalone
- Backend Node.js separado (Express/Fastify)
- Comunicação via API HTTP

### Stack 003 — Next.js Front + Python Back + MongoDB

- Frontend Next.js standalone
- Backend Python (FastAPI/Flask)
- Comunicação via API HTTP

---

## Fluxo de Uso Institucional

1. **Início:** [AGENTE_CRIADOR](stacks/001_next_fullstack_mongo/AGENTE_CRIADOR.md) — cria estrutura base + autenticação
2. **Planejamento:** [AGENTE_GERADOR_PASSAPORTE](stacks/001_next_fullstack_mongo/AGENTE_GERADOR_PASSAPORTE.md) — analisa referências
3. **Validação:** [AGENTE_VALIDADOR_PASSAPORTE](stacks/001_next_fullstack_mongo/AGENTE_VALIDADOR_PASSAPORTE.md) — aprova Passaporte
4. **Evolução:** [AGENTE_EVOLUTOR](stacks/001_next_fullstack_mongo/AGENTE_EVOLUTOR.md) — implementa features com MOCs
5. **Normalização Visual:** [AGENTE_F_DESIGNER](stacks/001_next_fullstack_mongo/AGENTE_F_DESIGNER.md) — organiza visual
6. **Refatoração (se necessário):** [AGENTE_REFATORADOR](stacks/001_next_fullstack_mongo/AGENTE_REFATORADOR.md) — corrige dívida técnica
7. **Auditoria:** [AGENTE_AUDITOR](stacks/001_next_fullstack_mongo/AGENTE_AUDITOR.md) — valida conformidade

---

## Referências Centrais

Todos os agentes fazem referência aos seguintes documentos institucionais:

- [MAPA_INSTITUCIONAL_CENTRAL](../00-mapas_e_fluxos/MAPA_INSTITUCIONAL_CENTRAL.md)
- [FLUXO_ORQUESTRADOR](../00-mapas_e_fluxos/FLUXO_ORQUESTRADOR_CENTRAL.md.md)
- [PASSAPORTE_DA_APLICACAO](../03-passaporte/PASSAPORTE_DA_APLICACAO.md)
- Dossiês específicos por stack em [`01-identidades/estrutura_base/`](../01-identidades/estrutura_base/)

---

## Navegação

- [Voltar para Institucional](../README.md)
- [Ver Playbooks](../02-playbooks/)
- [Ver Dossiês](../01-identidades/estrutura_base/)
- [Ver Passaporte](../03-passaporte/)
