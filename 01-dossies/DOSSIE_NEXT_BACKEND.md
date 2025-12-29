# Dossiê Institucional

## Arquitetura de Backend — Next.js

### Opção A: Backend Integrado ao App Router

---

**Versão:** v1.0 — Padrão Institucional

---

## 📑 Sumário

1. [Objetivo do Documento](#1-objetivo-do-documento)
2. [Princípios Arquiteturais](#2-princípios-arquiteturais)
3. [Visão Geral da Estrutura](#3-visão-geral-da-estrutura)
4. [Camada de Rotas (HTTP)](#4-camada-de-rotas-http)
5. [Camada de Backend (Domínio)](#5-camada-de-backend-domínio)
6. [Configuração](#6-configuração)
7. [Banco de Dados](#7-banco-de-dados)
8. [Modelos de Domínio](#8-modelos-de-domínio)
9. [Repositórios (Acesso a Dados)](#9-repositórios-acesso-a-dados)
10. [Serviços (Regra de Negócio)](#10-serviços-regra-de-negócio)
11. [Controllers (Camada de Aplicação)](#11-controllers-camada-de-aplicação)
12. [Middlewares](#12-middlewares)
13. [Validação](#13-validação)
14. [Utilitários](#14-utilitários)
15. [Fluxo Oficial de Execução](#15-fluxo-oficial-de-execução)
16. [Regras Institucionais Obrigatórias](#16-regras-institucionais-obrigatórias)
17. [Escalabilidade Futura](#17-escalabilidade-futura)
18. [Conclusão](#18-conclusão)

---

## 1. Objetivo do Documento

Este dossiê define o padrão oficial de organização do backend em projetos Next.js utilizando o App Router, adotando o modelo de backend integrado ao frontend.

### O objetivo é:

- Preservar a arquitetura clássica de backend Node.js (camadas bem definidas)
- Evitar acoplamento excessivo entre lógica de domínio e camada HTTP
- Permitir crescimento do projeto sem degradação estrutural
- Facilitar onboarding, revisão de código e auditoria técnica

---

## 2. Princípios Arquiteturais

A arquitetura descrita neste documento segue os princípios:

| Princípio                          | Descrição                               |
| ---------------------------------- | --------------------------------------- |
| **Separação de responsabilidades** | Cada camada tem um propósito específico |
| **Camadas explícitas**             | Estrutura visível e previsível          |
| **Código orientado a domínio**     | Organização por contextos de negócio    |
| **Rotas como portas de entrada**   | Não como lógica                         |
| **Escalabilidade**                 | Sem reestruturação radical              |

> 💡 O Next.js é utilizado como framework fullstack, porém com distinção clara entre:
>
> - Camada de interface (UI)
> - Camada HTTP (API)
> - Camada de domínio (backend)

---

## 3. Visão Geral da Estrutura

```
src/
  app/
    api/                # Camada HTTP (rotas do backend)
  server/               # Backend estruturado por camadas
```

- `src/app/api/**` representa a camada de rotas
- `src/server/**` representa o backend propriamente dito

> ⚠️ **Essa separação é obrigatória no padrão institucional.**

---

## 4. Camada de Rotas (HTTP)

**Pasta:** `src/app/api/`

### Responsabilidade:

Implementar endpoints HTTP do backend, equivalentes à pasta `routes/` em aplicações Express.

### Características:

- Cada rota é representada por uma pasta
- O arquivo `route.ts` é o handler HTTP
- O nome da pasta define a URL pública (/api/...)

### Exemplo:

```
src/app/api/users/route.ts
src/app/api/users/[id]/route.ts
```

### Responsabilidades Permitidas vs Proibidas

| ✅ Permitidas                              | ❌ Proibidas             |
| ------------------------------------------ | ------------------------ |
| Leitura de request (params, headers, body) | Regras de negócio        |
| Validação inicial                          | Queries diretas ao banco |
| Chamada de controller ou service           | Lógica complexa          |
| Retorno de Response                        |                          |

> ⚠️ **Regra institucional:** `route.ts` é uma porta de entrada, nunca o local da lógica principal.

---

## 5. Camada de Backend (Domínio)

**Pasta raiz:** `src/server/`

Esta pasta contém todo o backend estruturado, independente da existência do Next.js. Ela deve ser pensada como um backend Node.js completo, apenas embutido no projeto.

---

## 6. Configuração

**Pasta:** `src/server/config/`

**Arquivo:** `env.ts`

### Responsabilidade:

- Centralizar leitura de variáveis de ambiente
- Validar presença e formato
- Exportar objeto tipado de configuração

### Justificativa:

Evita falhas silenciosas em produção e garante previsibilidade de ambiente.

---

## 7. Banco de Dados

**Pasta:** `src/server/db/`

### `client.ts`

**Responsabilidade:**

- Criar e configurar o cliente do banco de dados
- Garantir reutilização da conexão (especialmente em dev)
- **Equivalente clássico:** `database/index.ts`

### `index.ts`

**Responsabilidade:**

- Reexportar o client
- Centralizar imports

---

## 8. Modelos de Domínio

**Pasta:** `src/server/models/`

**Exemplo:** `User.model.ts`

### Responsabilidade:

- Definir a estrutura da entidade
- Representar o domínio de forma explícita

> ⚠️ **Importante:**
>
> - Models não implementam casos de uso
> - Models não lidam com HTTP
> - Models não conhecem controllers ou rotas

---

## 9. Repositórios (Acesso a Dados)

**Pasta:** `src/server/repositories/`

**Exemplo:** `User.repository.ts`

### Responsabilidade:

- Executar operações de persistência
- Encapsular queries
- Isolar o ORM/driver do resto do sistema

### Benefícios:

- Facilita testes
- Permite troca de banco/ORM
- Mantém services limpos

### Nota sobre adapters (Fase MOC → Mongo)

- Definir interfaces de repositório e usar uma factory para injetar implementações.
- Durante a Fase MOC (ver Cláusula 10 do MAPA_INSTITUCIONAL_V2), usar adapter DataRepository (mock/data em arquivos ou memória) sem alterar services/controllers.
- Na migração para Mongo Atlas (após ETAPA 7 do FLUXO_ORQUESTRADOR), trocar apenas o adapter pela implementação Mongoose, mantendo contratos e DTOs.

### ⚠️ Salvaguardas para evitar problemas nas rotas da API:

1. **DTOs padronizados**: Definir tipos de entrada/saída (DTOs) desde o início que funcionem para ambos adapters.
2. **Schemas Mongoose como referência**: Criar schemas Mongoose desde já (sem conectar ao banco) e usar seus tipos como contrato; o mock deve simular a mesma estrutura.
3. **IDs consistentes**: Mock deve gerar IDs compatíveis com ObjectId (string de 24 chars hex) ou usar biblioteca que simule ObjectId.
4. **Validações espelhadas**: Se o schema Mongoose tem validações (required, enum, min/max), o mock deve validar da mesma forma antes de "persistir".
5. **Testes de contrato**: Criar testes que validem que mock e Mongo retornam a mesma estrutura para as mesmas operações.
6. **Sem lógica específica do adapter em services**: Services nunca devem saber se estão usando mock ou Mongo; apenas interfaces genéricas (findById, create, update, delete).

---

## 10. Serviços (Regra de Negócio)

**Pasta:** `src/server/services/`

**Exemplo:** `User.service.ts`, `Auth.service.ts`

### Responsabilidade:

- Implementar casos de uso
- Orquestrar repositórios
- Aplicar regras de negócio
- Integrar serviços externos

> ⚠️ **Regra institucional:** Toda lógica que decide "o que pode ou não pode" pertence ao service.

---

## 11. Controllers (Camada de Aplicação)

**Pasta:** `src/server/controllers/`

**Exemplo:** `User.controller.ts`

### Responsabilidade:

- Adaptar a entrada HTTP para o domínio
- Coordenar validações
- Traduzir retorno de service em resposta padronizada
- **Equivalente clássico:** Controllers do Express

> 📝 Observação: Embora opcionais em projetos pequenos, são recomendados institucionalmente para evitar acoplamento.

---

## 12. Middlewares

**Pasta:** `src/server/middlewares/`

**Exemplos:** `requireAuth.ts`, `rateLimit.ts`

### Responsabilidade:

- Autenticação
- Autorização
- Proteções transversais

### Podem ser usados:

- Diretamente em `route.ts`
- Ou integrados via `middleware.ts` do Next, quando aplicável

---

## 13. Validação

**Pasta:** `src/server/validators/`

**Exemplos:** `auth.schemas.ts`, `user.schemas.ts`

### Responsabilidade:

- Validar input (Zod/Yup/etc.)
- Garantir integridade antes de chegar ao service

> ⚠️ **Regra institucional:** Services assumem dados já validados.

---

## 14. Utilitários

**Pasta:** `src/server/utils/`

### Arquivos:

#### `errors.ts`

Erros de domínio padronizados

#### `response.ts`

Helpers de resposta HTTP

#### `logger.ts`

Logging estruturado

> 💡 Esses utilitários garantem consistência e reduzem duplicação.

---

## 15. Fluxo Oficial de Execução

**Exemplo:** `GET /api/users/[id]`

```
1. route.ts recebe request
   ↓
2. Controller interpreta a entrada
   ↓
3. Service executa regra de negócio
   ↓
4. Repository acessa o banco
   ↓
5. Resultado sobe pela cadeia
   ↓
6. Resposta padronizada é retornada
```

---

## 16. Regras Institucionais Obrigatórias

⚠️ **ATENÇÃO - REGRAS MANDATÓRIAS:**

- ⚠️ Nenhuma query direta em `route.ts`
- ⚠️ Nenhuma regra de negócio em controller
- ⚠️ Nenhum acesso a `process.env` fora de `config/env.ts`
- ⚠️ Backend sempre fora de `src/app/` (exceto app/api)
- ⚠️ Cada camada com responsabilidade única

---

## 17. Escalabilidade Futura

Quando necessário, esta estrutura permite evolução para:

```
src/server/modules/<feature>/
```

> 💡 Sem reescrever o sistema ou quebrar contratos existentes.

---

## 18. Conclusão

Este padrão institucional permite que projetos Next.js atuem como aplicações fullstack robustas, mantendo disciplina arquitetural equivalente a backends Node tradicionais.

Ele elimina improviso, reduz acoplamento e prepara o projeto para crescimento sustentável.

---

_© 2025 - Documentação de Padrão Institucional - Engenharia de Software_
