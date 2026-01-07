# PLAYBOOK_F_DESIGNER.md

Playbook Institucional — Designer Visual — Stack 003

Versão: v2.0 — Playbook de Normalização Visual

**Stack:** 003_next_front_python_back_mongo

---

## 1. Objetivo

Garantir que a interface visual do **frontend Next.js** está consistente, segue as referências visuais e proporciona boa experiência de usuário.

Este playbook é executado automaticamente pelo **PLAYBOOK_PIPELINE**.

---

## 2. Escopo

Este playbook atua **apenas no frontend Next.js**. O backend Python/FastAPI não tem interface visual.

**Importante:** Este agente NÃO modifica código Python, rotas FastAPI, schemas Pydantic, ou lógica de negócio.

---

## 3. Documentos de Referência

- [003_DOSSIE_NEXT_FRONTEND](../003_01-identidades_estrutura/003_DOSSIE_NEXT_FRONTEND.md)
- [Referências Visuais](../003_05-referencias-etapa-criacao-estrutura/referencias-visuais/)
- Brief do Produto (quando disponível em `area_produto/01-identidades/BRIEF_PRODUTO.md`)
- Passaporte do Produto (quando disponível)

---

## 4. Critérios de Design

### 4.1 Consistência Visual

**Obrigatório em todas as páginas:**

- [ ] Paleta de cores consistente (theme tokens definidos)
- [ ] Tipografia uniforme (family, weights, line-heights)
- [ ] Espaçamentos padronizados (múltiplos de 8px)
- [ ] Hierarquia visual clara (tamanhos, pesos, contraste)
- [ ] Componentes shared reutilizados adequadamente
- [ ] Border-radius consistente
- [ ] Shadows consistentes
- [ ] Transições suaves (200-300ms)

**Theme Tokens Esperados:**

```typescript
// src/styles/theme.ts
export const theme = {
  colors: {
    primary: "#...",
    secondary: "#...",
    success: "#...",
    error: "#...",
    warning: "#...",
    // ... outros
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    // ... outros
  },
  fonts: {
    primary: '"Inter", sans-serif',
    // ...
  },
};
```

### 4.2 Estados Visuais

Para cada elemento interativo (botões, inputs, links, cards clicáveis):

- [ ] **Estado normal** (default) — design base
- [ ] **Estado hover** — indicação visual de interatividade
- [ ] **Estado active/pressed** — feedback de clique
- [ ] **Estado disabled** — indicação de não disponível
- [ ] **Estado focus** — outline visível para acessibilidade
- [ ] **Estado loading** — spinner ou skeleton
- [ ] **Estado error** — indicação visual de erro (border vermelho, mensagem)

**Exemplos:**

```typescript
// Button estados
const Button = styled.button`
  /* Normal */
  background: ${(p) => p.theme.colors.primary};

  /* Hover */
  &:hover {
    background: ${(p) => p.theme.colors.primaryDark};
  }

  /* Active */
  &:active {
    transform: scale(0.98);
  }

  /* Disabled */
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Focus */
  &:focus-visible {
    outline: 2px solid ${(p) => p.theme.colors.primary};
    outline-offset: 2px;
  }
`;
```

### 4.3 Responsividade

**Breakpoints obrigatórios:**

- [ ] **Desktop** (>1024px) — layout completo
- [ ] **Tablet** (768-1024px) — layout adaptado
- [ ] **Mobile** (<768px) — layout simplificado

**Verificações:**

- [ ] Sem scroll horizontal indesejado
- [ ] Conteúdo legível em todas as telas
- [ ] Touch targets adequados em mobile (min 44x44px)
- [ ] Navegação adaptada (hamburguer menu em mobile)
- [ ] Imagens responsivas (srcset ou CSS)
- [ ] Tipografia escalável (clamp ou media queries)

**Exemplo:**

```typescript
const Container = styled.div`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 16px;
  }

  @media (max-width: 480px) {
    padding: 12px;
  }
`;
```

### 4.4 Acessibilidade Visual

**Critérios WCAG AA (mínimo):**

- [ ] Contraste texto/fundo ≥ 4.5:1 (textos normais)
- [ ] Contraste texto/fundo ≥ 3:1 (textos grandes >18px)
- [ ] Tamanhos de fonte legíveis (min 16px corpo, 14px permitido em secundários)
- [ ] Áreas clicáveis suficientes (min 44x44px)
- [ ] Focus visível em todos os elementos interativos
- [ ] Textos alternativos em imagens (`alt` attribute)
- [ ] Labels associados a inputs (`htmlFor` + `id`)
- [ ] Cores não são único meio de transmitir informação

---

## 5. Páginas de Autenticação

### 5.1 Regra Obrigatória

HTMLs de referência devem ser seguidos **LITERALMENTE**:

- `/login` → `page-login.html`
- `/register` → `page-register.html`
- `/forgot-password` → `page-forgot-password.html`
- `/reset-password` → `page-reset-password.html`
- `/email-verification` → `page-email-verification.html`

### 5.2 Permitido Alterar

Apenas os placeholders:

- `{APP_NAME}` → nome real da aplicação
- `{BRAND_PALETTE}` → cores da marca do produto

### 5.3 Proibido Alterar

- ❌ Reorganizar estrutura DOM
- ❌ Alterar classes CSS
- ❌ Simplificar hierarquia
- ❌ Remover elementos
- ❌ Adicionar novos elementos não documentados
- ❌ Mudar ordem de campos em forms

**Motivo:** HTMLs de referência foram aprovados e validados. Alterações causam retrabalho.

---

## 6. Páginas do Produto

Para páginas implementadas após ETAPA 2 (MOC):

### 6.1 Referências

- HTMLs em `referencias-etapa-mock/html/`
- Wireframes em `referencias-etapa-mock/imagens/`
- Documentação funcional em `referencias-etapa-mock/md/`

### 6.2 Diretrizes

- [ ] Seguir referências visuais fornecidas
- [ ] Manter consistência com páginas de autenticação
- [ ] Usar componentes shared quando apropriado
- [ ] Criar componentes feature quando específico da página
- [ ] Respeitar identidade visual estabelecida

### 6.3 Componentes Feature vs Shared

**Shared:** Reutilizáveis em múltiplas páginas

- Header, Footer, Sidebar
- Modals, Dialogs
- Buttons, Inputs, Selects
- Cards, Badges, Tags
- Alerts, Toasts

**Feature:** Específicos de uma página/funcionalidade

- DashboardWidget (só no /dashboard)
- ProfileCard (só no /perfil)
- CheckoutSummary (só no /checkout)

---

## 7. Componentes Shared

### 7.1 Componentes Obrigatórios

Estes componentes devem existir e ser visualmente consistentes:

#### Layout

- `Header` — cabeçalho global
- `Footer` — rodapé global
- `Sidebar` — navegação lateral (se aplicável)
- `Container` — wrapper de conteúdo

#### Feedback

- `Modal` — diálogos modais
- `Alert` / `Toast` — mensagens temporárias
- `LoadingSpinner` — indicador de carregamento
- `Skeleton` — loading placeholder

#### Forms

- `Input` — campo de texto
- `Textarea` — campo de texto longo
- `Select` — dropdown
- `Checkbox` — seleção múltipla
- `Radio` — seleção única
- `Button` — botão de ação

#### Display

- `Card` — container de conteúdo
- `Badge` — etiqueta pequena
- `Tag` — marcador
- `Avatar` — foto de perfil

### 7.2 Garantias

- Mesmo estilo visual em todas as instâncias
- Mesmos tokens de design (cores, espaçamentos, fontes)
- Mesma hierarquia visual
- Mesmo comportamento interativo
- Props consistentes

**Exemplo:**

```typescript
// Button sempre deve aceitar as mesmas props
interface ButtonProps {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
}
```

---

## 8. Feedback Visual

### 8.1 Loading States

**Obrigatório implementar:**

- [ ] Skeleton screens para conteúdo carregando
- [ ] Spinners para ações em progresso
- [ ] Feedback durante requisições HTTP
- [ ] Não bloquear UI desnecessariamente
- [ ] Loading inline (não modal) quando possível

**Exemplo:**

```typescript
{
  isLoading ? (
    <Skeleton width="100%" height="200px" />
  ) : (
    <UserList users={users} />
  );
}
```

### 8.2 Error States

**Obrigatório implementar:**

- [ ] Mensagens de erro claras e acionáveis
- [ ] Cor de erro consistente (theme.colors.error)
- [ ] Posicionamento adequado (próximo ao elemento)
- [ ] Possibilidade de fechar/dispensar
- [ ] Ícone de erro quando apropriado
- [ ] Sugestão de como resolver (se possível)

**Exemplo:**

```typescript
{
  error && (
    <ErrorAlert>
      <ErrorIcon />
      <ErrorMessage>{error.message}</ErrorMessage>
      <RetryButton onClick={retry}>Tentar novamente</RetryButton>
    </ErrorAlert>
  );
}
```

### 8.3 Success States

**Obrigatório implementar:**

- [ ] Confirmação visual de ação bem-sucedida
- [ ] Feedback positivo claro (cor verde, ícone de check)
- [ ] Não intrusivo (toast, não modal)
- [ ] Desaparece automaticamente após 3-5s
- [ ] Possibilidade de fechar manualmente

### 8.4 Empty States

**Obrigatório quando não há dados:**

- [ ] Mensagem clara indicando ausência de dados
- [ ] Ilustração ou ícone (não apenas texto)
- [ ] Sugestão de ação (CTA)
- [ ] Tom amigável, não frustrante

**Exemplo:**

```typescript
{
  items.length === 0 ? (
    <EmptyState>
      <EmptyIcon />
      <EmptyTitle>Nenhum item encontrado</EmptyTitle>
      <EmptyDescription>
        Adicione seu primeiro item para começar
      </EmptyDescription>
      <AddButton>Adicionar item</AddButton>
    </EmptyState>
  ) : (
    <ItemList items={items} />
  );
}
```

---

## 9. Ações do F-Designer

### 9.1 Ações Permitidas

**Você PODE:**

- ✅ Ajustar espaçamentos (padding, margin, gap)
- ✅ Melhorar hierarquia visual (tamanhos, pesos, contraste)
- ✅ Adicionar estados visuais faltantes (hover, focus, disabled)
- ✅ Corrigir cores inconsistentes
- ✅ Melhorar responsividade (breakpoints, layouts)
- ✅ Adicionar feedback visual (loading, error, success)
- ✅ Refinar tipografia (tamanhos, line-heights, letter-spacing)
- ✅ Ajustar tokens de theme
- ✅ Adicionar animações sutis (transitions, transforms)
- ✅ Melhorar acessibilidade visual (contraste, focus)
- ✅ Criar variantes de componentes existentes
- ✅ Extrair componentes shared de código duplicado

### 9.2 Ações Proibidas

**Você NÃO PODE:**

- ❌ Alterar lógica de negócio
- ❌ Modificar chamadas HTTP (axios, fetch)
- ❌ Alterar fluxo de autenticação
- ❌ Criar novas funcionalidades
- ❌ Mudar estrutura de dados (states, contexts)
- ❌ Mexer no backend Python/FastAPI
- ❌ Modificar rotas FastAPI
- ❌ Alterar schemas Pydantic
- ❌ Mudar contratos de API
- ❌ Adicionar/remover campos de formulários (sem aprovação)
- ❌ Alterar validações de negócio

**Regra de Ouro:** Se envolve lógica ou backend, **NÃO TOQUE**.

---

## 10. Checklist de Verificação

### 10.1 Por Página

Para cada página implementada:

- [ ] Renderiza corretamente sem erros
- [ ] Layout responsivo (desktop, tablet, mobile)
- [ ] Estados implementados (loading, error, empty, success)
- [ ] Consistente com outras páginas (cores, tipografia, espaçamentos)
- [ ] Segue referências visuais fornecidas
- [ ] Componentes shared reutilizados onde apropriado
- [ ] Acessibilidade básica (contraste, focus, alt texts)
- [ ] Animações suaves (não abruptas)
- [ ] Sem bugs visuais (overflow, z-index, alignment)

### 10.2 Global

Para toda a aplicação:

- [ ] Theme tokens definidos e aplicados
- [ ] GlobalStyles definidos (resets, defaults)
- [ ] Componentes shared criados e reutilizados
- [ ] Sem styled inline (usar Styled Components)
- [ ] Sem Tailwind CSS (proibido nesta stack)
- [ ] Paleta de cores consistente
- [ ] Tipografia consistente
- [ ] Espaçamentos consistentes
- [ ] Estados visuais consistentes
- [ ] Feedback visual adequado

---

## 11. Processo de Execução

### 11.1 Input

- Código atual do frontend Next.js
- Referências visuais (HTMLs, imagens, documentação)
- Relatório do AGENTE_AUDITOR (se houver)
- Feedback do usuário (se houver)

### 11.2 Análise

1. Revisar todas as páginas implementadas
2. Comparar com referências visuais
3. Identificar inconsistências
4. Priorizar ajustes (crítico > importante > desejável)

### 11.3 Implementação

1. Aplicar ajustes visuais priorizados
2. Testar responsividade
3. Verificar estados visuais
4. Validar acessibilidade básica
5. Testar em navegadores (Chrome, Firefox, Safari)

### 11.4 Output

- Código frontend atualizado
- Relatório de ajustes realizados
- Screenshots antes/depois (se relevante)
- Checklist de verificação preenchido

---

## 12. Integração com Pipeline

Este playbook é chamado pelo **003_PLAYBOOK_PIPELINE.md** quando:

- Após criação da estrutura (ETAPA 1)
- Após implementação de cada página (ETAPA 2)
- Quando auditoria detecta problemas visuais
- Quando usuário reporta inconsistências visuais

**Ciclo:**

```
AGENTE_AUDITOR → detecta problemas visuais
      ↓
AGENTE_F_DESIGNER → corrige problemas
      ↓
AGENTE_AUDITOR → re-valida
      ↓
(repete até aprovação)
```

---

## 13. Exemplos de Ajustes Comuns

### 13.1 Ajuste de Espaçamento

**Antes:**

```typescript
const Card = styled.div`
  padding: 15px; // valor arbitrário
`;
```

**Depois:**

```typescript
const Card = styled.div`
  padding: ${(p) => p.theme.spacing.md}; // 16px (múltiplo de 8)
`;
```

### 13.2 Adicionar Estado Hover

**Antes:**

```typescript
const Button = styled.button`
  background: blue;
`;
```

**Depois:**

```typescript
const Button = styled.button`
  background: ${(p) => p.theme.colors.primary};
  transition: background 200ms;

  &:hover {
    background: ${(p) => p.theme.colors.primaryDark};
  }
`;
```

### 13.3 Melhorar Responsividade

**Antes:**

```typescript
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;
```

**Depois:**

```typescript
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
```

---

**Versão:** v2.0  
**Última Atualização:** Janeiro 2026  
**Stack:** 003_next_front_python_back_mongo

© 2026 - Documentação Institucional Oficial
