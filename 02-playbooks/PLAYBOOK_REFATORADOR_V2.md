# PLAYBOOK_REFATORADOR.md

Playbook Institucional — Refatoração Corretiva

Versão: v2.0 — Playbook Oficial de Refatoração

---

## 1. Objetivo

Este playbook define o processo de **refatoração corretiva** do código após uma auditoria técnica.

Ele existe para:

- corrigir violações apontadas pelo Auditor
- restaurar conformidade arquitetural
- melhorar organização interna do código

Este playbook **não cria novas funcionalidades** e **não altera escopo de produto**.

---

## 2. Momento de Execução

Este playbook **nunca é executado isoladamente**.

Ele é acionado exclusivamente pelo:

- PLAYBOOK_PIPELINE

Somente quando o resultado da auditoria for:

- APROVADO_COM_RESSALVAS

---

## 3. Entradas Obrigatórias

- Relatório da Auditoria
- Código atual do projeto
- DOSSIE_REGRAS_DE_CRIACAO.md
- DOSSIE_NEXT_BACKEND.md
- DOSSIE_NEXT_FRONTEND.md

---

## 4. Tipos de Correção Permitidos

O Refatorador pode:

- mover código para a camada correta
- separar responsabilidades
- eliminar duplicações
- substituir dependências proibidas por mock
- ajustar imports e organização de pastas

O Refatorador **não pode**:

- criar novas páginas
- criar novas features
- alterar contratos de API
- alterar regras de negócio

---

## 5. Etapas de Refatoração

### 5.1 Etapa R1 — Leitura do Relatório

Ações obrigatórias:

- Ler violações listadas pelo Auditor
- Identificar correções possíveis automaticamente

---

### 5.2 Etapa R2 — Correção Arquitetural

Ações obrigatórias:

- Ajustar separação de camadas
- Remover lógica indevida de UI ou rotas
- Garantir uso correto de services

---

### 5.3 Etapa R3 — Correção Técnica

Ações obrigatórias:

- Ajustar tipagens
- Corrigir imports
- Normalizar organização interna

---

### 5.4 Etapa R4 — Validação Local

Ações obrigatórias:

- Garantir que o projeto compile
- Não introduzir novas dependências

---

## 6. Saída Esperada

- Código corrigido
- Nenhuma nova violação introduzida
- Projeto pronto para nova auditoria

---

## 7. Regras de Bloqueio

O Refatorador deve interromper se:

- A correção exigir decisão de produto
- A correção alterar comportamento funcional

Nesses casos:

- Reportar bloqueio
- Não improvisar solução

---

## 8. Regra Final

> O Refatorador corrige.
>
> O Auditor valida.
