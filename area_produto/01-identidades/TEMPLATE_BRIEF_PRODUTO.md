# TEMPLATE_BRIEF_PRODUTO.md

Identidade Institucional do Produto — Documento Obrigatório

**Versão:** v1.0 — Template Institucional

---

## 0. Princípio do Brief (Leitura Obrigatória)

O **Brief do Produto** é o documento que define a **identidade mínima obrigatória** de uma aplicação **antes de qualquer código específico de produto existir**.

Ele existe para:

- eliminar decisões implícitas no início da criação
- permitir que o Criador configure corretamente o projeto desde o primeiro commit
- garantir coerência visual, nominal e estrutural

O Brief:

- **não planeja páginas** (isso é papel do Passaporte)
- **não define arquitetura** (isso é papel dos Dossiês)
- **não executa tarefas** (isso é papel dos Playbooks)

Sem Brief, o projeto é considerado **institucionalmente incompleto**.

---

## 1. Identidade Básica do Produto

- **Nome oficial do produto:**
- **Nome curto (slug / uso técnico):**
- **Descrição resumida (1–2 frases):**
- **Tagline (opcional):**
- **Tipo de produto:** web | mobile | híbrido
- **Contexto de uso:** interno | público | misto

---

## 2. Posicionamento e Tom

- **Perfil do usuário principal:**
- **Tom de comunicação:** formal | neutro | casual | técnico
- **Palavras-chave associadas ao produto:**
- **Restrições de linguagem ou estilo:**

---

## 3. Identidade Visual Base

### 3.1 Tema Geral

- Tema padrão: claro | escuro | ambos
- Tema inicial ao carregar: claro | escuro

---

### 3.2 Paleta de Cores (HEX OBRIGATÓRIO)

**IMPORTANTE:** Todas as cores DEVEM ser especificadas em formato HEX (#RRGGBB) para garantir substituição mecânica nos HTMLs de referência.

#### Cores Principais

- **primary_color:** `#______` (Botões principais, CTAs, links, destaques)
- **secondary_color:** `#______` (Botões secundários, badges, elementos de suporte)
- **accent_color:** `#______` (Alertas positivos, destaques especiais, call-outs)

#### Cores de Superfície

- **background_color:** `#______` (Fundo geral da aplicação)
- **surface_color:** `#______` (Cards, modals, inputs, áreas de destaque)

#### Cores de Texto

- **text_primary:** `#______` (Textos principais, títulos, conteúdo)
- **text_secondary:** `#______` (Textos secundários, labels, hints, metadados)

#### Cores Estruturais

- **border_color:** `#______` (Bordas de elementos, dividers, separadores)

#### Cores de Estado

- **error_color:** `#______` (Erros, validações negativas, alertas críticos)
- **success_color:** `#______` (Sucesso, confirmações, validações positivas)
- **warning_color:** `#______` (Avisos, ações que requerem atenção)
- **info_color:** `#______` (Informações neutras, dicas, tooltips)

**Exemplo de preenchimento:**

```markdown
- **primary_color:** `#6366F1` (Índigo vibrante para CTAs)
- **secondary_color:** `#8B5CF6` (Roxo para elementos secundários)
- **surface_color:** `#FFFFFF` (Branco puro para cards)
- **text_primary:** `#111827` (Cinza muito escuro, quase preto)
- **background_color:** `#F9FAFB` (Cinza bem claro para fundo)
```

**Regras de Acessibilidade:**

- Contraste mínimo `text_primary` vs `surface_color`: 4.5:1 (WCAG AA)
- Contraste mínimo `text_secondary` vs `surface_color`: 4.5:1
- Contraste botões (`primary_color` com texto): 4.5:1

---

### 3.3 Tipografia

- **font_primary:** `"_____, sans-serif"` (Fonte para corpo de texto, parágrafos)
- **font_heading:** `"_____, sans-serif"` (Fonte para títulos, headings)
- **font_mono:** `"_____, monospace"` (Fonte para código, dados técnicos - opcional)
- **Fallback padrão:** sistema

**Exemplo:**

```markdown
- **font_primary:** `"Inter, -apple-system, sans-serif"` (Legibilidade em blocos de texto)
- **font_heading:** `"Poppins, -apple-system, sans-serif"` (Destaque em títulos)
```

---

### 3.4 Tokens Visuais Básicos

- **Radius padrão:**
- **Espaçamento base:**
- **Sombras:** leve | média | forte
- **Bordas:** finas | médias | grossas

---

## 4. Estrutura de Layout Inicial

- **Layout base:** header | footer | sidebar | combinações
- **Menu principal existe:** sim | não
- **Sidebar existe:** sim | não
- **Responsividade:** mobile-first | desktop-first

---

## 5. Navegação Inicial

- **Página inicial pós-login (rota):**
- **Título da home inicial:**
- **Existe página pública inicial (antes do login):** sim | não

---

## 6. Decisões Técnicas de Identidade

> Apenas decisões que impactam **nome, visual ou estrutura inicial**.

- Biblioteca de ícones padrão:
- Sistema de componentes base:
- Convenções visuais obrigatórias:

---

## 7. Relação com Referências

- **Existem HTMLs de referência do produto:** sim | não
- **Existem imagens de referência:** sim | não

Observação:

> Referências **não substituem** este Brief. Elas apenas complementam.

---

## 8. Riscos, Ambiguidades e Decisões Pendentes

- Pontos ainda não definidos
- Decisões que exigirão validação futura

---

## 9. Validação do Brief

- Status: rascunho | validado | bloqueado
- Responsável pela validação:
- Data:
- Observações finais:

---

## Regra Final

> Nenhum Playbook pode ser executado sem este Brief validado.
