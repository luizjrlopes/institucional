# FLUXO_STACK_002_NEXT_FRONT_NODE_BACK_MONGO.md

Fluxo Técnico — Stack 002

**Stack:** Next.js (Frontend) + Node.js (Backend) + MongoDB

**Versão:** v1.0

---

## 1. Escopo

Este fluxo se aplica **somente** quando `stack_id = STACK_002_NEXT_FRONT_NODE_BACK_MONGO`.

---

## 2. Criação Base

1. Criar projeto Next.js (Frontend)
2. Criar projeto Node.js (Backend separado)
3. Definir integração via HTTP

---

## 3. Backend Node

1. Estruturar backend:

   - database
   - models
   - repositories
   - services
   - controllers
   - routes
   - index/bootstrap

---

## 4. Autenticação

1. Implementar auth distribuída
2. Definir contrato de sessão/token

---

## 5. Execução de Página

Para cada página:

1. Criar UI no Next
2. Criar endpoints no Node
3. Consumir via apiClient

---

## 6. Pipeline Obrigatório

1. Executar F-Designer
2. Executar Auditor
3. Executar Refatorador (se necessário)

---

## 7. Regras de Bloqueio

Bloquear se:

- backend for criado dentro do Next
- frontend acessar DB diretamente
- documentos da Stack 001 forem usados

---

## 8. Regra Final

Frontend e backend são **separados**, integrados por contrato.
