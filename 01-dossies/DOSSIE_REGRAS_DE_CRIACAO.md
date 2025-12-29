# Dossiê Institucional

## Regras de Criação de Aplicações Next.js Fullstack

---

**OFFICIAL DOC**

---

### 📋 Metadados

- **Framework:** Next.js Fullstack (Opção A)
- **Versão:** v1.0
- **Status:** Documento Institucional Oficial

---

## 📑 Sumário

1. [Objetivo](#1-objetivo)
2. [Escopo](#2-escopo)
3. [Princípios Institucionais](#3-princípios-institucionais)
4. **Processo Sequencial**
   - [ETAPA 0: Preparação](#etapa-0-preparação-institucional)
   - [ETAPA 1: Estrutura Base](#etapa-1-estrutura-base-frontend--backend)
   - [ETAPA 2: Usuário/Auth](#etapa-2-usuário-e-autenticação)
   - [ETAPA 3: Domínio](#etapa-3-páginas-de-domínio)
   - [ETAPA 4: Governança](#etapa-4-governança)
5. **Finalização**
   - [Regras de Decisão](#9-regras-institucionais-de-decisão)
   - [Conformidade](#10-critério-de-conformidade)

---

## 1. Objetivo

Este documento estabelece o processo institucional **obrigatório** para criação de aplicações Next.js Fullstack, utilizando o App Router e a arquitetura de backend integrado (Opção A).

### Benefícios:

- ✓ Base arquitetural sólida
- ✓ Evolução previsível e governável

## 2. Escopo

- `/02` Qualquer agente automatizado responsável por gerar código.
- `/03` Qualquer evolução estrutural relevante (novos módulos, grandes features).

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

## ETAPA 0: Preparação Institucional

**Número:** `0`

### 4.1 Objetivo

### 4.2 Decisões Obrigatórias (Padrão Institucional Fixo)

| Aspecto        | Definição                       |
| -------------- | ------------------------------- |
| **Framework**  | Next.js (Fullstack)             |
| **Roteamento** | App Router                      |
| **Backend**    | Opção A (`app/api` + `server/`) |
| **Banco**      | MongoDB / Mongoose              |

#### UI / Componentização:

- **Shared UI:** `src/components/` (Header, Footer, Modals, Loading, Base Form)
- **Feature UI:** `src/features/<dominio>` (Obrigatório)
- **Promoção para Shared:** Somente após 2+ páginas de uso real

- Sessão com cookie HTTP-only (contrato institucional)
- Tokens Access/Refresh seguros
- Endpoints: login, register, logout, me, reset/forgot password

#### Camadas Backend:

```
route.ts (HTTP) → controllers → services → repositories → models
```

### ✅ CRITÉRIO DE ACEITE DA ETAPA 0

**✓** Estrutura documental criada e validada

---

### Frontend — Base

```
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

```
app/api/health/route.ts
server/config/env.ts
server/db/client.ts
server/utils/errors.ts
server/utils/response.ts
server/utils/logger.ts
```

- Repositórios e services devem ser definidos por interface para permitir adapter DataRepository durante a Fase MOC (ver Cláusula 10 do MAPA_INSTITUCIONAL_V2) antes da conexão real ao Mongo Atlas.

### ✅ CRITÉRIOS DE ACEITE DA ETAPA 1

- ✓ Projeto compila
- ✓ `/api/health` responde
- ✓ Providers carregam
- ✓ ENV centralizado

---

## ETAPA 2: Usuário e Autenticação

**Número:** `2`

### Objetivo

Validar integração completa front ↔ back, com login funcional até uma home vazia protegida.

### 6.3 Backend — Usuário/Auth

**CAMADAS:**

- models, repositories, services, controllers, validators

**ROTAS:**

```
/api/auth/[login|register|logout|me|forgot|reset]
```

### 6.4 Frontend — Autenticação

**PÁGINAS:**

- /login
- /cadastro
- /resetarSenha
- /perfil
- / (home protegida)

**INFRA:**

- Provider de sessão
- Service de auth
- Proteção de rota

### ✅ Validação da Etapa 2

- ✓ Usuário consegue cadastrar e logar
- ✓ Usuário acessa home vazia autenticada
- ✓ Logout funcional e sessão persistente
- ✓ Comunicação front ↔ back validada

---

## ETAPA 3: Páginas de Domínio

**Número:** `3`

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

### Uma aplicação está em conformidade quando:

- ✅ Todas as etapas seguidas
- ✅ Nenhuma camada misturada
- ✅ Documentação acompanha código
- ✅ Ordem de criação respeitada

---

## 11. Conclusão

Este documento transforma a criação de aplicações Next.js em um processo institucional previsível, replicável por humanos ou agentes automatizados. Ele não busca velocidade inicial, mas sustentabilidade técnica, clareza arquitetural e crescimento sem caos.

---

### 📊 Status Institucional

**Homologado & Mandatório**

**Governança Técnica**
Engenharia de Software — v1.0

---

_© 2025 - Documentação Institucional Oficial - Padronização de Processos Fullstack_
