# Dossiê Institucional

> Nota terminológica: As "Fases" descritas neste Dossiê são internas ao próprio Dossiê e não substituem, nem conflitam com, as "Etapas" do `FLUXO_ORQUESTRADOR`. Use o FLUXO como referência operacional.

## Arquitetura de Backend — Node.js (Express) + MongoDB

---

**Versão:** v1.0 — Padrão Institucional para backend separado

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
17. [Escalabilidade e Deploy](#17-escalabilidade-e-deploy)
18. [Conclusão](#18-conclusão)

---

## 1. Objetivo do Documento

Este dossiê define o padrão oficial de organização do backend em projetos onde o backend é uma aplicação Node.js (Express/Koa) separada do frontend Next.js, persistindo dados em MongoDB.

### O objetivo é

- Padronizar estruturas de pastas e contratos entre frontend e backend
- Garantir boa isolação entre camadas
- Facilitar testes, CI/CD e deploys separados
- Permitir troca de adaptadores de persistência sem impactar services

---

## 2. Princípios Arquiteturais

- Separação clara entre API (HTTP) e domínio
- Camadas explícitas: routes → controllers → services → repositories → models
- Contratos (DTOs) como fonte de verdade entre front e back
- Configuração centralizada e tipada

---

## 3. Visão Geral da Estrutura

```plaintext
src/
  server/
    routes/          # Definição de rotas (Express routers)
    controllers/     # Adapta entrada HTTP → serviços
    services/        # Regras de negócio
    repositories/    # Acesso a dados (Mongoose ou adapters)
    models/          # Schemas Mongoose / interfaces
    middlewares/     # Autenticação, rate-limit, erros
    config/          # env, logger, consts
    db/              # Conexão com Mongo (client)
  tests/
  scripts/

Dockerfile
docker-compose.yml
```

> ⚠️ **Regra institucional:** Cada rota deve ser um Router com handlers mínimos; lógica pertence a services.

---

## 4. Camada de Rotas (HTTP)

- Use Express Router organizando por domínio: `routes/users.ts`, `routes/auth.ts`
- Rotas apenas fazem parsing de request e invocam controllers
- Middleware de validação pode ser aplicado nas rotas

---

## 5. Camada de Backend (Domínio)

- `services/` implementa casos de uso
- Services conversam com `repositories/` que encapsulam o ORM/driver

---

## 6. Configuração

- Centralizar em `src/server/config/env.ts` (usando zod/env-schema para validação)
- Nunca acessar `process.env` direto pelo código da aplicação
- Separar configurações por ambiente (dev/test/prod)

---

## 7. Banco de Dados

- Usar Mongoose como driver institucional para MongoDB
- `src/server/db/client.ts` expõe factory para conexão
- Em testes usar in-memory Mongo (mongodb-memory-server)
- Migrate/seed devem ser scripts opcionais

---

## 8. Modelos de Domínio

- Definir schemas Mongoose em `models/`
- Exportar também interfaces/Typescript para uso em services

---

## 9. Repositórios (Acesso a Dados)

- Implementar interfaces (`IUserRepository`) e `MongooseUserRepository`
- Repositório encapsula queries; services dependem da interface
- Facilitar mock para testes e adapter alternativo

---

## 10. Serviços (Regra de Negócio)

- Serviços compõem regras e orquestram repositórios
- Devem ser unit-testáveis sem infra

---

## 11. Controllers (Camada de Aplicação)

- Controllers adaptam request → DTO → service
- Lidam com tratamento de erros e status HTTP
- Não contêm lógica de negócio

---

## 12. Middlewares

- Autenticação (JWT/Session)
- Rate limiting
- Logger de requisições
- Handler de erros centralizado

---

## 13. Validação

- Usar Zod/Joi para validação de entrada
- Validar tanto camada de rota quanto dados vindos do DB quando necessário

---

## 14. Utilitários

- `logger.ts` (pino/winston)
- `response.ts` (formatador de respostas padronizadas)
- `errors.ts` (erros de domínio)

---

## 15. Fluxo Oficial de Execução

1. Express Router recebe request
2. Middleware (auth/validation)
3. Controller transforma input
4. Service executa regra de negócio
5. Repository acessa DB
6. Response padronizada retornada

---

## 16. Regras Institucionais Obrigatórias

- ❌ Nenhuma query direta em controller
- ❌ Lógica de negócio fora de services
- ✅ DTOs padronizados entre front/back
- ✅ Env centralizado em `config/env.ts`
- ✅ Tests unitários para services e integração para rotas críticas
- ✅ Contract tests entre frontend e backend (opcional mas recomendado)

---

## 17. Escalabilidade e Deploy

- Aplicações separadas: frontend e backend cada uma com pipeline CI/CD
- Docker + docker-compose para dev; imagens otimizadas para produção
- Separar secrets por pipeline; usar KeyVault/SecretsManager em produção
- Health checks e readiness probes para orquestradores

---

## 18. Conclusão

Este dossiê fornece a base institucional para desenvolvimento de backends Node.js separados que servem frontends Next.js. Seguir o padrão garante manutenção, testabilidade e escalabilidade.

---

## © 2026 - Documentação Institucional - Engenharia de Software
