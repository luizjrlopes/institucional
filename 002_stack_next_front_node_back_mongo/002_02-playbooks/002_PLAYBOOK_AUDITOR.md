# PLAYBOOK_AUDITOR.md

Playbook Institucional — Auditoria de Conformidade — Stack 002

Versão: v1.0 — Playbook Obrigatório

**Stack:** 002_next_front_node_back_mongo

---

## 1. Objetivo

Garantir que o código entregue (frontend Next.js + backend Node.js) está em conformidade com os dossiês institucionais e as regras de arquitetura da Stack 002.

Este playbook é executado automaticamente pelo **PLAYBOOK_PIPELINE**.

---

## 2. Documentos de Referência

- [MAPA_STACK_NEXT_FRONT_NODE_BACK_MONGO](../002_00-mapas_e_fluxos/002_MAPA_STACK_NEXT_FRONT_NODE_BACK_MONGO.md)
- [DOSSIE_REGRAS_DE_CRIACAO](../002_01-identidades_estrutura/002_DOSSIE_REGRAS_DE_CRIACAO.md)
- [DOSSIE_NEXT_FRONTEND](../002_01-identidades_estrutura/002_DOSSIE_NEXT_FRONTEND.md)
- [DOSSIE_NODE_BACKEND](../002_01-identidades_estrutura/002_DOSSIE_NODE_BACKEND.md)

---

## 3. Critérios de Auditoria

### 3.1 Auditoria de Estrutura

#### Frontend

- [ ] Projetos separados (frontend ≠ backend)
- [ ] Estrutura de pastas conforme dossiê
- [ ] `src/app/` para rotas
- [ ] `src/components/` para shared
- [ ] `src/features/` para domínio
- [ ] `src/lib/api.ts` existe e centraliza HTTP
- [ ] `src/services/` para chamadas ao backend

#### Backend

- [ ] Projeto separado do frontend
- [ ] Estrutura de camadas clara
- [ ] `src/routes/` para rotas Express
- [ ] `src/controllers/` para handlers
- [ ] `src/services/` para lógica
- [ ] `src/repositories/` para dados
- [ ] `src/models/` para schemas Mongoose
- [ ] `src/database/` para conexão

---

### 3.2 Auditoria de Separação de Responsabilidades

#### Frontend

❌ **VIOLAÇÕES CRÍTICAS:**

- Fetch direto em componentes (sem usar apiClient)
- Lógica de negócio no frontend
- Acesso direto a banco de dados
- Importação de código do backend

✅ **CONFORMIDADE:**

- Componentes usam hooks
- Hooks usam services
- Services usam apiClient
- apiClient faz requisições HTTP

#### Backend

❌ **VIOLAÇÕES CRÍTICAS:**

- Lógica de negócio em controllers
- Queries diretas em controllers
- Routes com lógica complexa
- Mistura de camadas

✅ **CONFORMIDADE:**

- Routes apenas definem endpoints
- Controllers apenas tratam HTTP
- Services contêm lógica
- Repositories acessam dados
- Models definem schemas

---

### 3.3 Auditoria de Comunicação HTTP

- [ ] Frontend usa `NEXT_PUBLIC_API_URL`
- [ ] Backend aceita requisições do frontend (CORS)
- [ ] Contratos HTTP documentados
- [ ] DTOs tipados em ambos os lados
- [ ] Tratamento de erros HTTP no frontend
- [ ] Respostas padronizadas no backend

---

### 3.4 Auditoria de Autenticação

- [ ] JWT implementado no backend
- [ ] Tokens incluídos em requisições (frontend)
- [ ] Middleware `authenticate` protege rotas
- [ ] Refresh token implementado
- [ ] Password hashing (bcrypt)
- [ ] Tokens não expostos em logs

---

### 3.5 Auditoria de Validação

#### Backend

- [ ] Validação de entrada (express-validator ou similar)
- [ ] Validação antes de chamar services
- [ ] Erros de validação retornados adequadamente

#### Frontend

- [ ] Validação de formulários
- [ ] Feedback visual de erros
- [ ] Estados loading/erro tratados

---

### 3.6 Auditoria de Build

#### Frontend

```bash
npm run build
```

- [ ] Build sem erros
- [ ] Build sem warnings críticos
- [ ] TypeScript compila

#### Backend

```bash
npm run build  # ou tsc
```

- [ ] Compila sem erros
- [ ] TypeScript compila
- [ ] Sem dependências faltando

---

### 3.7 Auditoria de Fase MOC

Durante Fase MOC:

- [ ] Frontend usa MOCs em `data/` (não banco real)
- [ ] Backend não estabelece conexão ativa com MongoDB
- [ ] Testes não dependem de banco externo

---

## 4. Classificação de Resultado

### APROVADO

- Todas as verificações críticas passaram
- Builds limpos
- Arquitetura conforme
- Pode prosseguir

### APROVADO COM RESSALVAS

- Pequenas violações não-críticas detectadas
- Recomendações para melhorias
- Pode prosseguir mas requer atenção

### BLOQUEADO

- Violações críticas detectadas
- Arquitetura comprometida
- **OBRIGATÓRIO:** Acionar PLAYBOOK_REFATORADOR
- Não pode prosseguir sem correção

---

## 5. Violações Críticas (Bloqueiam)

### Frontend

- Frontend acessa banco diretamente
- Fetch direto sem apiClient
- Backend dentro do projeto Next.js
- Importação cruzada frontend ↔ backend

### Backend

- Backend dentro do projeto frontend
- Lógica de negócio em controllers
- Queries em routes
- Sem separação de camadas
- Sem validação de entrada
- Passwords sem hash

### Integração

- CORS não configurado
- Autenticação não implementada
- Contratos HTTP quebrados
- Tokens não protegidos

---

## 6. Relatório de Auditoria

Ao final, gerar relatório em:

`002_03-passaporte_de_criacao/RELATORIO_AUDITORIA_[DATA].md`

Conteúdo:

```markdown
# Relatório de Auditoria — Stack 002

**Data:** [DATA]
**Versão:** [VERSÃO]
**Status:** [APROVADO|APROVADO_COM_RESSALVAS|BLOQUEADO]

## Frontend

- Estrutura: [OK|FALHA]
- Separação: [OK|FALHA]
- ApiClient: [OK|FALHA]
- Build: [OK|FALHA]

## Backend

- Estrutura: [OK|FALHA]
- Camadas: [OK|FALHA]
- Validação: [OK|FALHA]
- Build: [OK|FALHA]

## Integração

- CORS: [OK|FALHA]
- Auth: [OK|FALHA]
- Contratos: [OK|FALHA]

## Violações Detectadas

[Lista de violações]

## Recomendações

[Lista de recomendações]
```

---

## 7. Ações Pós-Auditoria

### Se APROVADO

- Continuar fluxo normalmente
- Registrar em histórico

### Se APROVADO COM RESSALVAS

- Registrar ressalvas
- Monitorar em próximas iterações

### Se BLOQUEADO

- Acionar PLAYBOOK_REFATORADOR imediatamente
- Não permitir prosseguir
- Notificar usuário

---

**Governança Técnica**  
Engenharia de Software — Stack 002 — v1.0

© 2026 - Documentação Institucional Oficial
