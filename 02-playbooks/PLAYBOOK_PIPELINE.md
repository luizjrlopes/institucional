# 🧩 PLAYBOOK_PIPELINE.md

Pipeline Institucional Obrigatório de Pós-Execução (Criador/Evolutor)

**Versão:** v1.0  
**Natureza:** Playbook Operacional Vinculante  
**Autoridade:** Subordinado ao MAPA_INSTITUCIONAL e aos Dossiês  
**Escopo:** Define a execução obrigatória do pipeline sequencial após qualquer entrega do AGENTE_CRIADOR ou AGENTE_EVOLUTOR

---

## 1. FINALIDADE

Este playbook define o pipeline institucional obrigatório que deve ser executado **após qualquer execução** do:

- **AGENTE_CRIADOR** (ETAPA 1 — Estrutura Técnica Inicial)
- **AGENTE_EVOLUTOR** (ETAPA 4 — Evolução Incremental / MOC)

📌 **Regra absoluta:** Nenhuma entrega do Criador ou do Evolutor é considerada concluída institucionalmente sem a execução completa deste pipeline.

---

## 2. AUTORIDADE E HIERARQUIA

Este playbook opera sob a seguinte precedência (ordem obrigatória):

1. MAPA_INSTITUCIONAL
2. Dossiês Institucionais (Regras de Criação, Frontend, Backend)
3. Playbooks específicos (Criador, Evolutor, F-Designer, Auditor, Refatorador)
4. **PLAYBOOK_PIPELINE (este documento)**
5. FLUXO_ORQUESTRADOR
6. PASSAPORTE_DA_APLICACAO

📌 Em caso de conflito, prevalece o documento de maior autoridade.

---

## 3. DEFINIÇÕES INSTITUCIONAIS

### 3.1. O que é “Execução do Pipeline”

“Execução do Pipeline” significa executar, em ordem e sem omissão, os agentes:

1. **F-DESIGNER**
2. **AUDITOR**
3. **REFATORADOR** (somente se acionado)
4. **F-DESIGNER** (re-execução obrigatória pós-refatoração)
5. **AUDITOR** (revalidação obrigatória pós-refatoração)
6. **Registro formal em 06-historico/**

### 3.2. Critério de Conclusão de Pipeline

O pipeline só é considerado concluído quando:

- não existem desvios críticos apontados pelo Auditor **ou**
- todos os desvios foram refatorados e revalidados com sucesso
- existe registro formal em `06-historico/` conforme este playbook

---

## 4. GATILHOS (QUANDO ESTE PIPELINE DEVE RODAR)

Este pipeline é obrigatório sempre que ocorrer **qualquer** uma das situações abaixo:

### 4.1. Após o AGENTE_CRIADOR

- criação/recriação de scaffold
- ajuste estrutural na base
- criação/alteração de páginas institucionais base (auth/sistema)
- alteração de middleware, providers, estrutura de pastas

### 4.2. Após o AGENTE_EVOLUTOR

- criação de uma nova página/rota autorizada pelo Passaporte
- criação/alteração de services, repositories, controllers, routes
- criação/alteração de MOCs em `data/`
- qualquer ajuste funcional no produto durante fase MOC

📌 **Regra de ouro:** Se houve “entrega” (código, estrutura, UI, contrato, integração), houve pipeline.

---

## 5. PIPELINE OBRIGATÓRIO (ORDEM IMUTÁVEL)

### PASSO 1 — F-DESIGNER (obrigatório)

**Objetivo:** Normalizar estrutura e estilo da UI, garantindo consistência visual e layout.

**Escopo permitido:**

- ajustes de spacing (padding, margin, gap)
- alinhamentos e hierarquia visual
- correções de responsividade
- consistência de componentes e tokens visuais
- organização de classes/estilos sem alterar regras de negócio

**Proibições absolutas:**

- alterar contratos/DTOs
- criar lógica de produto
- alterar comportamento do sistema
- introduzir novas rotas/features

**Saída mínima:**

- alterações aplicadas (ou declaração explícita de “sem alterações necessárias”)
- lista objetiva de arquivos tocados

---

### PASSO 2 — AUDITOR (obrigatório)

**Objetivo:** Verificar conformidade institucional, sem corrigir.

**Checklist mínimo obrigatório:**

- separação de camadas (UI → services → repositories)
- ausência de fetch direto na UI
- rotas e endpoints conforme regras
- padrões de estrutura de pastas
- uso correto de MOC (fase MOC)
- consistência de contratos
- presença/consistência de páginas institucionais base (quando aplicável)

**Saída obrigatória:**

- `RELATORIO_AUDITORIA.md` (ou equivalente) com:
  - ✅ CONFORME / ❌ DESVIOS
  - lista de desvios por arquivo
  - severidade (crítico/alto/médio/baixo)
  - instruções explícitas para o Refatorador, se acionado

📌 Auditoria **nunca corrige**.

---

### PASSO 3 — REFATORADOR (condicional)

**Gatilho:** Executa somente se o Auditor marcar ❌ DESVIOS.

**Objetivo:** Corrigir apenas o que foi apontado.

**Regras absolutas:**

- corrigir **somente** os desvios listados
- proibido “melhorar por gosto”
- proibido alterar comportamento
- proibido inventar novas abstrações não solicitadas

**Saída mínima:**

- lista de correções aplicadas
- arquivos impactados
- nota de confirmação de que não houve mudança comportamental

---

### PASSO 4 — F-DESIGNER (re-execução obrigatória pós-refatoração)

**Obrigatório se PASSO 3 ocorreu.**

Objetivo: garantir que correções estruturais não quebraram o layout/consistência visual.

---

### PASSO 5 — AUDITOR (revalidação obrigatória pós-refatoração)

**Obrigatório se PASSO 3 ocorreu.**

Objetivo: confirmar que desvios foram sanados.

Resultado final obrigatório:

- ✅ CONFORME (pipeline pode concluir)
- ❌ DESVIOS (pipeline retorna ao PASSO 3)

---

### PASSO 6 — REGISTRO EM 06-historico/ (obrigatório)

**Natureza:** Output obrigatório; Input proibido.

**Regra institucional:**

- Cada pipeline executado gera registro formal em `06-historico/`.

#### Estrutura recomendada (padrão)

```text
06-historico/
  └── pipelines/
      └── PIPELINE-000X-nome-do-pipeline/
          ├── 00-resumo.md
          ├── 01-criador-ou-evolutor.md
          ├── 02-f-designer.md
          ├── 03-auditor.md
          └── 04-refatorador.md (se acionado)
```

### Conteúdo mínimo obrigatório (por arquivo)

- **Data**
- **Etapa institucional** (ETAPA 1 / ETAPA 4)
- **Status:** CONCLUÍDO | PARCIAL | BLOQUEADO
- **O que foi criado/alterado**
- **Arquivos tocados**
- **Desvios encontrados** (se houver)
- **Correções aplicadas** (se houver)
- **Resultado final e próxima ação**

> 📌 **Proibição:** O registro em histórico não altera normas nem autoriza execução fora do fluxo.

---

## 6. CRITÉRIO DE ACEITE (QUANDO A ENTREGA É “VÁLIDA”)

Uma entrega do Criador ou Evolutor só é válida institucionalmente se:

- Pipeline executado conforme ordem (Seção 5)
- Auditor final = ✅ CONFORME
- Registro em `06-historico/` existente e completo

Caso contrário:

- ❌ Entrega inválida
- ❌ Fluxo bloqueado
- ❌ Retorno ao último ponto conforme

---

## 7. PROIBIÇÕES ABSOLUTAS

É proibido:

- pular qualquer passo do pipeline
- executar Refatorador sem Auditoria formal
- finalizar entrega sem registro em `06-historico/`
- usar `06-historico/` como fonte de decisão (input)
- permitir que F-Designer altere comportamento do sistema

---

## 8. REGRA FINAL

Se uma entrega não passou por F-Designer → Auditor → (Refatorador se necessário) → Registro, então ela não existe institucionalmente.

```

```
