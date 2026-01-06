# PLAYBOOK_PIPELINE.md

Pipeline Institucional de Pós-Processamento

Versão: v2.0 — Playbook Obrigatório

---

## 1. Objetivo

Este playbook define o **pipeline institucional obrigatório** que deve ser executado **sempre que um agente de execução entregar código**, seja ele:

- Agente Criador (Playbook 1 — Criação)
- Agente Evolutor (Playbook 2 — Executor)

Ele garante que **nenhuma entrega técnica seja considerada válida** sem passar por:

1. Normalização visual
2. Auditoria técnica
3. Refatoração corretiva (se necessário)
4. Registro histórico

Nenhum agente individual pode pular ou alterar este fluxo.

---

## 2. Quando este pipeline é acionado

Este pipeline é acionado automaticamente quando:

- O PLAYBOOK_CRIADOR é concluído
- O PLAYBOOK_EVOLUTOR conclui uma página fechada

> Nenhuma entrega encerra o processo sozinha.

---

## 3. Ordem Fixa de Execução

A ordem abaixo **não pode ser alterada**:

1. PLAYBOOK_F_DESIGNER
2. PLAYBOOK_AUDITOR
3. (Condicional) PLAYBOOK_REFATORADOR
4. PLAYBOOK_F_DESIGNER (reaplicação)
5. PLAYBOOK_AUDITOR (revalidação)
6. Registro em histórico

---

## 4. Etapas do Pipeline

### 4.1 Etapa P1 — Normalização Visual (F-DESIGNER)

Responsável:

- Agente F-Designer

Ações obrigatórias:

- Revisar layout e hierarquia visual
- Ajustar espaçamentos, padrões e estados visuais
- Garantir consistência entre páginas
- Não alterar lógica de negócio

Saída esperada:

- Interface visual consistente

---

### 4.2 Etapa P2 — Auditoria Técnica

Responsável:

- Agente Auditor

Ações obrigatórias:

- Verificar conformidade com dossiês institucionais
- Verificar separação de camadas
- Detectar violações arquiteturais
- Rodar `npm run build`

Classificação do resultado:

- APROVADO
- APROVADO COM RESSALVAS
- BLOQUEADO (exige decisão humana)

---

### 4.3 Etapa P3 — Refatoração (Condicional)

Responsável:

- Agente Refatorador

Executado somente se:

- Auditoria detectar violações corrigíveis

Ações permitidas:

- Reorganizar código
- Corrigir camadas
- Substituir dependências proibidas por mock
- Eliminar duplicações

Ações proibidas:

- Criar novas funcionalidades
- Alterar escopo definido no Passaporte

---

### 4.4 Etapa P4 — Revalidação

Após refatoração:

1. Executar novamente o PLAYBOOK_F_DESIGNER
2. Executar novamente o PLAYBOOK_AUDITOR

Objetivo:

- Garantir que a correção não introduziu novos problemas

---

### 4.5 Etapa P5 — Registro Histórico

Responsável:

- Agente Auditor ou Orquestrador

Registrar em `06-historico`:

- O que foi entregue
- O que foi corrigido
- Por que foi corrigido
- De onde vieram as inferências (Snippets, HTML, Dossiês)

---

## 5. Regras de Bloqueio

O pipeline deve ser interrompido se:

- Exigir decisão de produto não definida
- Exigir conexão externa proibida
- Violação institucional não corrigível automaticamente

Nesses casos:

- Informar bloqueio
- Não improvisar solução

---

## 6. Regra Final

> Nenhuma entrega técnica existe sem passar por este pipeline.
>
> Agentes executam. Pipeline garante.
