# PLAYBOOK_F_DESIGNER.md

Playbook Institucional — Designer Visual — Stack 002

Versão: v1.0 — Playbook de Normalização Visual

**Stack:** 002_next_front_node_back_mongo

---

## 1. Objetivo

Garantir que a interface visual do **frontend Next.js** está consistente, segue as referências visuais e proporciona boa experiência de usuário.

Este playbook é executado automaticamente pelo **PLAYBOOK_PIPELINE**.

---

## 2. Escopo

Este playbook atua **apenas no frontend**. O backend não tem interface visual.

---

## 3. Documentos de Referência

- [DOSSIE_NEXT_FRONTEND](../002_01-identidades_estrutura/002_DOSSIE_NEXT_FRONTEND.md)
- [Referências Visuais](../002_05-referencias-etapa-criacao-estrutura/referencias-visuais/)
- Brief do Produto (quando disponível)

---

## 4. Critérios de Design

### 4.1 Consistência Visual

- [ ] Paleta de cores consistente (theme tokens)
- [ ] Tipografia uniforme
- [ ] Espaçamentos padronizados
- [ ] Hierarquia visual clara
- [ ] Componentes reutilizados adequadamente

### 4.2 Estados Visuais

Para cada elemento interativo:

- [ ] Estado normal (default)
- [ ] Estado hover
- [ ] Estado active/pressed
- [ ] Estado disabled
- [ ] Estado loading
- [ ] Estado error

### 4.3 Responsividade

- [ ] Layout funciona em desktop
- [ ] Layout funciona em tablet
- [ ] Layout funciona em mobile
- [ ] Breakpoints adequados
- [ ] Sem scroll horizontal indesejado

### 4.4 Acessibilidade Visual

- [ ] Contraste adequado (WCAG AA)
- [ ] Tamanhos de fonte legíveis
- [ ] Áreas clicáveis suficientes (44x44px)
- [ ] Focus visível em elementos interativos
- [ ] Textos alternativos em imagens

---

## 5. Páginas de Autenticação

HTMLs de referência devem ser seguidos **LITERALMENTE**:

- `/login`
- `/register`
- `/forgot-password`
- `/reset-password`
- `/email-verification`

Permitido alterar apenas:

- `{APP_NAME}` → nome do app
- `{BRAND_PALETTE}` → cores da marca

Proibido:

- Reorganizar DOM
- Alterar classes
- Simplificar estrutura
- Inventar novos elementos

---

## 6. Páginas do Produto

Para páginas do produto (após ETAPA MOC):

- Seguir referências visuais (HTMLs, imagens)
- Manter consistência com páginas de auth
- Usar componentes shared quando apropriado
- Criar componentes feature quando específico

---

## 7. Componentes Shared

Componentes que devem ser visualmente consistentes:

- Header
- Footer
- Modals
- Alerts/Toasts
- Loading states
- Form inputs
- Buttons
- Cards

Garantir:

- Mesmo estilo visual
- Mesmos tokens de design
- Mesma hierarquia
- Mesmo comportamento

---

## 8. Feedback Visual

### 8.1 Loading

- [ ] Skeleton screens ou spinners
- [ ] Feedback durante requisições HTTP
- [ ] Não bloquear UI desnecessariamente

### 8.2 Erros

- [ ] Mensagens claras
- [ ] Cor de erro consistente
- [ ] Posicionamento adequado
- [ ] Possibilidade de fechar/dispensar

### 8.3 Sucesso

- [ ] Confirmação visual
- [ ] Feedback positivo claro
- [ ] Não intrusivo

### 8.4 Estados Vazios

- [ ] Mensagem quando não há dados
- [ ] Sugestão de ação
- [ ] Visual adequado (não apenas texto)

---

## 9. Ações do F-Designer

### Permitidas

- Ajustar espaçamentos
- Melhorar hierarquia visual
- Adicionar estados visuais faltantes
- Corrigir cores inconsistentes
- Melhorar responsividade
- Adicionar feedback visual
- Refinar tipografia
- Ajustar tokens de theme

### Proibidas

- Alterar lógica de negócio
- Modificar chamadas HTTP
- Alterar fluxo de autenticação
- Criar novas funcionalidades
- Mudar estrutura de dados
- Mexer no backend

---

## 10. Checklist de Verificação

### Por Página

- [ ] Renderiza corretamente
- [ ] Layout responsivo
- [ ] Estados loading/erro/vazio
- [ ] Consistente com outras páginas
- [ ] Segue referências visuais
- [ ] Acessível (básico)

### Global

- [ ] Theme tokens aplicados
- [ ] GlobalStyles definidos
- [ ] Componentes shared reutilizados
- [ ] Sem styled inline
- [ ] Sem Tailwind (proibido)

---

## 11. Relatório de Design

Ao final, documentar:

```markdown
# Relatório F-Designer — Stack 002

**Data:** [DATA]
**Páginas Revisadas:** [LISTA]

## Ajustes Realizados

### Layout

- [Ajustes de layout]

### Cores

- [Ajustes de cores]

### Tipografia

- [Ajustes de tipografia]

### Estados Visuais

- [Estados adicionados/corrigidos]

### Responsividade

- [Ajustes responsivos]

## Observações

[Comentários sobre design]
```

---

## 12. Regras de Bloqueio

Interromper se:

- Referências visuais não disponíveis
- HTMLs de auth não replicados literalmente
- Styled Components não usado
- Tailwind detectado (proibido)
- Estilos inline detectados (proibido)

---

**Governança Técnica**  
Engenharia de Software — Stack 002 — v1.0

© 2026 - Documentação Institucional Oficial
