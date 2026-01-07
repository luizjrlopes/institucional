# Dossiê Institucional

## Arquitetura de Frontend — Next.js (App Router)

---

**Versão:** v1.0  
**Status:** Padrão Institucional (frontend com backend separado)

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

Este dossiê define o padrão oficial de arquitetura de frontend para aplicações desenvolvidas em Next.js com App Router, quando o backend é uma aplicação Node.js separada. Define contratos e boas práticas de comunicação entre as duas aplicações.

---

## 2. Princípios Arquiteturais

- Frontend orientado a domínio
- UI desacoplada da implementação do backend
- Comunicação via API REST/HTTP ou GraphQL com contratos tipados
- Segurança: uso de cookies HTTP-only ou tokens com critérios claros

---

## 3. Visão Geral da Estrutura

```plaintext
src/
  app/
  components/
  features/
  services/        # Agentes que chamam a API externa (backend separado)
  styles/
  hooks/
  store/
  utils/
  data/
```

---

## 4. Camada de Roteamento e Páginas

- `app/` organiza rotas e layouts
- `page.tsx` = Server Component por padrão
- `Main.tsx` (ou componentes com "use client") contém lógica interativa

---

## 5. Componentes Compartilhados (Shared UI)

- Header, Footer, Modals, Loading, Inputs
- Sem chamadas HTTP diretas; usar `services/api.ts`

---

## 6. Componentes de Domínio (Feature UI)

- `src/features/<dominio>/` com components, hooks e types

---

## 7. Hooks

- Hooks genéricos em `src/hooks/`, hooks de domínio dentro de `features/`

---

## 8. Estado Global

- Providers em `src/app/layout.tsx`
- Usar apenas quando necessário; preferir composição local

---

## 9. Estilos e Design System

- Theme tokens em `src/styles/theme.ts`
- GlobalStyles e componentes estilizados

---

## 10. Comunicação com Backend

- `src/services/api.ts` centraliza chamadas para a URL do backend (ex.: `API_BASE_URL`)
- Gerenciar auth (refresh token) e retries no layer de services
- Padronizar DTOs e erros
- CORS e cabeçalhos devem ser tratados no backend

---

## 11. Utilitários

- `AlertService`, `storage`, `formatters` etc.

---

## 12. Dados Estáticos

- `src/data/` para seeds e dados de UI

---

## 13. Tipagem Global

- `src/@types/` e arquivos `d.ts` para contratos com backend

---

## 14. Fluxo Oficial de Renderização

1. Request chega ao Next.js
2. Server Component obtém dados via `services` (server-side) chamando o backend
3. Page renderiza e injeta Client Components para interatividade
4. Client Components chamam endpoints para ações dinâmicas

---

## 15. Regras Institucionais Obrigatórias

- ✅ Componentes não chamam fetch direto; usar `services`
- ✅ Contratos DTOs mantidos em repositório comum (quando possível)
- ✅ Tratar autenticação de forma consistente (cookie vs token)
- ✅ Testes de contrato entre front e back

---

## 16. Escalabilidade Futura

- Separar micro-frontends se necessário
- Independent deploys do frontend

---

## 17. Conclusão

Este dossiê adapta o padrão institucional do frontend ao cenário em que o backend é uma aplicação Node.js separada. Mantém princípios de separação de responsabilidade, tipagem e testes de contrato.

---

## © 2026 - Documentação Institucional - Engenharia de Software
