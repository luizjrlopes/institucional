# PASSAPORTE DE CRIAÇÃO

## Stack 001 - Next.js Fullstack (API Routes + MongoDB)

---

## 📋 Identificação do Projeto

- **Nome do Projeto:** [Nome do projeto]
- **Stack ID:** 001
- **Stack:** Next.js Fullstack (API Routes + MongoDB)
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

- [ ] Framework definido: Next.js Fullstack
- [ ] Roteamento: App Router
- [ ] Backend: Opção A (app/api + server/)
- [ ] Banco: MongoDB / Mongoose
- [ ] Estilo: Styled Components
- [ ] Estrutura documental criada

**Última Atualização:** [DD/MM/AAAA HH:MM]  
**Observações:** Aguardando início

---

### Fase D1 — Estrutura Base

**Status:** 🔴 Não iniciado

#### Frontend - Base

- [ ] src/app/layout.tsx
- [ ] src/app/page.tsx
- [ ] src/components/ (estrutura)
- [ ] src/styles/GlobalStyles.ts
- [ ] src/styles/theme.ts
- [ ] src/store/ (configuração)
- [ ] src/services/api.ts
- [ ] src/utils/ (helpers)

#### Backend - Base

- [ ] app/api/health/route.ts
- [ ] server/config/env.ts
- [ ] server/db/client.ts (estrutura MOC-ready)
- [ ] server/utils/errors.ts
- [ ] server/utils/response.ts
- [ ] server/utils/logger.ts

#### Validações D1

- [ ] Estrutura compila sem erros
- [ ] Health check funciona
- [ ] MOC data/ configurado
- [ ] Nenhuma conexão externa ativa

**Última Atualização:** [DD/MM/AAAA HH:MM]  
**Observações:**

---

### Fase D2 — Usuário e Autenticação

**Status:** 🔴 Não iniciado

#### Backend - Auth

- [ ] server/models/User.ts
- [ ] server/repositories/UserRepository.ts
- [ ] server/services/AuthService.ts
- [ ] server/controllers/AuthController.ts
- [ ] app/api/auth/login/route.ts
- [ ] app/api/auth/register/route.ts
- [ ] app/api/auth/logout/route.ts
- [ ] app/api/auth/me/route.ts

#### Frontend - Auth

- [ ] src/features/auth/components/ (Login, Register)
- [ ] src/features/auth/hooks/useAuth.ts
- [ ] src/store/slices/authSlice.ts
- [ ] src/app/login/page.tsx
- [ ] src/app/register/page.tsx

#### Validações D2

- [ ] Login/Logout funcionam
- [ ] Sessão persiste corretamente
- [ ] Tokens access/refresh seguros
- [ ] Middleware de autenticação ativo

**Última Atualização:** [DD/MM/AAAA HH:MM]  
**Observações:**

---

### Fase D3 — Páginas de Domínio

**Status:** 🔴 Não iniciado

#### Domínios Identificados

1. [ ] [Nome do Domínio 1]
   - Rota: [/caminho]
   - Features principais: [listar]
2. [ ] [Nome do Domínio 2]
   - Rota: [/caminho]
   - Features principais: [listar]

#### Para cada domínio

- [ ] Model definido
- [ ] Repository criado
- [ ] Service implementado
- [ ] Controller configurado
- [ ] API routes criadas
- [ ] Feature components desenvolvidos
- [ ] Página integrada

**Última Atualização:** [DD/MM/AAAA HH:MM]  
**Observações:**

---

### Fase D4 — Governança

**Status:** 🔴 Não iniciado

#### Qualidade

- [ ] ESLint configurado
- [ ] Prettier configurado
- [ ] TypeScript strict mode
- [ ] Testes unitários configurados

#### Segurança

- [ ] Variáveis de ambiente protegidas
- [ ] CORS configurado
- [ ] Rate limiting implementado
- [ ] Validação de inputs em todas as rotas

#### Documentação

- [ ] README.md completo
- [ ] API documentada
- [ ] Guia de deploy
- [ ] Changelog iniciado

**Última Atualização:** [DD/MM/AAAA HH:MM]  
**Observações:**

---

## 🛡️ Conformidade com Regras Supremas

### REGRA SUPREMA 001 - Isolamento Server/Client

**Status de Conformidade:** ✅ Conforme | ⚠️ Atenção | ❌ Violação

- [ ] Arquivos em src/app NÃO importam de src/models
- [ ] Arquivos em src/components NÃO importam de src/server
- [ ] Comunicação via /api/\* ou Server Actions
- [ ] Componentes Client Side sem lógica de servidor

**Últimas Verificações:**

- [DD/MM HH:MM] - Status: [✅/⚠️/❌] - Detalhes: [...]

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

- [x] 001_DOSSIE_REGRAS_DE_CRIACAO.md
- [x] 001_MAPA_STACK_NEXT_FULLSTACK_MONGO.md
- [ ] 001_PLAYBOOK_CRIADOR.md

---

## ✅ Critérios de Conclusão

### Projeto Considerado Concluído Quando:

- [ ] Todas as fases D0-D4 marcadas como concluídas
- [ ] Todos os testes passando
- [ ] Documentação completa
- [ ] Deploy em ambiente de homologação realizado
- [ ] Auditoria final aprovada

---

**Documento Vivo** | Atualizar após cada passo significativo  
**Responsável pela Atualização:** Agentes de IA (CRIADOR, EVOLUTOR, AUDITOR)  
**Frequência de Backup:** A cada fase concluída
