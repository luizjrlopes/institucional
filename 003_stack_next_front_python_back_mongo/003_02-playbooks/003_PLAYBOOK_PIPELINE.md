# PLAYBOOK_PIPELINE.md

Pipeline Institucional de Pós-Processamento — Stack 003

Versão: v2.0 — Playbook Obrigatório

**Stack:** 003_next_front_python_back_mongo

---

## 1. Objetivo

Este playbook define o **pipeline institucional obrigatório** para projetos com arquitetura separada (frontend Next.js + backend Python/FastAPI).

Ele garante que **nenhuma entrega técnica seja considerada válida** sem passar por:

1. Normalização visual
2. Auditoria técnica (ambos os projetos)
3. Refatoração corretiva (se necessário)
4. Registro histórico

Este pipeline é executado **sempre que um agente de execução entregar código**, seja:

- Agente Criador (Playbook Criador)
- Agente Evolutor (Playbook Evolutor)

---

## 2. Quando este pipeline é acionado

Este pipeline é acionado automaticamente quando:

- O 003_PLAYBOOK_CRIADOR é concluído (ETAPA 1)
- O 003_PLAYBOOK_EVOLUTOR conclui uma página (ETAPA 2)
- O 003_PLAYBOOK_EVOLUTOR conclui integração com MongoDB (ETAPA 3)

> Nenhuma entrega encerra o processo sozinha. Pipeline é obrigatório.

---

## 3. Ordem Fixa de Execução

A ordem abaixo **não pode ser alterada**:

1. **003_PLAYBOOK_F_DESIGNER** — Normalização visual
2. **003_PLAYBOOK_AUDITOR** — Auditoria técnica
3. **(Condicional) 003_PLAYBOOK_REFATORADOR** — Correções
4. **003_PLAYBOOK_F_DESIGNER** — Reaplicação
5. **003_PLAYBOOK_AUDITOR** — Revalidação
6. **Registro em histórico** — Documentação

---

## 4. Etapas do Pipeline

### 4.1 Etapa P1 — Normalização Visual (F-DESIGNER)

**Responsável:** 003_AGENTE_F_DESIGNER

**Escopo:** Atua APENAS no frontend Next.js

**Ações obrigatórias:**

- Revisar layout e hierarquia visual do **frontend**
- Ajustar espaçamentos, padrões e estados visuais
- Garantir consistência entre páginas
- Validar responsividade (desktop, tablet, mobile)
- Verificar acessibilidade visual (contraste, focus)
- Garantir uso correto de Styled Components
- Verificar tema consistente (theme tokens)

**Ações proibidas:**

- ❌ Não alterar lógica de negócio
- ❌ Não mexer no backend Python/FastAPI
- ❌ Não modificar rotas FastAPI
- ❌ Não alterar schemas Pydantic
- ❌ Não modificar chamadas HTTP

**Saída esperada:**

- Interface visual consistente no frontend
- Estados visuais implementados (loading, error, empty, success)
- Responsividade validada
- Relatório de ajustes realizados

**Critérios de sucesso:**

- [ ] Todas as páginas visualmente consistentes
- [ ] Theme tokens aplicados
- [ ] Estados visuais presentes
- [ ] Responsivo em 3 breakpoints
- [ ] Sem Tailwind CSS (proibido)

---

### 4.2 Etapa P2 — Auditoria Técnica

**Responsável:** 003_AGENTE_AUDITOR

**Escopo:** Audita frontend Next.js E backend Python/FastAPI

**Ações obrigatórias:**

#### **FRONTEND Next.js:**

- [ ] Verificar conformidade com [003_DOSSIE_NEXT_FRONTEND](../003_01-identidades_estrutura/003_DOSSIE_NEXT_FRONTEND.md)
- [ ] Verificar separação entre componentes shared e feature
- [ ] Verificar uso correto do apiClient (axios)
- [ ] Verificar AuthContext implementado
- [ ] Verificar middleware de proteção de rotas
- [ ] Rodar `npm run build` — deve compilar sem erros
- [ ] Verificar imports corretos (não circular)
- [ ] Verificar TypeScript types corretos

#### **BACKEND Python/FastAPI:**

- [ ] Verificar conformidade com [003_DOSSIE_PYTHON_BACKEND](../003_01-identidades_estrutura/003_DOSSIE_PYTHON_BACKEND.md)
- [ ] Verificar separação de camadas:
  - `app/routes/` — rotas FastAPI
  - `app/services/` — lógica de negócio async
  - `app/repositories/` — acesso a dados async
  - `app/models/` — schemas Pydantic
  - `app/core/` — config, security, database
- [ ] Verificar uso correto de `async`/`await`
- [ ] Verificar Motor (MongoDB async) se aplicável
- [ ] Verificar validação Pydantic em todas as entradas
- [ ] Verificar tratamento de erros com HTTPException
- [ ] Verificar JWT implementado (se auth)
- [ ] Verificar CORS configurado
- [ ] Verificar type hints em todas as funções
- [ ] Rodar `uvicorn app.main:app --reload` — deve iniciar sem erros

#### **INTEGRAÇÃO:**

- [ ] Verificar contratos HTTP entre frontend e backend
- [ ] Verificar CORS permite frontend (http://localhost:3000)
- [ ] Verificar autenticação JWT end-to-end
- [ ] Verificar refresh token operacional
- [ ] Verificar error handling no frontend

**Classificação do resultado:**

- **✅ APROVADO** — Pode prosseguir, sem violações
- **⚠️ APROVADO COM RESSALVAS** — Pode prosseguir, documentar ressalvas
- **❌ BLOQUEADO** — Violações críticas, exige refatoração

**Saída esperada:**

- Relatório de auditoria detalhado
- Lista de violações encontradas (se houver)
- Classificação do código (aprovado/ressalvas/bloqueado)
- Recomendações de correção

---

### 4.3 Etapa P3 — Refatoração (Condicional)

**Responsável:** 003_AGENTE_REFATORADOR

**Executado somente se:** Auditoria detectar violações corrigíveis (status BLOQUEADO)

**Ações permitidas:**

#### **FRONTEND Next.js:**

- ✅ Reorganizar código (extrair funções, componentes)
- ✅ Corrigir uso do apiClient
- ✅ Mover componentes entre shared e feature
- ✅ Corrigir imports circulares
- ✅ Melhorar type safety (TypeScript)
- ✅ Adicionar error boundaries
- ✅ Otimizar re-renders

#### **BACKEND Python/FastAPI:**

- ✅ Reorganizar camadas (routes, services, repositories)
- ✅ Corrigir separação de responsabilidades
- ✅ Adicionar/corrigir validações Pydantic
- ✅ Melhorar tratamento de erros (HTTPException)
- ✅ Corrigir async/await (evitar sync em código async)
- ✅ Adicionar type hints faltantes
- ✅ Otimizar queries Motor (MongoDB)
- ✅ Extrair lógica complexa em funções auxiliares

**Ações proibidas:**

- ❌ Criar novas funcionalidades não documentadas
- ❌ Alterar escopo definido no Passaporte
- ❌ Misturar código de frontend com backend
- ❌ Ignorar contratos HTTP estabelecidos
- ❌ Alterar schemas Pydantic sem motivo técnico
- ❌ Adicionar dependências não aprovadas
- ❌ Modificar regras de negócio

**Saída esperada:**

- Código refatorado
- Violações corrigidas
- Relatório de mudanças realizadas
- Código pronto para revalidação

---

### 4.4 Etapa P4 — Revalidação

**Após refatoração (se houve):**

1. Executar novamente **003_PLAYBOOK_F_DESIGNER**
   - Garantir que refatoração não quebrou visual
2. Executar novamente **003_PLAYBOOK_AUDITOR**
   - Garantir que violações foram corrigidas
   - Garantir que novas violações não foram introduzidas

**Objetivo:**

- Garantir que a correção não introduziu novos problemas
- Validar que código está em conformidade total

**Critérios de sucesso:**

- [ ] Visual mantido ou melhorado
- [ ] Auditoria retorna APROVADO ou APROVADO COM RESSALVAS
- [ ] Builds funcionando (frontend e backend)
- [ ] Testes manuais básicos passando

**Se revalidação falhar:**

- Repetir Etapa P3 (Refatoração)
- Máximo 3 ciclos de refatoração/revalidação
- Se falhar 3x, escalar para decisão humana

---

### 4.5 Etapa P5 — Registro Histórico

**Responsável:** 003_AGENTE_AUDITOR ou Orquestrador

**Registrar em `historico/pipelines/`:**

**Arquivo:** `historico/pipelines/pipeline-[data]-[etapa].md`

**Conteúdo obrigatório:**

```markdown
# Pipeline — [ETAPA] — [DATA]

## Contexto

- **Etapa:** CRIAÇÃO / MOC / INTEGRAÇÃO
- **Páginas:** [lista de páginas entregues]
- **Agente Executor:** 003_AGENTE_CRIADOR / 003_AGENTE_EVOLUTOR

## Entregável Inicial

### Frontend

- [lista de arquivos/componentes criados]

### Backend

- [lista de rotas/services/repositories criados]

## Pipeline Executado

### P1 - F-Designer

- **Status:** Executado
- **Ajustes:** [lista de ajustes visuais]

### P2 - Auditor

- **Status:** [APROVADO / APROVADO COM RESSALVAS / BLOQUEADO]
- **Violações:** [lista de violações, se houver]

### P3 - Refatorador (se aplicável)

- **Status:** [Executado / Não necessário]
- **Correções:** [lista de correções]

### P4 - Revalidação (se aplicável)

- **Status:** [APROVADO / REPROVADO]

## Resultado Final

- **Status Geral:** [APROVADO / APROVADO COM RESSALVAS]
- **Observações:** [comentários adicionais]

## Métricas

- **Tempo total:** [duração do pipeline]
- **Ciclos de refatoração:** [0-3]
- **Violações corrigidas:** [número]
```

**Objetivo do registro:**

- Rastreabilidade completa
- Auditoria posterior
- Aprendizado contínuo
- Governança técnica

---

## 5. Regras de Bloqueio

O pipeline deve ser **interrompido imediatamente** se:

### Violações Críticas — Frontend

- ❌ Frontend tentar acessar MongoDB diretamente
- ❌ Backend criado dentro do projeto Next.js
- ❌ apiClient não utilizado para requisições HTTP
- ❌ AuthContext ausente ou incorreto
- ❌ Rotas desprotegidas (sem middleware)
- ❌ Tailwind CSS presente (proibido)
- ❌ Build com erros fatais

### Violações Críticas — Backend

- ❌ Camadas misturadas (lógica em routes, por exemplo)
- ❌ Funções sync em contexto async
- ❌ Validação Pydantic ausente em endpoints
- ❌ CORS não configurado
- ❌ JWT não implementado (se auth)
- ❌ Type hints ausentes
- ❌ Erros não tratados (sem try/except ou HTTPException)
- ❌ MongoDB usado antes da ETAPA 3

### Violações Críticas — Integração

- ❌ Contratos HTTP incompatíveis
- ❌ CORS bloqueando frontend
- ❌ Autenticação não funcional
- ❌ Tokens não propagados corretamente

### Violações de Escopo

- ❌ Funcionalidades não documentadas no Passaporte
- ❌ Dependências externas na ETAPA MOC (permitido apenas ETAPA 3)
- ❌ Alterações em arquivos institucionais
- ❌ Criação de páginas não solicitadas

**Se bloqueio ocorrer:**

1. Documentar violação detalhadamente
2. Acionar 003_AGENTE_REFATORADOR
3. Se refatorador não conseguir corrigir, escalar para humano

---

## 6. Checklist de Conformidade

### Frontend Next.js

- [ ] Usa apiClient para todas as requisições HTTP
- [ ] Não acessa MongoDB diretamente
- [ ] Componentes shared vs feature organizados
- [ ] AuthContext configurado e funcional
- [ ] Middleware de proteção de rotas implementado
- [ ] `npm run build` executa sem erros
- [ ] TypeScript types corretos
- [ ] Styled Components (sem Tailwind)
- [ ] Estados visuais implementados
- [ ] Responsivo (3 breakpoints)

### Backend Python/FastAPI

- [ ] Camadas separadas corretamente:
  - routes → services → repositories → models
- [ ] Todas as funções são `async`
- [ ] Motor usado corretamente (se aplicável)
- [ ] Validação Pydantic em todos os endpoints
- [ ] Tratamento de erros com HTTPException
- [ ] JWT implementado (se auth)
- [ ] CORS configurado para http://localhost:3000
- [ ] Logger estruturado
- [ ] Type hints em todas as funções
- [ ] `uvicorn app.main:app` inicia sem erros
- [ ] Ambiente virtual ativo (.venv)
- [ ] requirements.txt atualizado

### Integração

- [ ] Contratos HTTP respeitados (mesmos campos)
- [ ] Autenticação end-to-end funcional
- [ ] Refresh token operacional
- [ ] Erros HTTP tratados no frontend
- [ ] CORS permite todas as requisições necessárias
- [ ] Tokens propagados corretamente (headers)

---

## 7. Saída do Pipeline

Ao final do pipeline, o projeto deve estar:

- ✅ **Visualmente consistente** — Frontend polido
- ✅ **Arquiteturalmente conforme** — Camadas respeitadas
- ✅ **Funcional** — Builds limpos, backend iniciando
- ✅ **Documentado** — Histórico registrado
- ✅ **Auditado** — Sem violações críticas
- ✅ **Testável** — Pode ser testado manualmente
- ✅ **Pronto para próxima etapa** — Pode avançar no fluxo

**Status possíveis:**

- ✅ **APROVADO** — Sem violações, pode prosseguir
- ⚠️ **APROVADO COM RESSALVAS** — Violações menores documentadas, pode prosseguir
- ❌ **BLOQUEADO** — Violações críticas não corrigidas, não pode prosseguir

---

## 8. Processo de Execução

### 8.1 Input do Pipeline

- Código do frontend Next.js
- Código do backend Python/FastAPI
- Passaporte da Criação ou do Produto
- Dossiês da stack (frontend e backend)
- Referências visuais

### 8.2 Fluxo Completo

```
┌─────────────────────────────────────────┐
│  AGENTE_CRIADOR ou AGENTE_EVOLUTOR      │
│  entrega código (frontend + backend)    │
└──────────────┬──────────────────────────┘
               ↓
┌──────────────────────────────────────────┐
│  P1: AGENTE_F_DESIGNER                   │
│  ✓ Ajusta visual do frontend             │
└──────────────┬───────────────────────────┘
               ↓
┌──────────────────────────────────────────┐
│  P2: AGENTE_AUDITOR                      │
│  ✓ Audita frontend + backend             │
│  → APROVADO / RESSALVAS / BLOQUEADO      │
└──────────────┬───────────────────────────┘
               ↓
         ┌─────┴─────┐
         │ BLOQUEADO?│
         └─────┬─────┘
               │ Não → Pula P3
               │ Sim ↓
┌──────────────────────────────────────────┐
│  P3: AGENTE_REFATORADOR                  │
│  ✓ Corrige violações                     │
└──────────────┬───────────────────────────┘
               ↓
┌──────────────────────────────────────────┐
│  P4: Revalidação                         │
│  ✓ AGENTE_F_DESIGNER (novamente)         │
│  ✓ AGENTE_AUDITOR (novamente)            │
└──────────────┬───────────────────────────┘
               ↓
┌──────────────────────────────────────────┐
│  P5: Registro Histórico                  │
│  ✓ Documenta em historico/pipelines/     │
└──────────────┬───────────────────────────┘
               ↓
         ┌─────────────┐
         │   APROVADO  │
         │ Pode avançar│
         └─────────────┘
```

### 8.3 Output do Pipeline

- Código frontend refinado
- Código backend refinado
- Relatório de auditoria
- Relatório de refatoração (se aplicável)
- Registro histórico
- Status final (APROVADO / APROVADO COM RESSALVAS / BLOQUEADO)

---

## 9. Integração com FLUXO_ORQUESTRADOR_CENTRAL

Este pipeline é chamado automaticamente por:

- **FASE 1.4** — Após criação da estrutura
- **FASE 2.4** — Após implementação de cada página
- **FASE 3.2** — Após integração com MongoDB

**Exemplo de chamada no fluxo:**

```markdown
### FASE 1.4 — Pipeline de Qualidade da Estrutura

**Objetivo:** Garantir estrutura funcional e sem erros visuais/build

**Playbook Responsável:** {{STACK_ROOT_DIR}}/{{STACK_PREFIX}}\_02-playbooks/{{STACK_PREFIX}}\_PLAYBOOK_PIPELINE.md

**Processo (ciclo até aprovação):**

1. AGENTE_F_DESIGNER ajusta visual
2. AGENTE_AUDITOR audita conformidade
3. AGENTE_REFATORADOR corrige (se necessário)
4. Revalidação
5. Registro histórico

**Critério de Aprovação:** Status APROVADO ou APROVADO COM RESSALVAS
```

---

**Governança Técnica**  
Engenharia de Software — Stack 003 — v2.0

© 2026 - Documentação Institucional Oficial
