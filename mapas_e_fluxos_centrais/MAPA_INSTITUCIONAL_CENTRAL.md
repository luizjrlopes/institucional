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

- **001_next_fullstack_mongo**

  - Mapa: [001_MAPA_STACK_NEXT_FULLSTACK_MONGO.md](../001_stack_next_fullstack_mongo/001_00-mapas_e_fluxos/001_MAPA_STACK_NEXT_FULLSTACK_MONGO.md)
  - Status: ✅ Completa

- **002_next_front_node_back_mongo**

  - Mapa: [002_MAPA_STACK_NEXT_FRONT_NODE_BACK_MONGO.md](../002_stack_next_front_node_back_mongo/002_00-mapas_e_fluxos/002_MAPA_STACK_NEXT_FRONT_NODE_BACK_MONGO.md)
  - Status: ✅ Completa

- **003_next_front_python_back_mongo**

  - Mapa: [003_MAPA_STACK_NEXT_FRONT_PYTHON_BACK.md](../003_stack_next_front_python_back_mongo/003_00-mapas_e_fluxos/003_MAPA_STACK_NEXT_FRONT_PYTHON_BACK.md)
  - Status: ✅ Completa

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
