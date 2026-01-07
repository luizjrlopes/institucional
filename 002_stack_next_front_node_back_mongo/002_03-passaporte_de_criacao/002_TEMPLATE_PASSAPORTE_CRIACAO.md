# PASSAPORTE DE CRIAÇÃO

## Stack 002 - Next.js Frontend + Node.js Backend + MongoDB

---

## 📋 Identificação do Projeto

- **Nome do Projeto:** [Nome do projeto]
- **Stack ID:** 002
- **Stack:** Next.js Frontend + Node.js Backend + MongoDB
- **Versão do Passaporte:** 1.0.0
- **Data de Criação:** [DD/MM/AAAA]
- **Última Atualização:** [DD/MM/AAAA HH:MM]

---

## 🎯 Estado Atual (Cursor de Execução)

> **ATENÇÃO IA:** Esta seção é a "Memória RAM" do projeto. Leia SEMPRE antes de qualquer operação.

### Contexto de Execução

- **Fase Atual:** D0 (Preparação Institucional)
- **Passo Atual:** Não iniciado
- **Último Arquivo Editado:** Nenhum
- **Próximo Passo Obrigatório:** Iniciar D0 - Criar estrutura documental

### Status Geral

- **Progresso:** 0% concluído
- **Bloqueios:** Nenhum
- **Pendências Críticas:** Nenhuma
- **Último Agente Ativo:** Nenhum

### Validações de Contexto

- [ ] Dossiê de Regras carregado
- [ ] Mapa da Stack carregado
- [ ] Playbook apropriado carregado
- [ ] Sem contaminação de contexto (outras stacks)

---

## 📊 Progresso por Fase

### Fase D0 — Preparação Institucional

**Status:** 🔴 Não iniciado

#### Checklist de Decisões

- [ ] Framework Frontend: Next.js
- [ ] Framework Backend: Node.js + Express
- [ ] Banco: MongoDB / Mongoose
- [ ] Estilo: Styled Components
- [ ] Comunicação: REST API
- [ ] Tipagem compartilhada: shared/types/
- [ ] Estrutura documental criada

**Última Atualização:** [DD/MM/AAAA HH:MM]  
**Observações:** Aguardando início

---

### Fase D1 — Estrutura Base

#### Frontend - Base

**Status:** 🔴 Não iniciado

- [ ] frontend/src/app/layout.tsx
- [ ] frontend/src/app/page.tsx
- [ ] frontend/src/components/ (estrutura)
- [ ] frontend/src/styles/GlobalStyles.ts
- [ ] frontend/src/styles/theme.ts
- [ ] frontend/src/store/ (configuração)
- [ ] frontend/src/services/apiClient.ts
- [ ] frontend/src/types/ (interfaces)
- [ ] frontend/src/utils/ (helpers)

#### Backend - Base

**Status:** 🔴 Não iniciado

- [ ] backend/src/server.ts
- [ ] backend/src/app.ts
- [ ] backend/src/config/env.ts
- [ ] backend/src/config/database.ts
- [ ] backend/src/middlewares/ (error, cors, etc.)
- [ ] backend/src/utils/errors.ts
- [ ] backend/src/utils/response.ts
- [ ] backend/src/utils/logger.ts
- [ ] backend/src/routes/health.ts

#### Shared - Types

**Status:** 🔴 Não iniciado

- [ ] shared/types/index.ts
- [ ] shared/types/api.types.ts
- [ ] shared/types/user.types.ts

#### Validações D1

- [ ] Frontend compila sem erros
- [ ] Backend inicia sem erros
- [ ] Health check funciona (GET /health)
- [ ] apiClient configurado com base URL
- [ ] MOC data/ configurado no backend
- [ ] Nenhuma conexão externa ativa

**Última Atualização:** [DD/MM/AAAA HH:MM]  
**Observações:**

---

### Fase D2 — Usuário e Autenticação

**Status:** 🔴 Não iniciado

#### Backend - Auth

- [ ] backend/src/models/User.ts
- [ ] backend/src/repositories/UserRepository.ts
- [ ] backend/src/services/AuthService.ts
- [ ] backend/src/controllers/AuthController.ts
- [ ] backend/src/routes/auth.routes.ts
- [ ] backend/src/middlewares/auth.middleware.ts
- [ ] Endpoints: POST /auth/login, /auth/register, /auth/logout, GET /auth/me

#### Shared - Auth Types

- [ ] shared/types/auth.types.ts (LoginRequest, LoginResponse, User, etc.)

#### Frontend - Auth

- [ ] frontend/src/features/auth/components/ (Login, Register)
- [ ] frontend/src/features/auth/hooks/useAuth.ts
- [ ] frontend/src/features/auth/services/authService.ts
- [ ] frontend/src/store/slices/authSlice.ts
- [ ] frontend/src/app/login/page.tsx
- [ ] frontend/src/app/register/page.tsx
- [ ] frontend/src/services/apiClient.ts (interceptor de token)

#### Validações D2

- [ ] Login/Logout funcionam end-to-end
- [ ] Tokens access/refresh seguros
- [ ] Tipos do Frontend batem com Backend
- [ ] apiClient injeta token automaticamente
- [ ] Middleware de autenticação funciona
- [ ] Tratamento de erros 401/403

**Última Atualização:** [DD/MM/AAAA HH:MM]  
**Observações:**

---

### Fase D3 — Páginas de Domínio

**Status:** 🔴 Não iniciado

#### Domínios Identificados

1. [ ] [Nome do Domínio 1]
   - Rota Backend: [/api/dominio]
   - Rota Frontend: [/dominio]
   - Features principais: [listar]
2. [ ] [Nome do Domínio 2]
   - Rota Backend: [/api/dominio]
   - Rota Frontend: [/dominio]
   - Features principais: [listar]

#### Para cada domínio

**Backend:**

- [ ] Model definido (backend/src/models/)
- [ ] Repository criado (backend/src/repositories/)
- [ ] Service implementado (backend/src/services/)
- [ ] Controller configurado (backend/src/controllers/)
- [ ] Routes registradas (backend/src/routes/)

**Shared:**

- [ ] Types criados (shared/types/)

**Frontend:**

- [ ] Types importados de shared/
- [ ] Service methods no apiClient
- [ ] Feature components desenvolvidos
- [ ] Store slice (se necessário)
- [ ] Página integrada

**Validações:**

- [ ] Tipos sincronizados (Backend → shared → Frontend)
- [ ] CRUD completo funcional
- [ ] Tratamento de erros em todas as camadas

**Última Atualização:** [DD/MM/AAAA HH:MM]  
**Observações:**

---

### Fase D4 — Governança

**Status:** 🔴 Não iniciado

#### Qualidade - Backend

- [ ] ESLint configurado
- [ ] Prettier configurado
- [ ] TypeScript strict mode
- [ ] Testes unitários configurados
- [ ] Testes de integração

#### Qualidade - Frontend

- [ ] ESLint configurado
- [ ] Prettier configurado
- [ ] TypeScript strict mode
- [ ] Testes de componentes

#### Segurança

- [ ] Variáveis de ambiente protegidas (backend + frontend)
- [ ] CORS configurado adequadamente
- [ ] Rate limiting implementado
- [ ] Validação de inputs em todas as rotas
- [ ] Sanitização de dados

#### Documentação

- [ ] README.md (raiz)
- [ ] README.md (backend)
- [ ] README.md (frontend)
- [ ] API documentada (Swagger/OpenAPI)
- [ ] Guia de deploy
- [ ] Changelog iniciado

**Última Atualização:** [DD/MM/AAAA HH:MM]  
**Observações:**

---

## 🛡️ Conformidade com Regras Supremas

### REGRA SUPREMA 002 - Sincronização de Tipos

**Status de Conformidade:** ✅ Conforme | ⚠️ Atenção | ❌ Violação

- [ ] Alterações no Backend atualizam shared/types/
- [ ] Frontend usa APENAS tipos de shared/
- [ ] apiClient é a única fonte de verdade para HTTP
- [ ] Nenhum tipo duplicado entre Frontend e Backend
- [ ] CI/CD valida sincronização de tipos

**Últimas Verificações:**

- [DD/MM HH:MM] - Status: [✅/⚠️/❌] - Detalhes: [...]

**Checklist de Sincronização:**

```typescript
// Quando adicionar endpoint no Backend:
// 1. Definir types em shared/types/
// 2. Usar types no Controller/Service
// 3. Adicionar método no apiClient (frontend)
// 4. Atualizar store/hooks conforme necessário
```

---

## 📝 Histórico de Alterações

### [DD/MM/AAAA HH:MM] - Fase D0

- **Agente:** AGENTE_CRIADOR
- **Ação:** Criação do passaporte
- **Arquivos:** PASSAPORTE_DE_CRIACAO.md
- **Status:** ✅ Concluído

### [DD/MM/AAAA HH:MM] - Fase [XX]

- **Agente:** [Nome do Agente]
- **Ação:** [Descrição da ação]
- **Arquivos:** [Lista de arquivos modificados]
- **Status:** [🟢 Sucesso | 🟡 Parcial | 🔴 Falha]
- **Observações:** [Detalhes relevantes]

---

## 🚨 Bloqueios e Pendências

### Bloqueios Ativos

Nenhum bloqueio ativo no momento.

### Pendências Críticas

Nenhuma pendência crítica no momento.

### Dívidas Técnicas

Nenhuma dívida técnica registrada.

---

## 📂 Referências Utilizadas

### Snippets Aplicados

- [ ] Nenhum snippet aplicado ainda

### Documentos Consultados

- [x] 002_DOSSIE_REGRAS_DE_CRIACAO.md
- [x] 002_MAPA_STACK_NEXT_FRONT_NODE_BACK_MONGO.md
- [ ] 002_PLAYBOOK_CRIADOR.md

---

## 🔗 Monitoramento de Tipagem

### Últimas Atualizações de Tipos

| Data | Arquivo | Mudança | Frontend Atualizado? |
| ---- | ------- | ------- | -------------------- |
| -    | -       | -       | -                    |

### Endpoints sem Tipagem

Nenhum endpoint sem tipagem (meta: 0).

---

## ✅ Critérios de Conclusão

### Projeto Considerado Concluído Quando:

- [ ] Todas as fases D0-D4 marcadas como concluídas
- [ ] Frontend e Backend sincronizados (tipos)
- [ ] Todos os testes passando
- [ ] Documentação completa (incluindo API)
- [ ] Deploy em ambiente de homologação realizado
- [ ] Auditoria final aprovada

---

**Documento Vivo** | Atualizar após cada passo significativo  
**Responsável pela Atualização:** Agentes de IA (CRIADOR, EVOLUTOR, AUDITOR)  
**Frequência de Backup:** A cada fase concluída
