# Dossiê Institucional

> Nota terminológica: As "Fases" descritas neste Dossiê são internas ao próprio Dossiê e não substituem, nem conflitam com, as "Etapas" do `FLUXO_ORQUESTRADOR`. Use o FLUXO como referência operacional.

## Arquitetura de Backend — Python (FastAPI) + MongoDB

---

**Versão:** v1.0 — Padrão Institucional para backend em Python separado

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
11. [Controllers / Routers (Camada de Aplicação)](#11-controllers--routers-camada-de-aplicação)
12. [Middlewares / Dependencies](#12-middlewares--dependencies)
13. [Validação (Pydantic)](#13-validação-pydantic)
14. [Utilitários](#14-utilitários)
15. [Fluxo Oficial de Execução](#15-fluxo-oficial-de-execução)
16. [Regras Institucionais Obrigatórias](#16-regras-institucionais-obrigatórias)
17. [Escalabilidade e Deploy](#17-escalabilidade-e-deploy)
18. [Conclusão](#18-conclusão)

---

## 1. Objetivo do Documento

Este dossiê define o padrão oficial de organização do backend quando implementado em Python usando FastAPI e persistência em MongoDB.

### O objetivo é

- Padronizar a estrutura de serviços em Python para servir frontends Next.js
- Garantir desacoplamento entre camadas e contratos claros (Pydantic)
- Facilitar testes, CI/CD e deploys separados

---

## 2. Princípios Arquiteturais

- API-first: contratos Pydantic como fonte de verdade
- Camadas explícitas: routers → controllers/deps → services → repositories → models
- Independência do ORM/driver por meio de adapters
- Configuração centralizada e segura

---

## 3. Visão Geral da Estrutura

```plaintext
src/
  app/
    api/              # Routers FastAPI (por domínio)
  app/core/
    config.py         # leitura tipada de env
    logger.py
  app/models/         # Pydantic schemas + tipos
  app/repos/          # Repositórios / adapters para Mongo
  app/services/       # Regras de negócio
  app/db/             # Conexão com Mongo (motor/motor-asyncio) / beanie
  app/middlewares/
  tests/

Dockerfile
docker-compose.yml
pyproject.toml / requirements.txt
```

---

## 4. Camada de Rotas (HTTP)

- Usar FastAPI APIRouter por domínio (`api/users.py`, `api/auth.py`)
- Routers fazem validação leve e delegam a serviços via dependências

---

## 5. Camada de Backend (Domínio)

- Services contêm regras de negócio e orquestram repositórios
- Repositories encapsulam acesso ao Mongo
- Dependencies do FastAPI (Depends) injetam services/repositories testáveis

---

## 6. Configuração

- `app/core/config.py` centraliza leitura de variáveis de ambiente (pydantic BaseSettings)
- Evitar acessar `os.environ` diretamente no código

---

## 7. Banco de Dados

- Recomendações:
  - Usar Motor (motor-asyncio) para acesso direto async, ou
  - Usar Beanie (ODM async baseado em Pydantic) para modelos mais ricos
- `app/db/client.py` expõe a inicialização/teardown da conexão
- Em testes usar `mongomock` ou `mongodb-memory-server` equivalente (testcontainers)

---

## 8. Modelos de Domínio

- Pydantic `BaseModel` para schemas de entrada/saída
- Separar `schemas` (Pydantic) de `models` (ODM) quando usar Beanie

---

## 9. Repositórios (Acesso a Dados)

- Implementar interfaces (`AbstractRepository`) e adaptadores concretos (`MongoRepository`)
- Repositórios expõem operações CRUD atômicas e transacionais quando necessário

---

## 10. Serviços (Regra de Negócio)

- Services implementam casos de uso, recebem repositórios por injeção
- Devem ser independentes de FastAPI para facilitar testes unitários

---

## 11. Controllers / Routers (Camada de Aplicação)

- Routers adaptam request → schemas → services
- Tratamento de erros e resposta padronizada (HTTPException) nesta camada

---

## 12. Middlewares / Dependencies

- Middlewares para logging, CORS, rate-limit e metrics
- Dependencies para autenticação (JWT/cookie) usando `Depends`

---

## 13. Validação (Pydantic)

- Usar Pydantic para validação, transformações e tipagem
- DTOs bem definidos para entrada e saída

---

## 14. Utilitários

- `app/core/logger.py` (structlog/standard logging)
- `app/core/response.py` helpers para respostas padronizadas
- `app/core/errors.py` erros de domínio customizados

---

## 15. Fluxo Oficial de Execução

1. FastAPI Router recebe request
2. Dependencies/validators executam
3. Controller transforma input (Pydantic)
4. Service executa lógica
5. Repository acessa Mongo
6. Resposta padronizada enviada

---

## 16. Regras Institucionais Obrigatórias

- ❌ Nenhuma lógica de negócio em routers
- ✅ Contracts (Pydantic) como fonte de verdade
- ✅ Configuração centralizada via `BaseSettings`
- ✅ Tests unitários para services e integration tests para rotas

---

## 17. Escalabilidade e Deploy

- Deploy independente do frontend; construir imagens otimizadas (multi-stage)
- Usar Gunicorn / Uvicorn workers para produção
- Health checks e readiness probes
- Env vars via secret manager em produção

---

## 18. Conclusão

Este dossiê define um padrão institucional para backends Python que servem frontends Next.js. Seguindo-o assegura-se testabilidade, manutenção e deploys seguros.

---

## © 2026 - Documentação Institucional - Engenharia de Software
