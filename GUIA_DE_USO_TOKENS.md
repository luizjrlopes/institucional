# GUIA DE USO - Sistema de Tokens de Cores

## 🎯 Objetivo

Este sistema garante **substituição mecânica de cores** eliminando o Risco #5 (Alucinação de Cores). Os agentes NÃO inventam cores - eles fazem Find & Replace automático.

---

## 📁 Localização dos Arquivos

```
institucional/
└── [STACK_ID]_stack_*/
    └── [STACK_ID]_05-referencias-etapa-criacao-estrutura/
        └── referencias-visuais/
            └── tokens.css     ← ARQUIVO DE TOKENS
```

**Exemplo:**

```
001_stack_next_fullstack_mongo/
└── 001_05-referencias-etapa-criacao-estrutura/
    └── referencias-visuais/
        └── tokens.css
```

---

## 🎨 Estrutura do tokens.css

### 1. Variáveis CSS Personalizadas

```css
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
  --warning-color: {{warning_color}};
  --info-color: {{info_color}};
  --font-primary: {{font_primary}};
  --font-heading: {{font_heading}};
}
```

### 2. Tokens Disponíveis

| Token                  | Uso                        | Exemplo   |
| ---------------------- | -------------------------- | --------- |
| `{{primary_color}}`    | Botões primários, CTAs     | `#6366F1` |
| `{{secondary_color}}`  | Botões secundários, badges | `#8B5CF6` |
| `{{accent_color}}`     | Destaque, hover            | `#EC4899` |
| `{{background_color}}` | Fundo da página            | `#F9FAFB` |
| `{{surface_color}}`    | Cards, modais              | `#FFFFFF` |
| `{{text_primary}}`     | Texto principal            | `#111827` |
| `{{text_secondary}}`   | Texto secundário           | `#6B7280` |
| `{{border_color}}`     | Bordas de inputs           | `#E5E7EB` |
| `{{error_color}}`      | Erros, validação           | `#EF4444` |
| `{{success_color}}`    | Sucesso, confirmação       | `#10B981` |
| `{{warning_color}}`    | Avisos                     | `#F59E0B` |
| `{{info_color}}`       | Informações                | `#3B82F6` |

---

## 🔧 Protocolo de Substituição (4 Passos)

### Passo 1: Identificar Tokens no HTML

```html
<!-- ❌ ANTES (com tokens) -->
<div style="background-color: {{surface_color}}; color: {{text_primary}};">
  <button style="background-color: {{primary_color}};">Login</button>
</div>
```

### Passo 2: Ler BRIEF_PRODUTO.md

```markdown
## Paleta de Cores

- **primary_color**: `#6366F1` (Indigo)
- **secondary_color**: `#8B5CF6` (Purple)
- **surface_color**: `#FFFFFF` (White)
- **text_primary**: `#111827` (Slate-900)
```

### Passo 3: Substituir Mecanicamente (Find & Replace)

```html
<!-- ✅ DEPOIS (valores reais) -->
<div style="background-color: #FFFFFF; color: #111827;">
  <button style="background-color: #6366F1;">Login</button>
</div>
```

### Passo 4: Validar (Grep Check)

```bash
# Buscar variáveis não substituídas
grep -r "{{" --include="*.html" --include="*.tsx" --include="*.css"

# ✅ Resultado esperado: nenhum match
# ❌ Se encontrar: ERRO CRÍTICO - substituição incompleta
```

---

## 📝 Exemplos de Uso

### 1. HTML Inline Styles

```html
<!-- Com Tokens (antes da substituição) -->
<div style="background: {{surface_color}}; border: 1px solid {{border_color}};">
  <h1 style="color: {{text_primary}};">Título</h1>
  <p style="color: {{text_secondary}};">Subtítulo</p>
  <button style="background: {{primary_color}}; color: #FFFFFF;">Ação</button>
</div>

<!-- Após Substituição -->
<div style="background: #FFFFFF; border: 1px solid #E5E7EB;">
  <h1 style="color: #111827;">Título</h1>
  <p style="color: #6B7280;">Subtítulo</p>
  <button style="background: #6366F1; color: #FFFFFF;">Ação</button>
</div>
```

### 2. CSS Variables (intermediário)

```html
<link rel="stylesheet" href="tokens.css" />

<div style="background: var(--surface-color); color: var(--text-primary);">
  Conteúdo
</div>
```

### 3. Styled Components (TypeScript)

```typescript
// theme.ts (gerado pelo CRIADOR)
export const theme = {
  colors: {
    primary: "#6366F1", // substituído do BRIEF
    secondary: "#8B5CF6",
    surface: "#FFFFFF",
    textPrimary: "#111827",
  },
};

// Component.tsx
import styled from "styled-components";

const Card = styled.div`
  background-color: ${(props) => props.theme.colors.surface};
  color: ${(props) => props.theme.colors.textPrimary};
`;
```

---

## ⚙️ Fluxo de Trabalho dos Agentes

### AGENTE_CRIADOR

1. **Ler** `tokens.css` da stack correspondente
2. **Ler** `BRIEF_PRODUTO.md` do produto
3. **Aplicar** substituição mecânica (Find & Replace)
4. **Validar** com `grep` (nenhum `{{` deve permanecer)
5. **Gerar** código final com valores reais

**Comando de Validação:**

```bash
grep -r "{{" src/ --include="*.tsx" --include="*.ts" --include="*.css"
```

### AGENTE_F_DESIGNER

1. **Ler** HTMLs em `referencias-visuais/`
2. **Aplicar** protocolo de 4 passos (acima)
3. **Gerar** componentes React/Next.js
4. **Validar** ausência de tokens não resolvidos

### AGENTE_AUDITOR

**Checklist Obrigatório:**

````markdown
## ❌ ERRO CRÍTICO: Variáveis Não Substituídas

**Comando:**

```bash
grep -r "{{" src/ --include="*.tsx" --include="*.ts" --include="*.css"
```
````

**Resultado Esperado:** Nenhum match  
**Se encontrado:** BLOQUEADO - retornar ao CRIADOR

````

---

## 🚨 Anti-Padrões (Proibidos)

### ❌ ERRADO: Adivinhar Cores

```typescript
// ❌ NUNCA faça isso
const Card = styled.div`
  background-color: #3B82F6;  // ← De onde veio esse azul?
`;
````

### ❌ ERRADO: Variáveis Não Substituídas

```html
<!-- ❌ NUNCA deixe isso no código final -->
<div style="color: {{text_primary}};">Conteúdo</div>
```

### ❌ ERRADO: Criar Paleta Própria

```typescript
// ❌ NUNCA invente cores
const customColors = {
  blue: "#3B82F6", // ← Não está no BRIEF
  green: "#10B981", // ← Inventado pelo agente
};
```

### ✅ CORRETO: Substituição Mecânica

```typescript
// ✅ Lido do BRIEF_PRODUTO.md
const theme = {
  colors: {
    primary: "#6366F1", // ← Do BRIEF
    secondary: "#8B5CF6", // ← Do BRIEF
    surface: "#FFFFFF", // ← Do BRIEF
  },
};
```

---

## 🔍 Validação e Auditoria

### Checklist Completo

- [ ] **tokens.css** existe em `referencias-visuais/`
- [ ] **BRIEF_PRODUTO.md** tem HEX obrigatório para todas as cores
- [ ] **HTMLs de auth** usam tokens (antes da substituição)
- [ ] **Substituição aplicada** em todos os arquivos do projeto
- [ ] **Grep check** retorna vazio (sem `{{` no código)
- [ ] **theme.ts** (se existir) usa valores do BRIEF
- [ ] **Nenhuma cor inventada** (todas do BRIEF)

### Comandos de Validação

```bash
# 1. Buscar tokens não resolvidos
grep -r "{{" src/ --include="*.tsx" --include="*.ts" --include="*.css"

# 2. Verificar se tokens.css existe
ls institucional/001_*/001_05*/referencias-visuais/tokens.css

# 3. Validar BRIEF tem cores obrigatórias
grep -E "primary_color|secondary_color" area_produto/passaporte_do_produto/BRIEF_PRODUTO.md
```

---

## 📚 Relação com Outros Documentos

| Documento                      | Relação                                         |
| ------------------------------ | ----------------------------------------------- |
| `BRIEF_PRODUTO.md`             | **Fonte da Verdade** - Define valores HEX reais |
| `BLINDAGEM_ANTI_ALUCINACAO.md` | Define o Risco #5 (Alucinação de Cores)         |
| `AGENTE_CRIADOR.md`            | **Executor** - Aplica protocolo de 4 passos     |
| `AGENTE_F_DESIGNER.md`         | **Executor** - Normaliza cores em HTMLs         |
| `AGENTE_AUDITOR.md`            | **Validador** - Verifica ausência de `{{`       |

---

## 🎓 Resumo Executivo

**Para Agentes AI:**

1. **NÃO invente cores** - use apenas BRIEF_PRODUTO.md
2. **Aplique Find & Replace** mecânico de `{{token}}` → `#HEX`
3. **Valide com grep** antes de finalizar
4. **Bloqueie** se encontrar `{{` no código final

**Para Humanos:**

- Este sistema garante que a identidade visual do produto seja respeitada
- Elimina o risco de "cores criativas" inventadas pelos agentes
- Permite auditar rapidamente se a paleta está correta

---

**Versão:** 1.0  
**Última Atualização:** Fase 3 - Refinamento  
**Responsável:** Sistema Institucional
