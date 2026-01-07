# PLAYBOOK_CRIADOR.md

Playbook Institucional — Criação Inicial do Projeto Stack 002

Versão: v1.0 — Playbook Oficial de Bootstrap

**Stack:** 002_next_front_node_back_mongo

---

## 1. Objetivo

Este playbook define o **processo completo de criação inicial** de um projeto com arquitetura separada: frontend Next.js + backend Node.js/Express.

Ele é responsável por **fazer o projeto nascer**, garantindo que:

- A estrutura de **dois projetos separados** esteja correta
- A **comunicação HTTP** entre frontend e backend funcione
- A autenticação distribuída opere corretamente
- As páginas institucionais existam
- Ambos os projetos compilem e rodem

Este playbook **não cria produto final**. Ele cria uma **base saudável e operacional com dois serviços independentes**.

---

## 2. Momento de Execução

Este playbook deve ser executado **uma única vez por projeto**, logo no início.

Pré-condição:

- Projeto ainda não iniciado

Pós-condição:

- Frontend e backend funcionais, comunicando-se via HTTP
- Autenticação distribuída operacional

---

## 3. Entradas Obrigatórias

- [MAPA_INSTITUCIONAL_CENTRAL.md](../../mapas_e_fluxos_centrais/MAPA_INSTITUCIONAL_CENTRAL.md)
- [FLUXO_ORQUESTRADOR_CENTRAL.md](../../mapas_e_fluxos_centrais/FLUXO_ORQUESTRADOR_CENTRAL.md)
- [MAPA_STACK_NEXT_FRONT_NODE_BACK_MONGO.md](../002_00-mapas_e_fluxos/002_MAPA_STACK_NEXT_FRONT_NODE_BACK_MONGO.md)
- [DOSSIE_REGRAS_DE_CRIACAO.md](../002_01-identidades_estrutura/002_DOSSIE_REGRAS_DE_CRIACAO.md)
- [DOSSIE_NEXT_FRONTEND.md](../002_01-identidades_estrutura/002_DOSSIE_NEXT_FRONTEND.md)
- [DOSSIE_NODE_BACKEND.md](../002_01-identidades_estrutura/002_DOSSIE_NODE_BACKEND.md)
- Referências Visuais (../002_05-referencias-etapa-criacao-estrutura/referencias-visuais/)

---

## 4. Etapas de Execução

### 4.1 Etapa C1 — Criação da Estrutura Base (Dois Projetos)

Ações obrigatórias:

**PROJETO FRONTEND:**

- Criar estrutura Next.js (App Router)
- Configurar ambiente e variáveis (`NEXT_PUBLIC_API_URL`)
- Criar estrutura de pastas conforme dossiê frontend

**PROJETO BACKEND:**

- Criar estrutura Node.js/Express com TypeScript
- Configurar ambiente e variáveis (PORT, MONGO_URI, JWT_SECRET, CORS_ORIGIN)
- Criar estrutura de pastas conforme dossiê backend

Resultado esperado:

- Dois projetos compiláveis
- Backend respondendo em porta separada (ex: 4000)
- Frontend rodando em porta 3000

---

### 4.2 Etapa C2 — Infraestrutura de Comunicação

Ações obrigatórias:

**BACKEND:**

- Configurar CORS para aceitar requisições do frontend
- Criar endpoint `/health`
- Configurar logger
- Criar helpers de erro e resposta

**FRONTEND:**

- Implementar `apiClient` (`lib/api.ts`)
- Configurar interceptors para tokens
- Criar Context e Provider para estado
- Testar chamada ao `/health` do backend

Resultado esperado:

- Frontend consegue fazer requisições HTTP ao backend
- CORS configurado adequadamente

---

### 4.3 Etapa C3 — Infraestrutura Visual Frontend

Ações obrigatórias:

- Implementar componentes shared obrigatórios:
  - Loading
  - Modals
  - Header
  - Footer (se aplicável)
- Configurar theme e estilos globais
- Criar layout base

---

### 4.4 Etapa C4 — Autenticação Distribuída (Backend)

Ações obrigatórias no **BACKEND:**

- Criar User Model (Mongoose)
- Criar User Repository
- Criar Auth Service (hash password, JWT)
- Criar Auth Controller
- Criar Auth Validators
- Criar rotas Auth:
  - POST `/api/auth/register`
  - POST `/api/auth/login`
  - POST `/api/auth/logout`
  - GET `/api/auth/me`
  - POST `/api/auth/forgot-password`
  - POST `/api/auth/reset-password`
  - POST `/api/auth/refresh`
- Criar middleware `authenticate`
- Criar usuário root (admin@exemplo.com / admin)

**Nota operacional:** Durante Fase MOC, conexão MongoDB não deve ser ativa. MOCs em `frontend/src/data/` são fonte de verdade.

Resultado esperado:

- Endpoints de auth funcionais
- JWT gerado corretamente
- Password hashing operacional

---

### 4.5 Etapa C5 — Autenticação Distribuída (Frontend)

Ações obrigatórias no **FRONTEND:**

- Criar páginas (usar HTMLs de referência LITERALMENTE):
  - `/login`
  - `/register`
  - `/forgot-password`
  - `/reset-password`
  - `/email-verification` (se aplicável)
- Criar `auth.service.ts` (chamadas ao backend)
- Implementar `AuthContext` e `useAuth`
- Implementar middleware de proteção de rotas
- Criar página `/` (home vazia protegida)
- Gerenciar tokens (localStorage ou cookies)

Regra sobre HTMLs:

- Replicar LITERALMENTE os HTMLs de referência
- Permitido alterar apenas `{APP_NAME}` e `{BRAND_PALETTE}`
- Proibido reorganizar DOM ou classes

Resultado esperado:

- Login funcional com backend
- Cadastro funcional com backend
- Home protegida acessível após login
- Logout funcional
- Tokens refresh operando

---

### 4.6 Etapa C6 — Validação de Integração

Ações obrigatórias:

**TESTES MANUAIS:**

- Cadastrar novo usuário
- Fazer login
- Acessar home protegida
- Fazer logout
- Verificar refresh token
- Login com usuário root

**VALIDAÇÕES TÉCNICAS:**

- `npm run build` (frontend) sem erros
- Backend compila sem erros
- Logs estruturados funcionando
- CORS sem bloqueios

---

## 5. Critérios de Aceite

### Frontend

- ✅ Projeto compila
- ✅ Páginas de auth renderizam
- ✅ apiClient configurado e funcional
- ✅ Context de auth operacional
- ✅ Proteção de rotas funcional
- ✅ Comunicação HTTP com backend

### Backend

- ✅ Servidor Express roda
- ✅ `/health` responde
- ✅ CORS configurado
- ✅ Endpoints de auth funcionais
- ✅ JWT gerado e validado
- ✅ Password hashing funcional
- ✅ Middleware authenticate protege rotas

### Integração

- ✅ Frontend e backend comunicam-se via HTTP
- ✅ Login funcional end-to-end
- ✅ Cadastro funcional end-to-end
- ✅ Tokens refresh funcionando
- ✅ Usuário root acessível

---

## 6. Regras de Bloqueio

Bloquear execução se:

- Tentar criar backend dentro do Next.js (isso é Stack 001)
- Frontend tentar acessar banco diretamente
- Usar documentos de outra stack
- Ignorar separação de projetos
- CORS não configurado
- Tokens não implementados
- HTMLs de referência não replicados literalmente

---

## 7. Próximos Passos

Após conclusão deste playbook:

1. Executar **PLAYBOOK_PIPELINE** (F-Designer → Auditor → Refatorador)
2. Gerar **PASSAPORTE_DO_PRODUTO** (etapa MOC)
3. Executar **PLAYBOOK_EVOLUTOR** (criar páginas do produto)

---

**Governança Técnica**  
Engenharia de Software — Stack 002 — v1.0

© 2026 - Documentação Institucional Oficial
