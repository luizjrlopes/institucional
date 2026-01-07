# Dossiê Institucional

## Regras de Criação de Aplicações Next.js Fullstack

> Nota terminológica: As "Fases" descritas neste Dossiê são internas ao próprio Dossiê (Fase D\*) e não substituem, nem conflitam com, as "Etapas" operacionais do `FLUXO_ORQUESTRADOR`. As Etapas do Fluxo são a referência obrigatória para execução operacional.

---

## OFFICIAL DOC

---

### 📋 Metadados

- **Framework:** Next.js Fullstack (Opção 001)
- **Versão:** v1.0
- **Status:** Documento Institucional Oficial

---

## �️ REGRA SUPREMA 001 - ISOLAMENTO SERVER/CLIENT

### ⚠️ REGRA CRÍTICA ANTI-ALUCINAÇÃO

**VIOLAÇÃO DESTA REGRA = ERRO CRÍTICO NO SISTEMA**

#### Declaração da Regra

```
Arquivos em src/app ou src/components NUNCA importam diretamente
de src/models, src/lib/db, src/server ou qualquer módulo de backend.

A comunicação DEVE ser SEMPRE através de:
1. fetch para /api/* (API Routes)
2. Server Actions (funções marcadas com 'use server')
3. Server Components (componentes SEM a diretiva 'use client')
```

#### Exemplos Proibidos ❌

```typescript
// ❌ ERRADO - Component Client importando Model
"use client";
import { User } from "@/server/models/User"; // PROIBIDO!

// ❌ ERRADO - Component Client importando DB
("use client");
import dbConnect from "@/server/db/client"; // PROIBIDO!

// ❌ ERRADO - Component Client importando Service
("use client");
import { AuthService } from "@/server/services/AuthService"; // PROIBIDO!
```

#### Exemplos Corretos ✅

```typescript
// ✅ CORRETO - Usar fetch para API Route
"use client";
export function LoginForm() {
  const handleLogin = async (data) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
    // ...
  };
}

// ✅ CORRETO - Usar Server Action
("use client");
import { loginAction } from "@/server/actions/auth";

export function LoginForm() {
  return <form action={loginAction}>...</form>;
}

// ✅ CORRETO - Server Component (pode importar backend)
// Sem 'use client'
import { getUserData } from "@/server/services/UserService";

export default async function ProfilePage() {
  const user = await getUserData();
  return <div>{user.name}</div>;
}
```

#### Checklist de Validação

Antes de criar/modificar qualquer arquivo, verificar:

- [ ] Arquivo tem 'use client'?
  - Se SIM → NÃO pode importar de src/server, src/models, src/lib/db
  - Se NÃO (Server Component) → Pode importar backend
- [ ] Comunicação com DB/Models?
  - Client Components → fetch('/api/...') ou Server Action
  - Server Components → import direto OK
- [ ] Lógica de autenticação?
  - Client: usar hooks + fetch
  - Server: import direto de services

#### Auditoria Automática

Ao finalizar qualquer arquivo em src/app ou src/components, executar:

```bash
# Verificar imports proibidos
grep -r "from '@/server" src/app/**/*.tsx
grep -r "from '@/models" src/components/**/*.tsx
grep -r "from '@/lib/db" src/app/**/*.tsx

# Se retornar resultados → ERRO CRÍTICO
```

---

## �📑 Sumário

1. [Objetivo](#1-objetivo)
2. [Escopo](#2-escopo)
3. [Princípios Institucionais](#3-princípios-institucionais)
4. Processo Sequencial (Fases Internas do Dossiê)
   1. [Fase D0 — Preparação Institucional](#fase-d0--preparação-institucional)
   2. [Fase D1 — Estrutura Base]
      (#fase-d1--estrutura-base)
   3. [Fase D2 — Usuário e Autenticação](#fase-d2--usuário-e-autenticação)
   4. [Fase D3 — Páginas de Domínio](#fase-d3--páginas-de-domínio)
   5. [Fase D4 — Governança]
      (#fase-d4--governança)
5. Finalização
   1. [Regras Institucionais de Decisão](#9-regras-institucionais-de-decisão)
   2. [Critério de Conformidade](#10-critério-de-conformidade)

---

## 1. Objetivo

Este documento estabelece o processo institucional **obrigatório** para criação de aplicações Next.js Fullstack, utilizando o App Router e a arquitetura de backend integrado (Opção A).

### Benefícios

- ✓ Base arquitetural sólida
- ✓ Evolução previsível e governável

## 2. Escopo

- `/001_04-agentes` Qualquer agente automatizado responsável por gerar código.
- `/001_03-passaporte_de_criacao` Qualquer evolução estrutural relevante (novos módulos, grandes features).

## 3. Princípios Institucionais

### Camadas

Separação explícita entre as responsabilidades do sistema.

### Backend 1st Class

Backend tratado como sistema de primeira classe.

### UI por Domínio

UI orientada a domínio, não a telas soltas.

### Reuso Consciente

Shared ≠ genérico por conveniência.

### Ordem & Método

Ordem de criação mais importante que velocidade inicial.

---

## Fase D0 — Preparação Institucional

**Número interna do Dossiê:** `D0`

### 4.1 Objetivo

### 4.2 Decisões Obrigatórias (Padrão Institucional Fixo)

| Aspecto        | Definição                       |
| -------------- | ------------------------------- |
| **Framework**  | Next.js (Fullstack)             |
| **Roteamento** | App Router                      |
| **Backend**    | Opção A (`app/api` + `server/`) |
| **Banco**      | MongoDB / Mongoose              |
| **Estilo**     | Styled Components               |

> **Nota institucional obrigatória:** O MongoDB (com Mongoose) é o alvo institucional de persistência em produção. Durante a Fase MOC (fase de construção/integração com MOCs), NENHUMA base de dados externa deve ser utilizada como fonte primária de dados; os MOCs residem exclusivamente em `data/` e são a fonte de verdade até a migração explícita. Sobre a estilização, pode apenas com styled Components, estilo inline é proibido. o uso de tailwind é proibido.

#### UI / Componentização

- **Shared UI:** `src/components/` (Header, Footer, Modals, Loading, Base Form)
- **Feature UI:** `src/features/<dominio>` (Obrigatório)
- **Promoção para Shared:** Somente após 2+ páginas de uso real

- Sessão com cookie HTTP-only (contrato institucional)
- Tokens Access/Refresh seguros
- Endpoints: login, register, logout, me, reset/forgot password

#### Camadas Backend

```text
route.ts (HTTP) → controllers → services → repositories → models
```

### ✅ CRITÉRIO DE ACEITE DA FASE D0

**✓** Estrutura documental criada e validada

---

### Frontend — Base

```text
src/app/layout.tsx
src/app/page.tsx
src/components/ (Shared somente)
src/styles/
src/store/
src/services/api.ts
src/utils/
```

- Primeiro criar a casca: arquivos vazios na estrutura acima, apenas o necessário para compilar.
- Em seguida, preencher somente os padrões institucionais (Loading, AlertService, layout com providers, theme/GlobalStyles, registry, api.ts, helpers de erro/resposta/logger), ainda sem domínio.

### Backend — Base

```text
app/api/health/route.ts
server/config/env.ts
server/db/client.ts
server/utils/errors.ts
server/utils/response.ts
server/utils/logger.ts
```

- Repositórios e services devem ser definidos por interface para permitir adapter DataRepository durante a Fase MOC (ver Cláusula 10 do MAPA_institucional) antes da conexão real ao Mongo Atlas.

**Nota operacional sobre `src/server/db/client.ts` e Mongoose:**

O arquivo `src/server/db/client.ts` poderá conter a configuração estrutural (esqueleto) do cliente Mongo/Mongoose, mas durante a Fase MOC ele NÃO deve estabelecer conexões ativas nem ser usado como fonte primária de dados. Enquanto durar a Fase MOC, os MOCs em `data/` são a fonte oficial de verdade e o MongoDB só será utilizado como tal na Fase 4 — Transição para Produção.

### ✅ CRITÉRIOS DE ACEITE DA FASE D1

- ✓ Projeto compila
- ✓ `/api/health` responde
- ✓ Providers carregam
- ✓ ENV centralizado

---

## Fase D2 — Usuário e Autenticação

**Número interna do Dossiê:** `D2`

### Objetivo

Validar integração completa front ↔ back, com login funcional até uma home vazia protegida.

### 6.3 Backend — Usuário/Auth

**CAMADAS:**

- models, repositories, services, controllers, validators

**ROTAS:**

```text
/api/auth/[login|register|logout|me|forgot|reset]
```

### 6.4 Frontend — Autenticação

**PÁGINAS:**

- /login
- /register
- /reset-password
- /perfil
- / (home protegida)

**INFRA:**

- Provider de sessão
- Service de auth
- Proteção de rota

### ✅ Validação da Etapa 2

- ✓ Pagina inicial é a pagina de login
- ✓ Pela pagina login se pode chegar a pagina register e forgot-password
- ✓ Usuário consegue cadastrar e logar
- ✓ Usuário pode acessar com o usuario root - email: <admin@exemplo.com> e senha admin
- ✓ Usuário acessa home vazia autenticada com um placeholder aguardando a criação dessa pagina.
- ✓ Logout funcional e sessão persistente
- ✓ Comunicação front ↔ back validada, com todas logica de auth implenetanda no front e no back.

---

## Fase D3 — Páginas de Domínio

**Número interna do Dossiê:** `D3`

### Ordem de criação por página

1. **Criar rota** em `app/<pagina>/page.tsx`
2. **Criar feature folder** `features/<pagina>/`
3. **Criar backend do domínio** (se necessário)
4. **Criar UI e composição**

### 7.3 Regras de Reuso

⚠️ **ATENÇÃO:**

- Shared cresce apenas com reuso real (2+ páginas)
- Componentes específicos ficam na feature
- Modal, Header, Footer e Loading são sempre shared
- **PROIBIDO:** Fetch direto em componente de UI

### ✅ DEFINIÇÃO DE "PÁGINA FINALIZADA"

| Critério                      | Status |
| ----------------------------- | ------ |
| Rota acessível                | ✓      |
| UI renderiza corretamente     | ✓      |
| Estados loading/erro tratados | ✓      |
| Services usados para dados    | ✓      |
| Componentes classificados     | ✓      |
| Padrão visual respeitado      | ✓      |

---

## 9. Regras Institucionais de Decisão

### Quando algo é Shared?

Estrutural ou usado em 2+ páginas.

### Quando algo é Feature?

Domínio específico, não reutilizável genericamente.

### Onde fica a lógica?

| Tipo             | Localização                    |
| ---------------- | ------------------------------ |
| Regra de negócio | `services`                     |
| Acesso a dados   | `repositories`                 |
| HTTP             | `controllers + route.ts`       |
| UI               | `app + features`               |
| Estado global    | apenas quando realmente global |

---

## 10. Critério de Conformidade

### Uma aplicação está em conformidade quando

- ✅ Todas as etapas seguidas
- ✅ Nenhuma camada misturada
- ✅ Documentação acompanha código
- ✅ Ordem de criação respeitada

---

## 11. Conclusão

Este documento transforma a criação de aplicações Next.js em um processo institucional previsível, replicável por humanos ou agentes automatizados. Ele não busca velocidade inicial, mas sustentabilidade técnica, clareza arquitetural e crescimento sem caos.

---

### 📊 Status Institucional

## Homologado & Mandatório

**Governança Técnica**  
Engenharia de Software — v1.0

---

© 2025 - Documentação Institucional Oficial - Padronização de Processos Fullstack
