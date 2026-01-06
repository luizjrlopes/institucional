# FLUXO_STACK_001_NEXT_FULLSTACK_MONGO.md

Fluxo Técnico — Stack 001

**Stack:** Next.js Fullstack + MongoDB (Mongoose)

**Versão:** v1.0

---

## 1. Escopo

Este fluxo se aplica **somente** quando `stack_id = STACK_001_NEXT_FULLSTACK_MONGO`.

---

## 2. Criação Base

1. Criar projeto Next.js (App Router)
2. Configurar estrutura `src/`
3. Configurar MongoDB + Mongoose
4. Criar camadas backend internas:

   - database
   - models
   - repositories
   - services
   - controllers
   - routes (handlers)

---

## 3. Autenticação

1. Implementar auth conforme playbook da stack
2. Proteger rotas via middleware/guards

---

## 4. Execução de Página

Para cada página:

1. Criar rota em `app/`
2. Criar UI (shared/feature)
3. Criar backend interno (se necessário)
4. Conectar via services

---

## 5. Pipeline Obrigatório

1. Executar F-Designer
2. Executar Auditor
3. Executar Refatorador (se necessário)

---

## 6. Regras de Bloqueio

Bloquear se:

- backend externo for criado
- DB não for Mongo/Mongoose
- camadas forem puladas

---

## 7. Regra Final

Tudo ocorre **dentro do Next**.

---

---

---
