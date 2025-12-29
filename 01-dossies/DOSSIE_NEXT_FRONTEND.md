# Dossiê Institucional

## Arquitetura de Frontend — Next.js (App Router)

---

**Versão:** v1.0  
**Status:** Padrão Institucional

---

## 📑 Sumário

1. [Objetivo do Documento](#1-objetivo-do-documento)
2. [Princípios Arquiteturais](#2-princípios-arquiteturais)
3. [Visão Geral da Estrutura](#3-visão-geral-da-estrutura)
4. [Camada de Roteamento e Páginas](#4-camada-de-roteamento-e-páginas)
5. [Componentes Compartilhados (Shared UI)](#5-componentes-compartilhados-shared-ui)
6. [Componentes de Domínio (Feature UI)](#6-componentes-de-domínio-feature-ui)
7. [Hooks](#7-hooks)
8. [Estado Global](#8-estado-global)
9. [Estilos e Design System](#9-estilos-e-design-system)
10. [Comunicação com Backend](#10-comunicação-com-backend)
11. [Utilitários](#11-utilitários)
12. [Dados Estáticos](#12-dados-estáticos)
13. [Tipagem Global](#13-tipagem-global)
14. [Fluxo Oficial de Renderização](#14-fluxo-oficial-de-renderização)
15. [Regras Institucionais Obrigatórias](#15-regras-institucionais-obrigatórias)
16. [Escalabilidade Futura](#16-escalabilidade-futura)
17. [Conclusão](#17-conclusão)

---

## 1. Objetivo do Documento

Este dossiê define o padrão oficial de arquitetura de frontend para aplicações desenvolvidas em Next.js com App Router, estabelecendo:

- ✓ Organização clara de páginas, layouts e componentes
- ✓ Separação entre UI genérica e UI de domínio (feature)
- ✓ Regras para estado, hooks, estilos e tipagem
- ✓ Base sólida para escalar o frontend sem perda de coesão

> 📝 **Nota:** O documento serve como referência institucional, não como exemplo pontual.

---

## 2. Princípios Arquiteturais

| Princípio                                    | Descrição                        |
| -------------------------------------------- | -------------------------------- |
| **Roteamento declarativo e previsível**      | Estrutura clara de navegação     |
| **Componentes reutilizáveis e desacoplados** | Sem dependências desnecessárias  |
| **Separação entre layout, página e feature** | Cada um com sua responsabilidade |
| **Estado explícito e controlado**            | Gerenciamento claro de dados     |
| **Design system centralizado**               | Consistência visual              |
| **Frontend orientado a domínio**             | Não a telas soltas               |

---

## 3. Visão Geral da Estrutura

```
src/                                   # Código da aplicação
│
├── app/                              # Rotas (App Router)
│   ├── layout.tsx                    # Providers, Layout Global
│   ├── page.tsx                      # Home / Dashboard (Server)
│   ├── login/
│   │   ├── page.tsx                  # Server
│   │   └── Main.tsx                  # Client ("use client")
│   ├── cadastro/
│   │   ├── page.tsx                  # Server
│   │   └── Main.tsx                  # Client
│   ├── perfil/
│   │   ├── page.tsx                  # Server
│   │   └── Main.tsx                  # Client
│   └── paginaEspecifica/            # Padrão de Domínio
│       ├── page.tsx                  # Server (Estática)
│       ├── Main.tsx                  # Client (Lógica dinâmica)
│       └── [id]/
│           ├── page.tsx              # Server (Dinâmica)
│           └── Main.tsx              # Client (Estados e hooks)
│
├── components/                       # Shared UI (Padrão)
│   ├── Header/
│   ├── Footer/
│   ├── Modals/
│   ├── Loading/
│   └── Checkbox/
│
├── features/                         # Feature UI (Domínio)
│   └── paginaEspecifica/
│       ├── components/
│       ├── hooks/
│       └── types/
│
├── store/                            # Estado Global
│   ├── Context.ts
│   └── Provider.tsx
│
├── hooks/                            # Hooks Reutilizáveis
│   └── useStorage.ts
│
├── services/                         # Backend API
│   ├── api.ts
│   └── api.d.ts
│
├── styles/                           # Design System
│   ├── theme.ts
│   └── GlobalStyles.ts
│
├── utils/                            # Utilitários
│   ├── AlertService.ts
│   └── storage.ts
│
├── data/                             # Dados Estáticos
│   └── initialData.json
│
└── @types/                           # Tipagem Global
    └── index.ts
```

> 📌 **Nota importante:** Cada página (`page.tsx`) é um **Server Component** por padrão. A lógica dinâmica (hooks, estado, interatividade) fica no arquivo **Main.tsx** que é um **Client Component** (`"use client"`) importado pela página. Detalhes na **Seção 4**.

---

## 4. Camada de Roteamento e Páginas

**Pasta:** `src/app/`

**Responsabilidade:** Definir rotas, layouts e páginas da aplicação utilizando o App Router. Essa pasta representa o mapa de navegação do sistema.

### 4.1 Arquivos Estruturais

#### `layout.tsx`

**Responsabilidade:** Definir layout global, injetar providers (Theme, Store, Auth, etc.) e importar estilos globais.

⚠️ **Regra institucional:** Nenhuma lógica de domínio deve existir aqui.

#### `page.tsx`

**Responsabilidade:** Página inicial (Home / Dashboard)

---

### 4.1.1 Server Components vs Client Components

#### 📄 page.tsx → Server Component (padrão)

- Executado apenas no servidor
- Responsável por **lógica principal** e **obtenção de dados via services (server-side)**
- Renderiza inicialmente toda a estrutura HTML
- **NÃO pode usar:** useState, useEffect, event listeners, hooks de contexto

#### ⚡ Main.tsx → Client Component ("use client")

- Importado e renderizado **dentro do page.tsx**
- Contém **toda a interatividade**: useState, hooks, eventos
- Gerencia estado lcal e contextos dinâmicos
- Exemplo: `'use client'` no topo do arquivo

#### Exemplo de Uso

```typescript
// src/app/paginaEspecifica/page.tsx
// ✅ Server Component (padrão)
export default async function Page() {
// ✅ Pode obter dados via services aqui (proibido fetch cru)
  return <Main /> {/* Renderiza componente cliente */}
}
```

```typescript
// src/app/paginaEspecifica/Main.tsx
"use client";
// ✅ Client Component
export default function Main() {
  // ✅ Pode usar useState, hooks, contextos
  return <div>...</div>;
}
```

---

### 4.2 Páginas Funcionais (Rotas Estáticas)

- `app/login/page.tsx`
- `app/cadastro/page.tsx`
- `app/perfil/page.tsx`

**Responsabilidade:** Compor UI, orquestrar components e hooks e chamar services.

---

### 4.3 Páginas de Domínio (Padrão Institucional)

O frontend deve tratar páginas de domínio como "páginas específicas", com dois formatos possíveis:

- **Rota estática:** `app/paginaEspecifica/page.tsx`
- **Rota dinâmica:** `app/paginaEspecifica/[id]/page.tsx`

> ⚠️ **Regra institucional:** O nome da pasta representa o domínio, não um conceito fixo.

---

## 5. Componentes Compartilhados (Shared UI)

**Pasta:** `src/components/`

**Responsabilidade:** Conter componentes genéricos e reutilizáveis, independentes de domínio.

### Exemplos

- Header / Footer
- Modals
- Loading / Spinner

- Inputs / Button
- Layout wrappers

### ⚠️ Regras obrigatórias

- Não conter regras de negócio
- Não depender de rotas específicas
- Não acessar services diretamente

---

## 6. Componentes de Domínio (Feature UI)

**Pasta:** `src/features/`

**Responsabilidade:** Conter UI específica de um domínio funcional.

```
features/
  paginaEspecifica/
    components/
    hooks/
    types/
```

**Exemplos:** Cards específicos, accordions acoplados ao domínio, seções complexas da página.

> ⚠️ **Regra institucional:** Se um componente só faz sentido dentro de uma página/domínio, ele não é shared.

---

## 7. Hooks

**Pasta:** `src/hooks/`

**Responsabilidade:** Hooks reutilizáveis e genéricos (`useStorage`, `useDebounce`, `useMediaQuery`).

> 📝 Hooks específicos de domínio devem ficar dentro de `features/<dominio>/hooks`.

---

## 8. Estado Global

**Pasta:** `src/store/`

**Arquivos típicos:** `Context.ts`, `Provider.tsx`

**Responsabilidade:** Estado global compartilhado, sessão do usuário, configurações globais.

> ⚠️ **Regra institucional:** Estado global só é permitido quando realmente compartilhado por múltiplas páginas.

---

## 9. Estilos e Design System

**Pasta:** `src/styles/`

### Arquivos

#### `theme.ts`

Tokens de design (cores, espaçamentos, tipografia)

#### `GlobalStyles.ts`

Reset, estilos globais e normalizações

> ⚠️ **Regra institucional:** Nenhuma cor "hardcoded" fora do design system.

---

## 10. Comunicação com Backend

**Pasta:** `src/services/`

**Responsabilidade:** Centralizar chamadas HTTP, isolar o backend da UI e padronizar erros e headers.

> ⚠️ **Regra institucional:** Componentes nunca chamam fetch direto.

---

## 11. Utilitários

**Pasta:** `src/utils/`

**Exemplos:** `AlertService.ts`, `storage.ts`, formatadores

**Características:**

- Stateless
- Reutilizáveis
- Independentes de UI

---

## 12. Dados Estáticos

**Pasta:** `src/data/`

**Responsabilidade:** Dados estáticos de UI, mocks e seeds de frontend.

> ⚠️ **Nunca devem conter lógica.**
> ⚠️ **Atenção:** src/data/ é exclusivo para dados estáticos de UI. O MOC institucional vive em `/data` (raiz do projeto), nunca em src/data/.

---

## 13. Tipagem Global

**Pasta:** `src/@types/`

**Responsabilidade:** Tipos compartilhados, contratos de dados e interfaces globais.

> 📝 **Regra:** Tipos de domínio específico devem viver junto da feature correspondente.

---

## 14. Fluxo Oficial de Renderização

```
1. Usuário acessa rota (app/...)
   ↓
2. Página (page.tsx) monta a UI
   ↓
3. Hooks controlam estado
   ↓
4. Components renderizam
   ↓
5. Services comunicam com backend
   ↓
6. Estado global (se necessário) sincroniza
```

---

## 15. Regras Institucionais Obrigatórias

### ⚠️ ATENÇÃO - REGRAS MANDATÓRIAS

| Regra | Descrição                              |
| ----- | -------------------------------------- |
| ⚠️    | Nenhuma regra de negócio em components |
| ⚠️    | Nenhuma chamada HTTP direta em UI      |
| ⚠️    | Domínio ≠ Shared                       |
| ⚠️    | Página ≠ Feature                       |
| ⚠️    | Estado global com critério             |
| ⚠️    | UI sempre orientada a domínio          |

---

## 16. Escalabilidade Futura

Essa arquitetura permite:

- ✓ Design System dedicado
- ✓ Micro-frontends
- ✓ Modularização por domínio
- ✓ Testes isolados por feature

> 💡 Sem necessidade de refatoração estrutural.

---

## 17. Conclusão

Este padrão institucional estabelece o frontend como uma camada arquitetural de primeira classe, com disciplina equivalente ao backend. Ele garante:

| Benefício | Impacto |
| --------- | ------- |

| **Clareza** | Código compreensível |
| **Manutenibilidade** | Fácil de atualizar |
| **Escalabilidade** | Cresce sem caos |
| **Consistência** | Padrão uniforme |

---

### 📊 Status do Documento

**Aprovado para Implementação**

_Onboarding rápido & Eficiência Técnica_

---

_© 2025 - Documentação de Padrão Institucional - Engenharia de Software Frontend_
