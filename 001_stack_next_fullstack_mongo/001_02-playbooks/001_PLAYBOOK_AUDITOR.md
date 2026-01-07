# PLAYBOOK_AUDITOR.md

Playbook Institucional — Auditoria Técnica e Arquitetural

Versão: v2.0 — Playbook Oficial de Auditoria

---

## 1. Objetivo

Este playbook define o processo de **auditoria técnica e arquitetural** do projeto.

Ele garante que toda entrega:

- respeite os dossiês institucionais
- esteja compilável
- não viole regras arquiteturais

Este playbook **não cria código novo** e **não corrige problemas**.

---

## 2. Momento de Execução

Este playbook **nunca é executado isoladamente**.

Ele é acionado exclusivamente pelo:

- PLAYBOOK_PIPELINE

Pode ocorrer múltiplas vezes até aprovação final.

---

## 3. Entradas de Auditoria

### Documentos Centrais

- [MAPA_INSTITUCIONAL_CENTRAL.md](../../mapas_e_fluxos_centrais/MAPA_INSTITUCIONAL_CENTRAL.md)
- [FLUXO_ORQUESTRADOR_CENTRAL.md](../../mapas_e_fluxos_centrais/FLUXO_ORQUESTRADOR_CENTRAL.md)

### Documentos da Stack

- [MAPA_STACK_NEXT_FULLSTACK_MONGO.md](../001_00-mapas_e_fluxos/001_MAPA_STACK_NEXT_FULLSTACK_MONGO.md)

### Dossiês de Identidade

- [DOSSIE_REGRAS_DE_CRIACAO.md](../001_01-identidades_estrutura/001_DOSSIE_REGRAS_DE_CRIACAO.md)
- [DOSSIE_NEXT_FRONTEND.md](../001_01-identidades_estrutura/001_DOSSIE_NEXT_FRONTEND.md)
- [DOSSIE_NEXT_BACKEND.md](../001_01-identidades_estrutura/001_DOSSIE_NEXT_BACKEND.md)

### Playbooks

- PLAYBOOK_CRIADOR.md (se aplicável)
- PLAYBOOK_EVOLUTOR.md (se aplicável)

### Artefatos

- Código atual do projeto
- [DOSSIE_NEXT_BACKEND.md](../../01-identidades/estrutura_base/001_next_fullstack_mongo/DOSSIE_NEXT_BACKEND.md)
- PLAYBOOK_CRIADOR.md (se aplicável)
- PLAYBOOK_EVOLUTOR.md (se aplicável)

---

## 4. Etapas de Auditoria

### 4.1 Etapa A1 — Verificação de Build

Ações obrigatórias:

- Executar `npm run build`
- Verificar erros de compilação

Resultado:

- BUILD_OK
- BUILD_FALHA

---

### 4.2 Etapa A2 — Auditoria Arquitetural

Verificações obrigatórias:

- Separação de camadas (route → controller → service → repository → model)
- Ausência de acesso a banco em `route.ts`
- Uso correto de shared vs feature
- Ausência de lógica de negócio em componentes de UI

---

### 4.3 Etapa A3 — Auditoria de Padrões

Verificações obrigatórias:

- Uso de Context/Provider conforme padrão
- Uso de services para comunicação
- Ausência de fetch direto em componentes

---

### 4.4 Etapa A4 — Auditoria de Escopo

Verificações obrigatórias:

- Nenhuma funcionalidade fora do Passaporte
- Nenhuma feature criada sem autorização

---

## 5. Classificação do Resultado

O resultado da auditoria deve ser classificado como:

- APROVADO
- APROVADO_COM_RESSALVAS
- BLOQUEADO

---

## 6. Saída Obrigatória

Gerar relatório contendo:

- Status da auditoria
- Lista objetiva de violações
- Indicação clara do que é corrigível
- Indicação clara do que exige decisão humana

---

## 7. Regras de Proibição

- Proibido corrigir código
- Proibido refatorar
- Proibido aplicar design

---

## 8. Regra Final

> O Auditor aponta.
>
> Outros agentes corrigem.
