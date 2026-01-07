# PASSAPORTE DE CRIAÇÃO

## Stack 003 - Next.js Frontend + Python Backend + MongoDB

---

## 📋 Identificação do Projeto

- **Nome do Projeto:** [Nome do projeto]
- **Stack ID:** 003
- **Stack:** Next.js Frontend + Python Backend + MongoDB
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
- [ ] Framework Backend: Python + FastAPI
- [ ] Banco: MongoDB / Motor (async)
- [ ] Estilo: Styled Components
- [ ] Comunicação: REST API
- [ ] Conversão de case: snake_case ↔ camelCase
- [ ] Validação: Pydantic com alias_generator
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
- [ ] frontend/src/services/apiClient.ts (com interceptor camelCase)
- [ ] frontend/src/types/ (interfaces em camelCase)
- [ ] frontend/src/utils/ (helpers)
- [ ] frontend/src/utils/caseConverter.ts (se necessário)

#### Backend - Base

**Status:** 🔴 Não iniciado

- [ ] backend/main.py
- [ ] backend/app/**init**.py
- [ ] backend/app/config/settings.py
- [ ] backend/app/config/database.py
- [ ] backend/app/middlewares/ (cors, error_handler, etc.)
- [ ] backend/app/utils/errors.py
- [ ] backend/app/utils/response.py
- [ ] backend/app/utils/logger.py
- [ ] backend/app/routers/health.py
- [ ] backend/requirements.txt (FastAPI, Motor, Pydantic, etc.)

#### Pydantic Config

**Status:** 🔴 Não iniciado

- [ ] backend/app/schemas/base.py (BaseModel com alias_generator=to_camel)
- [ ] Configuração model_config com populate_by_name=True

#### Validações D1

- [ ] Frontend compila sem erros
- [ ] Backend inicia sem erros (uvicorn)
- [ ] Health check funciona (GET /health)
- [ ] apiClient configurado com base URL
- [ ] Pydantic retorna JSON em camelCase
- [ ] MOC data/ configurado no backend
- [ ] Nenhuma conexão externa ativa

**Última Atualização:** [DD/MM/AAAA HH:MM]  
**Observações:**

---

### Fase D2 — Usuário e Autenticação

**Status:** 🔴 Não iniciado

#### Backend - Auth

- [ ] backend/app/models/user.py (Motor/Pydantic)
- [ ] backend/app/schemas/user.py (UserCreate, UserResponse com alias)
- [ ] backend/app/schemas/auth.py (LoginRequest, TokenResponse com alias)
- [ ] backend/app/repositories/user_repository.py
- [ ] backend/app/services/auth_service.py (bcrypt, JWT)
- [ ] backend/app/routers/auth.py
- [ ] backend/app/dependencies/auth.py (get_current_user)
- [ ] Endpoints: POST /auth/login, /auth/register, /auth/logout, GET /auth/me

#### Frontend - Auth

- [ ] frontend/src/types/auth.types.ts (em camelCase)
- [ ] frontend/src/features/auth/components/ (Login, Register)
- [ ] frontend/src/features/auth/hooks/useAuth.ts
- [ ] frontend/src/features/auth/services/authService.ts
- [ ] frontend/src/store/slices/authSlice.ts
- [ ] frontend/src/app/login/page.tsx
- [ ] frontend/src/app/register/page.tsx
- [ ] frontend/src/services/apiClient.ts (interceptor de token)

#### Validações D2

- [ ] Login/Logout funcionam end-to-end
- [ ] Backend retorna JSON em camelCase (userId, não user_id)
- [ ] Frontend envia JSON em camelCase
- [ ] Tokens JWT seguros
- [ ] Dependência get_current_user funciona
- [ ] Tratamento de erros 401/403
- [ ] Conversão de case é transparente

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

- [ ] Model definido (backend/app/models/)
- [ ] Schema Pydantic com alias_generator (backend/app/schemas/)
- [ ] Repository criado (backend/app/repositories/)
- [ ] Service implementado (backend/app/services/)
- [ ] Router configurado (backend/app/routers/)
- [ ] Validação: snake_case interno, camelCase na API

**Frontend:**

- [ ] Types em camelCase (frontend/src/types/)
- [ ] Service methods no apiClient
- [ ] Feature components desenvolvidos
- [ ] Store slice (se necessário)
- [ ] Página integrada

**Validações:**

- [ ] Backend usa snake_case internamente
- [ ] API expõe camelCase
- [ ] Frontend usa camelCase
- [ ] Conversão é bidirecional e transparente
- [ ] CRUD completo funcional
- [ ] Tratamento de erros em todas as camadas

**Última Atualização:** [DD/MM/AAAA HH:MM]  
**Observações:**

---

### Fase D4 — Governança

**Status:** 🔴 Não iniciado

#### Qualidade - Backend

- [ ] Pylint/Flake8 configurado
- [ ] Black (formatter) configurado
- [ ] MyPy (type checking) configurado
- [ ] Pytest configurado
- [ ] Testes unitários
- [ ] Testes de integração

#### Qualidade - Frontend

- [ ] ESLint configurado
- [ ] Prettier configurado
- [ ] TypeScript strict mode
- [ ] Testes de componentes

#### Segurança

- [ ] Variáveis de ambiente protegidas (.env)
- [ ] CORS configurado adequadamente
- [ ] Rate limiting implementado
- [ ] Validação Pydantic em todos os endpoints
- [ ] Sanitização de dados

#### Documentação

- [ ] README.md (raiz)
- [ ] README.md (backend)
- [ ] README.md (frontend)
- [ ] API documentada (FastAPI auto-docs)
- [ ] Guia de conversão snake_case/camelCase
- [ ] Guia de deploy
- [ ] Changelog iniciado

**Última Atualização:** [DD/MM/AAAA HH:MM]  
**Observações:**

---

## 🛡️ Conformidade com Regras Supremas

### REGRA SUPREMA 003 - Conversão de Case

**Status de Conformidade:** ✅ Conforme | ⚠️ Atenção | ❌ Violação

#### Backend (Python)

- [ ] Pydantic usa alias_generator=to_camel
- [ ] model_config com populate_by_name=True
- [ ] Código interno usa snake_case
- [ ] API expõe camelCase
- [ ] Documentação FastAPI reflete camelCase

#### Frontend (JavaScript/TypeScript)

- [ ] Types usam camelCase
- [ ] apiClient envia/recebe camelCase
- [ ] Interceptor converte se necessário
- [ ] Nenhum campo em snake_case no frontend

**Últimas Verificações:**

- [DD/MM HH:MM] - Status: [✅/⚠️/❌] - Detalhes: [...]

**Exemplo de Conformidade:**

```python
# backend/app/schemas/user.py
from pydantic import BaseModel, ConfigDict, Field

class UserResponse(BaseModel):
    model_config = ConfigDict(
        alias_generator=lambda x: ''.join(
            word.capitalize() if i > 0 else word
            for i, word in enumerate(x.split('_'))
        ),
        populate_by_name=True
    )

    user_id: str  # Interno: snake_case
    first_name: str  # API retorna: firstName
    created_at: datetime  # API retorna: createdAt
```

```typescript
// frontend/src/types/user.types.ts
export interface User {
  userId: string; // camelCase
  firstName: string;
  createdAt: string;
}
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

- [x] 003_DOSSIE_REGRAS_DE_CRIACAO.md
- [x] 003_MAPA_STACK_NEXT_FRONT_PYTHON_BACK_MONGO.md
- [ ] 003_PLAYBOOK_CRIADOR.md

---

## 🔍 Monitoramento de Conversão de Case

### Checklist de Validação

- [ ] Todos os schemas Pydantic têm alias_generator
- [ ] FastAPI docs mostram camelCase
- [ ] Frontend types em camelCase
- [ ] Testes validam conversão bidirecional

### Casos Especiais Documentados

Nenhum caso especial registrado.

---

## ✅ Critérios de Conclusão

### Projeto Considerado Concluído Quando:

- [ ] Todas as fases D0-D4 marcadas como concluídas
- [ ] Conversão snake_case/camelCase 100% funcional
- [ ] Frontend e Backend sincronizados (case-insensitive)
- [ ] Todos os testes passando
- [ ] Documentação completa (incluindo API FastAPI)
- [ ] Deploy em ambiente de homologação realizado
- [ ] Auditoria final aprovada

---

**Documento Vivo** | Atualizar após cada passo significativo  
**Responsável pela Atualização:** Agentes de IA (CRIADOR, EVOLUTOR, AUDITOR)  
**Frequência de Backup:** A cada fase concluída
