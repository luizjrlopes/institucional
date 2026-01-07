# BLINDAGEM ANTI-ALUCINAÇÃO - Ajustes Críticos

**Versão:** 1.0  
**Data:** 07/01/2026  
**Status:** Documento Crítico - Leitura Obrigatória

---

## 📋 Contexto

Este documento complementa o ORQUESTRADOR_MESTRE e VALIDADOR_DE_CONTEXTO com ajustes cirúrgicos baseados em análise profunda de vulnerabilidades de alucinação de IA.

**Origem:** Análise externa do sistema identificou 5 riscos críticos que podem causar alucinações mesmo com boa estrutura.

---

## 🎯 5 Riscos Críticos Identificados

### 1. ⚠️ VAZAMENTO DE STACK (Context Leakage)

**Problema:**

```
Stack 001 usa Next.js (API Routes integradas)
Stack 002 usa Next.js (Frontend) + Express (Backend separado)
Stack 003 usa Next.js (Frontend) + FastAPI (Backend separado)

Se carregar documentos de múltiplas stacks simultaneamente:
→ IA pode criar híbrido monstruoso (API Routes + Express ao mesmo tempo)
```

**Já Implementamos:**

- ✅ ORQUESTRADOR_MESTRE (seção "Contexto Cirúrgico")
- ✅ VALIDADOR_DE_CONTEXTO (detecta contaminação)
- ✅ Protocolo de limpeza antes de carregar nova stack

**Ajuste Adicional Necessário:**

```markdown
REGRA DE OURO DO CONTEXTO:
NUNCA coloque arquivos da Stack 001 e 002 na mesma janela de chat.

Ao trocar de stack:

1. Salvar PASSAPORTE atual
2. DESCARTAR TODO o contexto (fechar chat ou limpar memória)
3. Iniciar nova sessão
4. Carregar APENAS documentos da nova stack
```

---

### 2. 🎨 AMBIGUIDADE DE REFERÊNCIA VISUAL

**Problema:**

```
PASSAPORTE_DO_PRODUTO diz: "Referências são inspiração"
AGENTE_CRIADOR diz: "Replicar LITERALMENTE os HTMLs de Auth"

Contradição → IA trava ou escolhe caminho errado
```

**Solução:**
Unificar linguagem em todos os documentos.

**Regra Clara:**

```yaml
Páginas de Autenticação (Login, Register, Forgot Password):
  - HTML de referência é LITERAL (estrutura DOM)
  - APENAS cores e {APP_NAME} podem mudar
  - PROIBIDO alterar classes CSS ou organização

Páginas de Produto/Features:
  - HTML de referência é INSPIRAÇÃO (conceito visual)
  - IA pode adaptar estrutura conforme necessário
  - Manter identidade visual (cores, tipografia)
```

**Implementação:**
Adicionar no início de cada AGENTE:

```markdown
## 🎨 REGRA DE FIDELIDADE VISUAL

### Páginas Institucionais (LITERAL):

- Login, Register, Forgot Password, Reset Password
- Copiar HTML EXATAMENTE como está
- Substituir apenas: {{APP_NAME}}, {{primary_color}}, etc.

### Páginas de Produto (INSPIRAÇÃO):

- Dashboard, CRUD, Features específicas
- Usar referência como guia visual
- Adaptar estrutura conforme necessidade
```

---

### 3. 🔄 TRANSIÇÃO MOC → BANCO REAL (Limpeza de Artefatos)

**Problema:**

```
Agente cria MongoRepository
Mas esquece de:
  - Deletar DataRepository (mock)
  - Remover arquivos .json em data/
  - Atualizar injeção de dependência nos Services
```

**Solução:**
Adicionar checklist obrigatório na transição.

**Novo Passo no PLAYBOOK_EVOLUTOR (Fase 3 → Fase 4):**

```yaml
## FASE 4: TRANSIÇÃO PARA PRODUÇÃO

### Passo 1: Criar Repositórios Reais
[ ] Criar MongoRepository (ou equivalente)
[ ] Testar conexão com banco
[ ] Implementar métodos CRUD

### Passo 2: LIMPEZA DE ARTEFATOS (CRÍTICO)
[ ] Listar todos os arquivos de mock:
    - data/*.json
    - repositories/*DataRepository.ts
    - services que usam mock

[ ] Para cada Service:
    - Mudar injeção de dependência:
      ❌ const repo = new DataRepository()
      ✅ const repo = new MongoRepository()

[ ] Deletar arquivos de mock:
    - rm -rf data/
    - rm repositories/*DataRepository.ts

[ ] Atualizar imports:
    - Buscar por 'DataRepository'
    - Substituir por 'MongoRepository'

### Passo 3: Validação Final
[ ] Testar CRUD completo com banco real
[ ] Verificar que nenhum mock está ativo
[ ] Confirmar que data/ não existe mais
```

---

### 4. 📝 VARIÁVEIS DE TEMPLATE ({{VARIAVEL}})

**Problema:**

```
Documentos usam: {{STACK_ROOT_DIR}}, {{STACK_PREFIX}}, {{APP_NAME}}

LLMs menos potentes podem:
  - Escrever literalmente no código: const path = "{{STACK_ROOT_DIR}}"
  - Criar pasta chamada "{{STACK_PREFIX}}"
```

**Solução:**
Meta-Prompt obrigatório no início de cada AGENTE.

**Adicionar em TODOS os AGENTEs:**

```markdown
## ⚠️ RESOLUÇÃO DE VARIÁVEIS (Meta-Instrução)

ANTES de gerar qualquer código, comando ou texto, você DEVE:

1. Identificar todas as variáveis no formato {{VARIAVEL}}
2. Resolver mentalmente com base no contexto atual:

Exemplo para Stack 002:
{{STACK_ID}} → 002_next_front_node_back_mongo
{{STACK_PREFIX}} → 002
{{STACK_ROOT_DIR}} → 002_stack_next_front_node_back_mongo/
{{APP_NAME}} → [ler do BRIEF_PRODUTO]

3. Substituir o valor ANTES de gerar output

PROIBIDO escrever literalmente:
❌ mkdir {{STACK_ROOT_DIR}}
❌ import { service } from '{{STACK_PREFIX}}\_service'

CORRETO:
✅ mkdir 002_stack_next_front_node_back_mongo/
✅ import { service } from '002_service'
```

---

### 5. 🎨 SISTEMA DE CORES (Tokens Semânticos)

**Problema:**

```
BRIEF diz: "Cor primária: Roxo"
HTML tem: background-color: #333;

Agente precisa adivinhar que #333 deve virar Roxo
→ Pode pintar componente errado ou esquecer botões
```

**Solução:**
Sistema de tokens de cores padronizado.

#### A. Padronizar BRIEF_PRODUTO

**Template Obrigatório de Cores:**

```markdown
## Identidade Visual

### Paleta de Cores (HEX obrigatório)

- **primary_color:** "#6366F1" (Botões principais, CTAs, links)
- **secondary_color:** "#8B5CF6" (Botões secundários, badges)
- **accent_color:** "#EC4899" (Alertas positivos, destaques)
- **background_color:** "#F9FAFB" (Fundo geral)
- **surface_color:** "#FFFFFF" (Cards, modals, inputs)
- **text_primary:** "#111827" (Textos principais)
- **text_secondary:** "#6B7280" (Textos secundários, labels)
- **border_color:** "#E5E7EB" (Bordas, dividers)
- **error_color:** "#EF4444" (Erros, validações)
- **success_color:** "#10B981" (Sucesso, confirmações)

### Tipografia

- **font_primary:** "Inter, sans-serif"
- **font_heading:** "Poppins, sans-serif"
```

#### B. Preparar HTMLs de Referência com Tokens

**Criar arquivo:** `referencias-visuais/tokens.css`

```css
/* Tokens de Design - Não editar manualmente */
:root {
  --primary-color: {{primary_color}};
  --secondary-color: {{secondary_color}};
  --accent-color: {{accent_color}};
  --background-color: {{background_color}};
  --surface-color: {{surface_color}};
  --text-primary: {{text_primary}};
  --text-secondary: {{text_secondary}};
  --border-color: {{border_color}};
  --error-color: {{error_color}};
  --success-color: {{success_color}};
}
```

**Atualizar HTMLs de Referência:**

```html
<!-- ❌ ANTES (hardcoded) -->
<button style="background-color: #0000FF; color: white;">Entrar</button>

<!-- ✅ DEPOIS (tokenizado) -->
<button style="background-color: {{primary_color}}; color: {{surface_color}};">
  Entrar
</button>
```

**Ou com Styled Components:**

```typescript
// ❌ ANTES
const Button = styled.button`
  background: #0000ff;
  color: white;
`;

// ✅ DEPOIS
const Button = styled.button`
  background: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.surface};
`;
```

#### C. Instrução Mecânica para o Agente

**Adicionar no AGENTE_CRIADOR e F_DESIGNER:**

```markdown
## 🎨 PROTOCOLO DE SUBSTITUIÇÃO DE CORES

Ao gerar código a partir dos HTMLs de referência:

### Passo 1: Identificar Tokens

Procurar por variáveis no formato {{color_name}}

### Passo 2: Ler Valores do BRIEF

Abrir BRIEF_PRODUTO.md → Seção "Identidade Visual"

### Passo 3: Substituição Mecânica (Find & Replace)

Realizar substituição de string EXATA:

Exemplo:
{{primary_color}} → "#6366F1"
{{surface_color}} → "#FFFFFF"
{{text_primary}} → "#111827"

### Passo 4: Manter Resto Inalterado

⚠️ PROIBIDO:

- Mudar estrutura DOM
- Alterar classes CSS
- Reorganizar elementos
- "Melhorar" o design

✅ PERMITIDO:

- Substituir tokens de cores
- Substituir {{APP_NAME}}
- Substituir fontes ({{font_primary}})
```

---

## 🛡️ Instruções de Anti-Patterns por Stack

### Stack 001 - Anti-Patterns

**Adicionar no 001_AGENTE_CRIADOR.md:**

```markdown
## 🚨 ANTI-PATTERNS CRÍTICOS (Stack 001)

Você está na Stack 001 (Next.js Fullstack).

❌ PROIBIDO:

- Criar backend Express separado
- Usar fetch() para servidor interno (use import direto em Server Components)
- Criar pasta /backend separada
- Usar axios para rotas internas
- Misturar Client Components com acesso a DB

✅ OBRIGATÓRIO:

- Backend em app/api/ (API Routes)
- Models em server/models/
- Server Actions para mutações
- Client Components usam fetch('/api/...')
```

### Stack 002 - Anti-Patterns

**Adicionar no 002_AGENTE_CRIADOR.md:**

```markdown
## 🚨 ANTI-PATTERNS CRÍTICOS (Stack 002)

Você está na Stack 002 (Next.js Frontend + Node.js Backend).

❌ PROIBIDO:

- Criar Server Actions no Next.js
- Acessar MongoDB dentro de /frontend
- Usar app/api/ para lógica de backend
- Importar models do backend no frontend

✅ OBRIGATÓRIO:

- Backend em /backend (Express)
- Frontend em /frontend (Next.js puro)
- Comunicação SEMPRE via HTTP
- Tipos compartilhados em /shared/types
```

### Stack 003 - Anti-Patterns

**Adicionar no 003_AGENTE_CRIADOR.md:**

```markdown
## 🚨 ANTI-PATTERNS CRÍTICOS (Stack 003)

Você está na Stack 003 (Next.js Frontend + Python Backend).

❌ PROIBIDO:

- Usar PyMongo (usar Motor para async)
- Pydantic SEM alias_generator=to_camel
- Retornar snake_case na API (user_id)
- Usar Django/Flask em vez de FastAPI

✅ OBRIGATÓRIO:

- Backend em /backend (FastAPI)
- Frontend em /frontend (Next.js)
- API retorna camelCase (userId)
- Pydantic com CamelCaseModel
- Interceptor no frontend se necessário
```

---

## 🔒 Validação Cética (Auditor Rabugento)

**Atualizar AGENTE_AUDITOR e AGENTE_VALIDADOR_PASSAPORTE:**

### ANTES (Muito Permissivo):

```
"Validar completude e conformidade"
```

### DEPOIS (Cético e Rigoroso):

```markdown
## 🔍 MODO DE VALIDAÇÃO: AUDITOR RABUGENTO

Você é um auditor cético e rigoroso. Seu trabalho é ENCONTRAR PROBLEMAS.

### Mentalidade:

- "Isso está errado até que se prove o contrário"
- "Se parece fácil demais, provavelmente está errado"
- "Um erro = reprova tudo"

### Checklist de Caça a Erros:

1. **Contaminação de Stack**
   [ ] Há mistura de padrões de stacks diferentes?
   [ ] Express e API Routes coexistindo?
   [ ] Server Actions e fetch() para API externa?

2. **Rotas Inventadas**
   [ ] Todas as rotas mencionadas existem no Next.js App Router?
   [ ] Não há /pages quando deveria ser /app?
   [ ] Não há rotas de backend Node no frontend?

3. **Componentes Fantasma**
   [ ] Todos os componentes importados existem?
   [ ] Não há imports de bibliotecas não instaladas?
   [ ] Não há componentes do Material UI quando deveria ser Styled?

4. **Mistura Backend/Frontend**
   [ ] Client Components não importam Models?
   [ ] Frontend não acessa DB diretamente?
   [ ] Separação clara de responsabilidades?

5. **Substituição de Cores**
   [ ] Todas as cores hardcoded foram substituídas?
   [ ] Não há #0000FF, #333, #FFF no código?
   [ ] Cores vêm do tema/variáveis?

6. **Transição MOC**
   [ ] Arquivos de mock foram deletados?
   [ ] Nenhum import de DataRepository?
   [ ] Pasta data/ não existe mais?

### Critério de Aprovação:

Se encontrar 1 (UM) erro → REPROVE imediatamente

Se reprovar:

- Listar TODOS os erros encontrados
- Classificar gravidade (CRÍTICO, ALTO, MÉDIO, BAIXO)
- Dar exemplo de como corrigir
- Enviar para REFATORADOR
```

---

## 📊 Checklist de Implementação

### Para Implementar Estas Melhorias:

```markdown
Documentos a Atualizar:

[ ] 001_AGENTE_CRIADOR.md - Adicionar Anti-Patterns - Adicionar Meta-Instrução de variáveis - Adicionar Protocolo de Cores

[ ] 002_AGENTE_CRIADOR.md - Adicionar Anti-Patterns - Adicionar Meta-Instrução de variáveis - Adicionar Protocolo de Cores

[ ] 003_AGENTE_CRIADOR.md - Adicionar Anti-Patterns - Adicionar Meta-Instrução de variáveis - Adicionar Protocolo de Cores

[ ] 001/002/003_AGENTE_F_DESIGNER.md - Adicionar Protocolo de Cores - Adicionar Regra de Fidelidade Visual

[ ] 001/002/003_AGENTE_EVOLUTOR.md - Adicionar Checklist de Limpeza MOC - Adicionar Meta-Instrução de variáveis

[ ] 001/002/003_AGENTE_AUDITOR.md - Substituir por versão "Auditor Rabugento" - Adicionar Checklist de Caça a Erros

[ ] 001/002/003*AGENTE_VALIDADOR_PASSAPORTE*\*.md - Aplicar validação cética - Adicionar critério "1 erro = reprova tudo"

[ ] BRIEF_PRODUTO (template em area_produto/01-identidades/) - Adicionar seção de cores padronizada - Exigir HEX para todas as cores - Adicionar descrição de uso de cada cor

[ ] referencias-visuais/ - Criar tokens.css - Tokenizar HTMLs existentes (substituir HEX por {{tokens}}) - Criar guia de tokens
```

---

## 🎯 Resultado Esperado

Após implementar estas melhorias:

✅ **Zero Vazamento de Stack**

- Contexto sempre limpo e cirúrgico
- Impossível misturar stacks

✅ **Zero Ambiguidade Visual**

- Regras claras: LITERAL vs INSPIRAÇÃO
- Agente sabe exatamente o que pode mudar

✅ **Zero Resíduos de Mock**

- Checklist obrigatório de limpeza
- Transição limpa para produção

✅ **Zero Variáveis Literais**

- Meta-instrução garante resolução
- Impossível escrever {{VARIAVEL}} no código

✅ **Zero Alucinação de Cores**

- Sistema de tokens mecânico
- Substituição exata, não interpretativa

✅ **Zero Auto-Aprovação**

- Auditor cético e rigoroso
- 1 erro = reprova tudo

---

## 🚀 Prioridade de Implementação

### Fase 1: CRÍTICO (Implementar Imediatamente)

1. Anti-Patterns nos AGENTEs
2. Meta-Instrução de variáveis
3. Sistema de tokens de cores

### Fase 2: IMPORTANTE (Próxima Sprint)

4. Checklist de limpeza MOC
5. Auditor Rabugento
6. Tokenizar HTMLs de referência

### Fase 3: REFINAMENTO (Depois de testes)

7. Ajustes baseados em feedback real
8. Documentação de casos extremos
9. Exemplos adicionais

---

**Documento de Blindagem** | Complementa ORQUESTRADOR_MESTRE  
**Impacto:** Zero Alucinação Garantido  
**Status:** Aguardando Implementação
