# FLUXO_ORQUESTRADOR_CENTRAL.md

Fluxo Central de Orquestração — Sistema Multi-Stack

**Versão:** v1.0 — Fluxo Meta (Derivado)

---

## 1. Natureza do Fluxo Central

Este fluxo **não executa tarefas técnicas**.

Ele existe para:

- coordenar agentes
- aplicar regras institucionais
- selecionar stack
- garantir ordem correta de execução

Em caso de conflito, **os Playbooks sempre prevalecem**.

---

## 2. Pré-condição Absoluta

Antes de qualquer execução:

- Deve existir `BRIEF_PRODUTO.md`
- Deve existir `BRIEF_PRODUTO.stack_id`

Sem isso, o sistema entra em estado **BLOQUEADO**.

---

## 3. Sequência Central de Execução

### 3.1 Inicialização

1. Ler `BRIEF_PRODUTO.stack_id`
2. Carregar `MAPA_STACK_<stack_id>.md`
3. Restringir escopo documental à stack selecionada

---

### 3.2 Criação Base

1. Executar `PLAYBOOK_CRIADOR`
2. Resultado esperado:

   - estrutura base criada
   - auth mínima funcional
   - home vazia acessível

---

### 3.3 Pipeline Obrigatório

1. Executar `PLAYBOOK_PIPELINE`

   - F-Designer
   - Auditor
   - Refatorador (se necessário)

---

### 3.4 Protótipo e Planejamento

1. (Opcional) Executar `AGENTE_GERADOR_PROTOTIPO`
2. Validar Protótipo HTML
3. Executar `AGENTE_GERADOR_PASSAPORTE`
4. Executar `AGENTE_VALIDADOR_PASSAPORTE`

---

### 3.5 Execução por Página (Loop)

Enquanto houver páginas no Passaporte:

1. Executar `PLAYBOOK_EVOLUTOR`
2. Executar `PLAYBOOK_PIPELINE`

---

### 3.6 Encerramento

1. Estado final: **PROJETO_CONCLUIDO**

---

## 4. Regras de Bloqueio

Bloquear imediatamente se:

- documento fora da stack for utilizado
- auditor reprovar
- passaporte inválido
- decisão de produto for exigida

---

## 5. Regra Final

Este fluxo apenas **coordena**. Ele não decide arquitetura nem implementação.
