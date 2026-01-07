# FLUXO_ORQUESTRADOR_CENTRAL.md

Fluxo Central de Orquestração — Sistema Multi-Stack

**Versão:** v2.1 — Fluxo Meta Agnóstico de Stack + Protocolo Anti-Alucinação

---

## 0. Integração com ORQUESTRADOR_MESTRE

> **ATENÇÃO:** Este fluxo agora opera em conjunto com o [ORQUESTRADOR_MESTRE.md](../ORQUESTRADOR_MESTRE.md).

### Hierarquia de Documentos

```
ORQUESTRADOR_MESTRE.md          ← Protocolo operacional (Boot, Check-Wait-Act)
    ↓
FLUXO_ORQUESTRADOR_CENTRAL.md   ← Pipeline de fases (D0→D1→D2→D3→D4)
    ↓
MAPA_STACK_*.md                 ← Estrutura específica da stack
    ↓
DOSSIE_REGRAS_DE_CRIACAO.md     ← Regras técnicas detalhadas
    ↓
PLAYBOOK_*.md                   ← Instruções de execução por papel
```

### Regra de Precedência

```
ORQUESTRADOR_MESTRE > REGRAS SUPREMAS > FLUXO_ORQUESTRADOR > DOSSIE > PLAYBOOK > PASSAPORTE
```

### Quando Usar Cada Documento

- **ORQUESTRADOR_MESTRE:** Sempre ler PRIMEIRO. Define boot sequence e protocolo Check-Wait-Act.
- **FLUXO_ORQUESTRADOR_CENTRAL:** Define a sequência de fases (D0→D1→D2...) e transições entre etapas.
- **Outros documentos:** Carregados conforme instruções do Orquestrador Mestre.

---

## 1. Natureza do Fluxo Central

Este fluxo **não executa tarefas técnicas** e **não conhece especificidades de stacks**.

Ele existe para:

- coordenar agentes independente da stack escolhida
- aplicar regras institucionais universais
- selecionar stack baseado no BRIEF_PRODUTO
- garantir ordem correta de execução das fases
- carregar dinamicamente os documentos da stack selecionada
- **garantir contexto cirúrgico sem contaminação entre stacks**

**Princípio de Independência de Stack:**

- Este fluxo funciona para qualquer stack (001, 002, 003, etc.)
- Decisões técnicas estão nos MAPA_STACK e DOSSIÊS de cada stack
- Playbooks e Agentes são específicos por stack e carregados dinamicamente

Em caso de conflito, **os Playbooks da stack sempre prevalecem**.

---

## 2. Pré-condição Absoluta

Antes de qualquer execução:

### 2.1 Localização do BRIEF_PRODUTO

O arquivo **BRIEF_PRODUTO.md** deve ser criado obrigatoriamente em:

```text
/./area_produto/01-identidades/BRIEF_PRODUTO.md
```

**Estrutura mínima obrigatória:**

```markdown
# BRIEF DO PRODUTO

## Identificação da Stack

stack_id: 001_next_fullstack_mongo
```

### 2.2 Validações Obrigatórias

- ✅ Deve existir `BRIEF_PRODUTO.md` no caminho especificado
- ✅ Deve existir campo `stack_id` válido no BRIEF_PRODUTO
- ✅ O stack_id deve corresponder a uma pasta existente em `/./`
- ✅ Nenhum contexto de outra stack deve estar carregado na memória

**Valores válidos para stack_id:**

- `001_next_fullstack_mongo` (Next.js Fullstack + MongoDB)
- `002_next_front_node_back_mongo` (Next.js Frontend + Node.js Backend + MongoDB)
- `003_next_front_python_back_mongo` (Next.js Frontend + Python Backend + MongoDB)

Sem essas validações, o sistema entra em estado **BLOQUEADO**.

### 2.3 Protocolo de Contexto Cirúrgico

**ANTES de carregar qualquer documento da stack selecionada:**

1. **DESCARTAR** todo contexto de stacks anteriores
2. **VALIDAR** que não há referências cruzadas na memória
3. **LIMPAR** variáveis de configuração de stack anterior
4. **CARREGAR** EXCLUSIVAMENTE documentos da nova stack

**Checklist de Limpeza:**

```markdown
[ ] Contexto de stack anterior descartado
[ ] Nenhuma variável de outra stack em memória
[ ] Nenhum import de dossiê/playbook de outra stack
[ ] PASSAPORTE anterior salvo e fechado (se existir)
[ ] Pronto para carregar nova stack
```

---

## 3. Sequência Central de Execução

> **Nota:** Este fluxo está organizado em **3 GRANDES ETAPAS** que seguem uma ordem obrigatória:
>
> 1. **ETAPA DE CRIAÇÃO** - Estrutura base funcional (login, register, home vazia)
> 2. **ETAPA DE CONSTRUÇÃO (MOCK)** - Páginas do produto com dados simulados
> 3. **ETAPA DE INTEGRAÇÃO** - Substituição de MOCs por banco de dados real

---

## 📘 ETAPA 1: CRIAÇÃO DA ESTRUTURA BASE

### FASE 0 — Inicialização e Seleção de Stack

**Objetivo:** Carregar contexto da stack selecionada de forma cirúrgica

**Entradas:**

- `BRIEF_PRODUTO.md` com `stack_id` definido
- **ORQUESTRADOR_MESTRE.md** (já deve estar carregado)

**Processo (Seguindo Protocolo do ORQUESTRADOR_MESTRE):**

#### Step 1: Boot Sequence

```markdown
1. VALIDAR que ORQUESTRADOR_MESTRE.md está carregado
2. PERGUNTAR ao usuário: "Qual Stack ID você deseja utilizar?"
3. VALIDAR que o Stack ID é válido (existe no CATALOGO_STACKS)
4. EXECUTAR Protocolo de Limpeza de Contexto (seção 2.3)
```

#### Step 2: Context Loading (Contexto Cirúrgico)

```markdown
1. Ler BRIEF_PRODUTO.stack_id (ex: 001_next_fullstack_mongo)
2. Resolver stack_root_dir via CATALOGO_STACKS.md
   - Exemplo: 001_next_fullstack_mongo → 001_stack_next_fullstack_mongo/
3. Carregar EXCLUSIVAMENTE os seguintes documentos:

   Fase 1 - Documentos Estruturais (Ordem obrigatória):
   a) CATALOGO_STACKS.md
   b) MAPA_INSTITUCIONAL_CENTRAL.md
   c) FLUXO_ORQUESTRADOR_CENTRAL.md (este documento)

   Fase 2 - Documentos da Stack (Ordem obrigatória):
   a) {{STACK_ROOT_DIR}}/{{STACK_PREFIX}}_00-mapas_e_fluxos/{{STACK_PREFIX}}\_MAPA_STACK__.md
   b) {{STACK_ROOT_DIR}}/{{STACK_PREFIX}}*01-identidades_estrutura/{{STACK_PREFIX}}\_DOSSIE_REGRAS_DE_CRIACAO.md
   c) {{STACK_ROOT_DIR}}/{{STACK_PREFIX}}\_01-identidades_estrutura/{{STACK_PREFIX}}\_DOSSIE*__FRONTEND.md
   d) {{STACK_ROOT_DIR}}/{{STACK_PREFIX}}\_01-identidades_estrutura/{{STACK_PREFIX}}\_DOSSIE_\*\_BACKEND.md

   Fase 3 - Playbook Apropriado (Apenas 1):

   - Para criação: {{STACK_ROOT_DIR}}/{{STACK_PREFIX}}\_02-playbooks/{{STACK_PREFIX}}\_PLAYBOOK_CRIADOR.md

   Fase 4 - Passaporte:

   - Criar ou carregar: {{STACK_ROOT_DIR}}/{{STACK_PREFIX}}\_03-passaporte_de_criacao/PASSAPORTE_DE_CRIACAO.md
   - Se não existir, usar template da pasta 03-passaporte/

4. PROIBIDO carregar:
   ❌ Documentos de outras stacks
   ❌ Múltiplos playbooks simultaneamente
   ❌ Arquivos de referência antes da necessidade
```

#### Step 3: Validation

```markdown
EXECUTAR Stack Context Validator (conforme ORQUESTRADOR_MESTRE):

[ ] current_stack_id == BRIEF_PRODUTO.stack_id?
[ ] Todos arquivos carregados pertencem à mesma stack?
[ ] DOSSIE_REGRAS_DE_CRIACAO carregado?
[ ] REGRA SUPREMA da stack identificada?
[ ] PASSAPORTE criado ou carregado?
[ ] Sem referências a outras stacks?

SE QUALQUER VERIFICAÇÃO FALHAR:
ABORTAR e reportar erro específico
```

- `{{STACK_ROOT_DIR}}/{{STACK_PREFIX}}_02-playbooks/{{STACK_PREFIX}}_PLAYBOOK_*.md`
- `{{STACK_ROOT_DIR}}/{{STACK_PREFIX}}_04-agentes/{{STACK_PREFIX}}_AGENTE_*.md`

4. Restringir escopo documental exclusivamente à stack selecionada

**Bloqueio:** Qualquer referência a documentos de outra stack resulta em falha imediata

---

### FASE 1.1 — Geração do Passaporte de Criação

**Objetivo:** Planejar estrutura base (autenticação e páginas institucionais)

**Agente Responsável:** `{{STACK_ROOT_DIR}}/{{STACK_PREFIX}}_04-agentes/{{STACK_PREFIX}}_AGENTE_GERADOR_PASSAPORTE_DA_CRIACAO.md`

**Entradas:**

- BRIEF_PRODUTO.md
- Referências em `{{STACK_ROOT_DIR}}/{{STACK_PREFIX}}_05-referencias-etapa-criacao-estrutura/` (HTMLs, snippets)
- DOSSIE_REGRAS_DE_CRIACAO da stack

**Processo:**

1. Analisar referências visuais para páginas institucionais (login, register, etc.)
2. Analisar snippets disponíveis
3. Gerar `{{STACK_ROOT_DIR}}/{{STACK_PREFIX}}_03-passaporte_de_criacao/{{STACK_PREFIX}}_PASSAPORTE_DE_CRIACAO.md`

**Resultado esperado:**

- PASSAPORTE_DE_CRIACAO documentando estrutura completa
- Páginas institucionais mapeadas
- Arquivos e snippets identificados

**Próximo passo:** Validação do passaporte

---

### FASE 1.2 — Validação do Passaporte de Criação

**Objetivo:** Garantir que o passaporte está completo e executável

**Agente Responsável:** `{{STACK_ROOT_DIR}}/{{STACK_PREFIX}}_04-agentes/{{STACK_PREFIX}}_AGENTE_VALIDADOR_PASSAPORTE_DA_CRIACAO.md`

**Processo:**

1. Ler PASSAPORTE_DE_CRIACAO
2. Validar completude, coerência e executabilidade
3. Gerar RELATORIO_VALIDACAO_PASSAPORTE_DA_CRIACAO.md

**Resultado esperado:**

- ✅ Passaporte APROVADO ou
- ⚠️ APROVADO COM RESSALVAS ou
- ❌ REPROVADO (volta para FASE 1.1)

**Próximo passo:** Se aprovado, perguntar ao usuário se pode iniciar criação

---

### FASE 1.3 — Criação da Estrutura Base

**Objetivo:** Criar aplicação funcional mínima

**Agente Responsável:** `{{STACK_ROOT_DIR}}/{{STACK_PREFIX}}_04-agentes/{{STACK_PREFIX}}_AGENTE_CRIADOR.md`

**Processo:**

1. Verificar existência de PASSAPORTE_DE_CRIACAO validado
2. Executar `{{STACK_ROOT_DIR}}/{{STACK_PREFIX}}_02-playbooks/{{STACK_PREFIX}}_PLAYBOOK_CRIADOR.md`
3. Seguir `{{STACK_ROOT_DIR}}/{{STACK_PREFIX}}_01-identidades_estrutura/{{STACK_PREFIX}}_DOSSIE_REGRAS_DE_CRIACAO.md`
4. Usar referências visuais (HTMLs) de `{{STACK_ROOT_DIR}}/{{STACK_PREFIX}}_05-referencias-etapa-criacao-estrutura/referencias-visuais/`
5. Usar snippets de `{{STACK_ROOT_DIR}}/{{STACK_PREFIX}}_05-referencias-etapa-criacao-estrutura/snippets/`

**Resultado esperado:**

- Estrutura base criada conforme DOSSIE_REGRAS_DE_CRIACAO
- Páginas institucionais: /login, /register, /forgot-password, /reset-password, /email-verification
- Autenticação funcional com JWT
- Home vazia protegida acessível em /home
- Styled Components configurado (sem Tailwind/CSS inline)
- Build sem erros

**Próximo passo:** Chamar PLAYBOOK_PIPELINE

---

### FASE 1.4 — Pipeline de Qualidade da Estrutura

**Objetivo:** Garantir estrutura funcional e sem erros visuais/build

**Playbook Responsável:** `{{STACK_ROOT_DIR}}/{{STACK_PREFIX}}_02-playbooks/{{STACK_PREFIX}}_PLAYBOOK_PIPELINE.md`

**Processo (ciclo até aprovação):**

1. **AGENTE_AUDITOR** audita conformidade arquitetural
2. **AGENTE_F_DESIGNER** (se necessário) corrige problemas visuais
3. **AGENTE_REFATORADOR** (se necessário) refatora código
4. Repetir até:
   - ✅ Build sem erros
   - ✅ Auditoria aprovada
   - ✅ Visual conforme referências

**Resultado esperado:**

- Estrutura base funcional 100%
- Sem erros de build
- Sem problemas visuais
- Pronta para receber páginas do produto

**Mensagem ao usuário:**

> "✅ Criação da estrutura finalizada! Build funcional, sem erros e esteticamente conforme referências.  
> Deseja iniciar a etapa de construção do produto?"

---

## 📗 ETAPA 2: CONSTRUÇÃO DO PRODUTO (MOCK)

### FASE 2.1 — Geração do Passaporte do Produto

**Objetivo:** Planejar todas as páginas e funcionalidades do produto

**Agente Responsável:** `{{STACK_ROOT_DIR}}/{{STACK_PREFIX}}_04-agentes/{{STACK_PREFIX}}_AGENTE_GERADOR_PASSAPORTE_DO_PRODUTO.md`

**Entradas:**

- BRIEF_PRODUTO.md
- Referências em `area_produto/referencias-etapa-mock/` (HTMLs, imagens, anotações .md)
- DOSSIE_REGRAS_DE_CRIACAO da stack
- DOSSIE_BACKEND da stack
- DOSSIE_FRONTEND da stack

**Processo:**

1. Analisar BRIEF_PRODUTO para entender objetivos e funcionalidades
2. Analisar referências visuais (HTMLs, wireframes) em `referencias-etapa-mock/`
3. Analisar documentação funcional (.md) em `referencias-etapa-mock/md/`
4. Mapear páginas, componentes, rotas, estados e MOCs necessários
5. Gerar `area_produto/passaporte_do_produto/{{STACK_ID}}/PASSAPORTE_DO_PRODUTO.md`

**Resultado esperado:**

- PASSAPORTE_DO_PRODUTO completo documentando:
  - Todas as páginas do produto
  - Componentes necessários
  - Estrutura de MOCs
  - Regras de negócio
  - Fluxos de interação

**Próximo passo:** Validação do passaporte do produto

---

### FASE 2.2 — Validação do Passaporte do Produto

**Objetivo:** Garantir que o passaporte do produto está completo e executável

**Agente Responsável:** `{{STACK_ROOT_DIR}}/{{STACK_PREFIX}}_04-agentes/{{STACK_PREFIX}}_AGENTE_VALIDADOR_PASSAPORTE_DO_PRODUTO.md`

**Processo:**

1. Ler PASSAPORTE_DO_PRODUTO
2. Validar completude, coerência com dossiês e executabilidade
3. Gerar `area_produto/passaporte_do_produto/{{STACK_ID}}/RELATORIO_VALIDACAO_PASSAPORTE_DO_PRODUTO.md`

**Resultado esperado:**

- ✅ Passaporte APROVADO ou
- ⚠️ APROVADO COM RESSALVAS ou
- ❌ REPROVADO (volta para FASE 2.1)

**Mensagem ao usuário:**

> "✅ Passaporte do produto validado!  
> Deseja seguir para a elaboração das páginas do produto?"

---

### FASE 2.3 — Implementação da Página Home (com MOC)

**Objetivo:** Implementar primeira página do produto com dados simulados

**Agente Responsável:** `{{STACK_ROOT_DIR}}/{{STACK_PREFIX}}_04-agentes/{{STACK_PREFIX}}_AGENTE_EVOLUTOR.md`

**Processo:**

1. Verificar existência de PASSAPORTE_DO_PRODUTO validado
2. Executar `{{STACK_ROOT_DIR}}/{{STACK_PREFIX}}_02-playbooks/{{STACK_PREFIX}}_PLAYBOOK_EVOLUTOR.md`
3. Focar na página **home** conforme passaporte
4. Criar/atualizar MOCs em `data/` (NUNCA em `mock/data`)
5. Criar backend (routes, controllers, services, repositories com DataRepository)
6. Criar frontend (pages, components, services)
7. Implementar estados (loading, error, success)

**Restrições críticas:**

- ❌ PROIBIDO uso de banco real (MongoDB/Mongoose) nesta fase
- ✅ OBRIGATÓRIO uso de MOCs em `data/`
- ✅ OBRIGATÓRIO uso de DataRepository como adapter
- ✅ OBRIGATÓRIO seguir referências visuais do passaporte

**Próximo passo:** Chamar PLAYBOOK_PIPELINE para home

---

### FASE 2.4 — Pipeline de Qualidade da Home

**Objetivo:** Garantir home funcional, sem erros e visualmente correta

**Playbook Responsável:** `{{STACK_ROOT_DIR}}/{{STACK_PREFIX}}_02-playbooks/{{STACK_PREFIX}}_PLAYBOOK_PIPELINE.md`

**Processo (ciclo até aprovação):**

1. **AGENTE_AUDITOR** audita conformidade
2. **AGENTE_F_DESIGNER** (se necessário) ajusta visual
3. **AGENTE_REFATORADOR** (se necessário) refatora
4. Repetir até:
   - ✅ Build sem erros
   - ✅ MOCs funcionando corretamente
   - ✅ Visual conforme referências
   - ✅ Auditoria aprovada

**Resultado esperado:**

- Página home 100% funcional com MOCs
- Sem erros de build
- Visual conforme passaporte

**Mensagem ao usuário:**

> "✅ Página home implementada com sucesso!  
> Qual página deseja implementar a seguir?"

---

### FASE 2.5 — Implementação das Demais Páginas (Loop)

**Objetivo:** Implementar uma página por vez, iterativamente

**Agente Responsável:** `{{STACK_ROOT_DIR}}/{{STACK_PREFIX}}_04-agentes/{{STACK_PREFIX}}_AGENTE_EVOLUTOR.md`

**Processo (para cada página indicada pelo usuário):**

1. Usuário informa qual página implementar (ex: "/dashboard", "/perfil", "/configuracoes")
2. AGENTE_EVOLUTOR verifica página no PASSAPORTE_DO_PRODUTO
3. Implementa página conforme processo FASE 2.3
4. Chama PLAYBOOK_PIPELINE (FASE 2.4)
5. Aguarda usuário informar próxima página
6. Repete até usuário sinalizar que todas as páginas estão prontas

**Critério de Conclusão da Etapa 2:**

Usuário sinaliza que:

- ✅ Todas as páginas do produto estão funcionando corretamente com MOCs
- ✅ Não será criada mais nenhuma página ou funcionalidade
- ✅ Sistema está visualmente conforme referências
- ✅ Build sem erros

**Mensagem ao usuário:**

> "✅ Todas as páginas do produto foram implementadas com MOCs!  
> Deseja iniciar a etapa de integração com banco de dados?"

---

## 📕 ETAPA 3: INTEGRAÇÃO COM BANCO DE DADOS

### FASE 3.1 — Integração com Banco Real

**Objetivo:** Substituir MOCs por banco de dados real (MongoDB)

**Agente Responsável:** `{{STACK_ROOT_DIR}}/{{STACK_PREFIX}}_04-agentes/{{STACK_PREFIX}}_AGENTE_EVOLUTOR.md` (com permissão de banco)

**Processo:**

1. Configurar MongoDB/Mongoose (apenas nesta fase)
2. Criar schemas Mongoose para cada entidade
3. Criar MongoRepository (implementação real do Repository)
4. Substituir DataRepository por MongoRepository em cada serviço
5. Migrar dados de MOCs para banco (se aplicável)
6. Testar todas as páginas com banco real
7. Auditar integração

**Restrições:**

- ✅ Agora é permitido uso de MongoDB/Mongoose
- ✅ Repositories devem implementar mesma interface de DataRepository
- ✅ Comportamento funcional deve permanecer idêntico
- ✅ Nenhuma página pode quebrar após integração

**Validação:** Auditoria de integração com banco

**Resultado esperado:**

- Sistema 100% funcional com banco real
- MOCs removidos de `data/`
- Schemas Mongoose criados
- MongoRepository implementado
- Build sem erros

---

### FASE 3.2 — Pipeline de Qualidade Final

**Objetivo:** Garantir sistema funcional com banco real

**Playbook Responsável:** `{{STACK_ROOT_DIR}}/{{STACK_PREFIX}}_02-playbooks/{{STACK_PREFIX}}_PLAYBOOK_PIPELINE.md`

**Processo:**

1. **AGENTE_AUDITOR** audita integração com banco
2. **AGENTE_REFATORADOR** (se necessário) refatora código
3. Testar todas as páginas end-to-end
4. Validar que:
   - ✅ Todas as operações CRUD funcionam
   - ✅ Build sem erros
   - ✅ Nenhuma funcionalidade quebrou
   - ✅ Performance aceitável

**Resultado esperado:**

- Sistema 100% funcional com MongoDB
- Pronto para deploy

**Mensagem ao usuário:**

> "✅ Integração com banco de dados concluída com sucesso!  
> Sistema pronto para deploy."

---

## 📊 Resumo das 3 Etapas

### ETAPA 1: CRIAÇÃO (Estrutura Base)

- ✅ Passaporte de Criação gerado e validado
- ✅ Páginas institucionais (login, register, etc.)
- ✅ Autenticação funcional
- ✅ Home vazia protegida
- ✅ Build sem erros

### ETAPA 2: CONSTRUÇÃO (Mock)

- ✅ Passaporte do Produto gerado e validado
- ✅ Todas as páginas do produto implementadas
- ✅ MOCs funcionando em `data/`
- ✅ Visual conforme referências
- ✅ Build sem erros

### ETAPA 3: INTEGRAÇÃO (Banco Real)

- ✅ MongoDB configurado
- ✅ Schemas Mongoose criados
- ✅ MongoRepository implementado
- ✅ MOCs substituídos por banco real
- ✅ Sistema pronto para deploy

---

## ⚠️ Regras de Transição Entre Etapas

1. **ETAPA 1 → ETAPA 2:** Só avança com estrutura base 100% funcional e validada
2. **ETAPA 2 → ETAPA 3:** Só avança quando usuário confirmar que todas as páginas estão prontas
3. **Não é permitido voltar etapas:** Cada etapa deve ser concluída antes de avançar
4. **Bloqueio absoluto:** Sem passaportes validados, não há implementação

---

**Objetivo:** Garantir conformidade antes de avançar

**Agentes Responsáveis:**

- `{{STACK_ROOT_DIR}}/{{STACK_PREFIX}}_04-agentes/{{STACK_PREFIX}}_AGENTE_AUDITOR.md` (sempre)
- `{{STACK_ROOT_DIR}}/{{STACK_PREFIX}}_04-agentes/{{STACK_PREFIX}}_AGENTE_F_DESIGNER.md` (se necessário)
- `{{STACK_ROOT_DIR}}/{{STACK_PREFIX}}_04-agentes/{{STACK_PREFIX}}_AGENTE_REFATORADOR.md` (se necessário)

**Processo:**

1. Executar `{{STACK_ROOT_DIR}}/{{STACK_PREFIX}}_02-playbooks/{{STACK_PREFIX}}_PLAYBOOK_PIPELINE.md`
2. Auditar conformidade arquitetural
3. Corrigir não conformidades

---

## 4. Regras de Bloqueio Universais

O fluxo deve bloquear imediatamente em qualquer stack se:

### 4.1 Violações de Escopo

- ❌ Documento de outra stack for referenciado ou utilizado
- ❌ Playbook de outra stack for executado
- ❌ Agente de outra stack for invocado

### 4.2 Violações Arquiteturais

- ❌ Auditor reprovar conformidade
- ❌ Código violar dossiês da stack selecionada
- ❌ Tailwind ou estilos inline forem usados (apenas Styled Components permitido)

### 4.3 Violações de Processo

- ❌ PASSAPORTE_DE_CRIACAO inválido ou ausente (ETAPA 1)
- ❌ PASSAPORTE_DO_PRODUTO inválido ou ausente (ETAPA 2)
- ❌ Página criada sem estar no passaporte correspondente
- ❌ MongoDB/Mongoose usado antes da ETAPA 3
- ❌ MOCs criados fora de `data/` (ex: `mock/data` é proibido)

### 4.4 Violações de Governança

- ❌ Decisão de produto for exigida sem BRIEF_PRODUTO atualizado
- ❌ BRIEF_PRODUTO sem `stack_id` definido
- ❌ Tentativa de mudar stack após Fase 1 iniciada

---

## 5. Independência de Stack — Regras de Implementação

### 5.1 Como o Fluxo Central Funciona com Múltiplas Stacks

O FLUXO_ORQUESTRADOR_CENTRAL é **agnóstico de tecnologia**. Ele:

1. **Não conhece** Next.js, Node.js, Python, MongoDB, etc.
2. **Não decide** arquitetura ou padrões técnicos
3. **Apenas coordena** fases e agentes baseado no `stack_id`

### 5.2 Responsabilidades por Nível

**FLUXO_ORQUESTRADOR_CENTRAL (este documento):**

- Define fases universais (Inicialização, Criação, Planejamento, Evolução, etc.)
- Define regras de bloqueio universais
- Coordena ordem de execução

**MAPA*STACK*<stack_id> (específico por stack):**

- Define arquitetura técnica (Next.js fullstack vs Next.js + Node.js vs Next.js + Python)
- Define decisões tecnológicas (MongoDB vs PostgreSQL, Styled Components vs outro)
- Define estrutura de pastas e organização

**DOSSIÊS\_<stack_id> (específicos por stack):**

- Regras de criação detalhadas
- Padrões de backend (controllers, services, repositories)
- Padrões de frontend (components, pages, services)

**PLAYBOOKS\_<stack_id> (específicos por stack):**

- Procedimentos operacionais para cada agente
- Comandos e ferramentas específicas da stack

**AGENTES\_<stack_id> (específicos por stack):**

- Implementação concreta para a stack escolhida
- Conhecem ferramentas e frameworks específicos

### 5.3 Carregamento Dinâmico de Documentos

Quando `BRIEF_PRODUTO.stack_id = "001_next_fullstack_mongo"`:

```plaintext
./
   mapas_e_fluxos_centrais/
      ✅ FLUXO_ORQUESTRADOR_CENTRAL.md (este arquivo - sempre carregado)
      ✅ MAPA_INSTITUCIONAL_CENTRAL.md (sempre carregado)

   001_stack_next_fullstack_mongo/
      ✅ {{STACK_PREFIX}}_00-mapas_e_fluxos/{{STACK_PREFIX}}_MAPA_STACK_NEXT_FULLSTACK_MONGO.md
      ✅ {{STACK_PREFIX}}_01-identidades_estrutura/*.md (todos os dossiês)
      ✅ {{STACK_PREFIX}}_02-playbooks/*.md (todos os playbooks)
      ✅ {{STACK_PREFIX}}_04-agentes/*.md (todos os agentes)

   002_stack_next_node_mongo/
      ❌ Nenhum documento desta stack pode ser carregado

   003_stack_next_python_mongo/
      ❌ Nenhum documento desta stack pode ser carregado
```

Quando `BRIEF_PRODUTO.stack_id = "002_next_node_mongo"`:

- Carrega documentos de `002_stack_next_node_mongo/`
- Ignora todas as outras stacks

### 5.4 Exemplo de Execução Multi-Stack

**Projeto A:** E-commerce com Next.js fullstack

- `stack_id = "001_next_fullstack_mongo"`
- FLUXO_ORQUESTRADOR_CENTRAL coordena
- Usa agentes e playbooks de `001_stack_next_fullstack_mongo/`

**Projeto B:** Dashboard com Next.js frontend + Node.js backend

- `stack_id = "002_next_node_mongo"`
- **Mesmo FLUXO_ORQUESTRADOR_CENTRAL** coordena
- Usa agentes e playbooks de `002_stack_next_node_mongo/`

**Projeto C:** App com Next.js frontend + Python backend

- `stack_id = "003_next_python_mongo"`
- **Mesmo FLUXO_ORQUESTRADOR_CENTRAL** coordena
- Usa agentes e playbooks de `003_stack_next_python_mongo/`

As **8 fases** são as mesmas, mas a **implementação técnica** muda conforme a stack.

---

## 6. Regra Final

Este fluxo apenas **coordena fases universais**.

Ele não decide:

- ❌ Arquitetura técnica
- ❌ Frameworks ou bibliotecas
- ❌ Padrões de código
- ❌ Estrutura de pastas

Decisões técnicas estão nos documentos da stack selecionada.

**Hierarquia de Autoridade:**

1. FLUXO_ORQUESTRADOR_CENTRAL (fases e bloqueios universais)
2. MAPA_STACK (decisões técnicas da stack)
3. DOSSIÊS (regras de implementação)
4. PLAYBOOKS (procedimentos operacionais)

Em caso de conflito, prevalece a autoridade de nível superior.
