# VALIDADOR DE CONTEXTO - Sistema Anti-Contaminação

## 📋 Visão Geral

Este documento define o protocolo de validação de contexto para garantir que agentes de IA operem com contexto cirúrgico, sem contaminação entre stacks. Deve ser executado **ANTES** de qualquer operação de geração de código.

---

## 🎯 Objetivo

Prevenir os seguintes erros críticos:

- ❌ Contaminação de Contexto (Cross-Stack Contamination)
- ❌ Amnésia de Estado (perda de tracking de fase/passo)
- ❌ Alucinação de Caminhos (estruturas de pasta incorretas)
- ❌ Invenção de Bibliotecas (uso de tecnologias não especificadas)

---

## ✅ Checklist de Validação de Contexto

### 1. Validação de Stack Única

**Objetivo:** Garantir que apenas uma stack está ativa no contexto.

```yaml
Stack Context Validator:
  current_stack_id: [Stack ID detectado no contexto]
  brief_stack_id: [Stack ID no BRIEF_PRODUTO]
  passaporte_stack_id: [Stack ID no PASSAPORTE_DE_CRIACAO]

  Verificações: ✓ current_stack_id == brief_stack_id?
    ✓ current_stack_id == passaporte_stack_id?
    ✓ Apenas documentos de uma stack carregados?
    ✓ Nenhuma referência cruzada detectada?
```

**Como Executar:**

1. Listar todos os arquivos .md carregados no contexto
2. Extrair prefixos de stack (001*, 002*, 003\_)
3. Verificar que todos pertencem à mesma stack
4. Se houver múltiplas stacks → **ABORTAR IMEDIATAMENTE**

**Comando de Auditoria:**

```bash
# Pseudo-código para validação
loaded_files = list_context_files()
stack_prefixes = extract_stack_prefixes(loaded_files)

if len(set(stack_prefixes)) > 1:
    ABORT("CONTAMINAÇÃO DE CONTEXTO DETECTADA")
```

---

### 2. Validação de Documentos Obrigatórios

**Objetivo:** Garantir que todos os documentos necessários da stack estão carregados.

**Checklist por Stack:**

#### Stack 001

```markdown
Documentos Obrigatórios:
[ ] 001_MAPA_STACK_NEXT_FULLSTACK_MONGO.md
[ ] 001_DOSSIE_REGRAS_DE_CRIACAO.md
[ ] 001_DOSSIE_NEXT_BACKEND.md
[ ] 001_DOSSIE_NEXT_FRONTEND.md
[ ] PASSAPORTE_DE_CRIACAO.md (na pasta do projeto ou template)

Playbook (carregar conforme papel do agente):
[ ] 001_PLAYBOOK_CRIADOR.md (para criação de estrutura)
[ ] 001_PLAYBOOK_EVOLUTOR.md (para evolução de features)
[ ] 001_PLAYBOOK_REFATORADOR.md (para refatoração)
[ ] 001_PLAYBOOK_AUDITOR.md (para auditoria)
[ ] 001_PLAYBOOK_F_DESIGNER.md (para design de UI)
[ ] 001_PLAYBOOK_PIPELINE.md (para CI/CD)

Nota: Carregar APENAS o playbook correspondente ao papel atual.

Regra Suprema Identificada:
[ ] REGRA SUPREMA 001 (Isolamento Server/Client) carregada
```

#### Stack 002

```markdown
Documentos Obrigatórios:
[ ] 002_MAPA_STACK_NEXT_FRONT_NODE_BACK_MONGO.md
[ ] 002_DOSSIE_REGRAS_DE_CRIACAO.md
[ ] 002_DOSSIE_NEXT_FRONTEND.md
[ ] 002_DOSSIE_NODE_BACKEND.md
[ ] PASSAPORTE_DE_CRIACAO.md (na pasta do projeto ou template)

Playbook (carregar conforme papel do agente):
[ ] 002_PLAYBOOK_CRIADOR.md (para criação de estrutura)
[ ] 002_PLAYBOOK_EVOLUTOR.md (para evolução de features)
[ ] 002_PLAYBOOK_REFATORADOR.md (para refatoração)
[ ] 002_PLAYBOOK_AUDITOR.md (para auditoria)
[ ] 002_PLAYBOOK_F_DESIGNER.md (para design de UI)
[ ] 002_PLAYBOOK_PIPELINE.md (para CI/CD)

Nota: Carregar APENAS o playbook correspondente ao papel atual.

Regra Suprema Identificada:
[ ] REGRA SUPREMA 002 (Sincronização de Tipos) carregada
```

#### Stack 003

```markdown
Documentos Obrigatórios:
[ ] 003_MAPA_STACK_NEXT_FRONT_PYTHON_BACK_MONGO.md
[ ] 003_DOSSIE_REGRAS_DE_CRIACAO.md
[ ] 003_DOSSIE_NEXT_FRONTEND.md
[ ] 003_DOSSIE_PYTHON_BACKEND.md
[ ] PASSAPORTE_DE_CRIACAO.md (na pasta do projeto ou template)

Playbook (carregar conforme papel do agente):
[ ] 003_PLAYBOOK_CRIADOR.md (para criação de estrutura)
[ ] 003_PLAYBOOK_EVOLUTOR.md (para evolução de features)
[ ] 003_PLAYBOOK_REFATORADOR.md (para refatoração)
[ ] 003_PLAYBOOK_AUDITOR.md (para auditoria)
[ ] 003_PLAYBOOK_F_DESIGNER.md (para design de UI)
[ ] 003_PLAYBOOK_PIPELINE.md (para CI/CD)

Nota: Carregar APENAS o playbook correspondente ao papel atual.

Regra Suprema Identificada:
[ ] REGRA SUPREMA 003 (Conversão snake_case/camelCase) carregada
```

---

### 3. Validação de Estado (Cursor de Execução)

**Objetivo:** Verificar que o PASSAPORTE está atualizado e o estado é consistente.

```yaml
State Validator:
  passaporte_existe: [true/false]

  Se passaporte existe: ✓ Campo "Estado Atual" preenchido?
    ✓ "Fase Atual" é válida (D0, D1, D2, D3, D4)?
    ✓ "Passo Atual" é consistente com a fase?
    ✓ "Último Arquivo Editado" existe no projeto?
    ✓ "Próximo Passo Obrigatório" está definido?
    ✓ Timestamp de atualização é recente?

  Se passaporte NÃO existe: → Criar usando template da stack correspondente
```

**Validações de Consistência:**

```markdown
Fase D0 (Preparação):
✓ Passaporte criado
✓ Nenhum arquivo de código criado ainda

Fase D1 (Estrutura Base):
✓ Estrutura de pastas existe
✓ Arquivos base compilam sem erros
✓ Health check configurado

Fase D2 (Autenticação):
✓ D1 100% concluída
✓ Models/Schemas de User existem
✓ Rotas de auth configuradas

Fase D3 (Domínio):
✓ D2 100% concluída
✓ Autenticação funcionando
✓ Pelo menos 1 domínio identificado

Fase D4 (Governança):
✓ D3 100% concluída
✓ Testes configurados
✓ Documentação iniciada
```

---

### 4. Validação de Bibliotecas e Tecnologias

**Objetivo:** Garantir que apenas tecnologias aprovadas pela stack são usadas.

**Critério de Permissão:**

- ✅ **OBRIGATÓRIAS:** Tecnologias core da stack (não podem ser substituídas)
- ✅ **PERMITIDAS:** Bibliotecas complementares que não conflitam com regras supremas
- ⚠️ **CONSULTAR:** Bibliotecas não listadas (perguntar ao usuário)
- ❌ **PROIBIDAS:** Tecnologias que violam arquitetura ou regras supremas

---

#### Stack 001

```yaml
OBRIGATÓRIAS (Tecnologia Core):
  Frontend:
    - Next.js (App Router) ← Framework base
    - React ← Biblioteca UI
    - TypeScript ← Linguagem
    - Styled Components ← Estilização (OBRIGATÓRIA)

  Backend Integrado:
    - Next.js API Routes ← API layer
    - Mongoose (MongoDB) ← Database ORM
    - bcrypt / bcryptjs ← Hashing de senha
    - jsonwebtoken ← Autenticação

PERMITIDAS (Complementares):
  UI/UX - Ícones:
    - React Icons / Lucide Icons / Heroicons

  UI/UX - Animações:
    - Framer Motion
    - React Spring

  UI/UX - Componentes Headless (RECOMENDADO):
    - Radix UI (modals, dropdowns, tooltips, etc.)
    - Headless UI (@headlessui/react)
    - React Aria (Adobe - acessibilidade)
    - Reach UI (tabs, dialogs, etc.)
    - Downshift (select/combobox)
    - React Select (select avançado)

  Nota: Componentes headless são PREFERIDOS a criar do zero.
    Use Styled Components para estilizar.

  Formulários & Validação:
    - React Hook Form
    - Zod / Yup / Joi

  State Management:
    - Redux Toolkit (recomendado)
    - Zustand (alternativa leve)
    - Jotai / Recoil (átomos)

  Utilidades:
    - Date-fns / Day.js (manipulação de datas)
    - Lodash / Ramda (utilitários)
    - Axios (HTTP client - se preferir ao fetch)
    - React Query / SWR (data fetching)

  Testing:
    - Jest + Testing Library
    - Vitest
    - Cypress / Playwright (E2E)

⚠️ CONSULTAR ANTES DE USAR:
  - Material UI / Ant Design / Chakra UI
    (podem conflitar com Styled Components)
  - NextAuth.js (se implementar auth custom)
  - GraphQL / Apollo (mudança arquitetural)

❌ PROIBIDO (Viola Regras Supremas ou Arquitetura):
  - Tailwind CSS (viola obrigatoriedade do Styled Components)
  - Prisma (viola uso obrigatório do Mongoose)
  - Express (viola arquitetura de API Routes)
  - CSS Modules (viola Styled Components)
  - Styled inline: style={{...}} (viola Styled Components)
  - Sequelize / TypeORM (não é MongoDB)
```

#### Stack 002

```yaml
OBRIGATÓRIAS (Tecnologia Core):
  Frontend:
    - Next.js (App Router) ← Framework base
    - React ← Biblioteca UI
    - TypeScript ← Linguagem
    - Styled Components ← Estilização (OBRIGATÓRIA)

  Backend (Node.js):
    - Express ← Framework backend
    - Mongoose (MongoDB) ← Database ORM
    - bcrypt ← Hashing de senha
    - jsonwebtoken ← Autenticação
    - cors ← CORS handling
    - helmet ← Security headers

  Shared:
    - shared/types/ ← Tipagem compartilhada (OBRIGATÓRIA)

PERMITIDAS (Complementares):
  Frontend:
    - React Icons / Lucide Icons / Heroicons
    - Framer Motion / React Spring (animações)
    - React Hook Form + Zod/Yup
    - Redux Toolkit / Zustand / Jotai
    - Axios (já listado) / React Query / SWR
    - Date-fns / Day.js
    - Lodash / Ramda

  Backend:
    - express-validator (validação de requests)
    - morgan (logging HTTP)
    - winston / pino (logging avançado)
    - nodemailer (emails)
    - multer (upload de arquivos)
    - compression (gzip)
    - rate-limiter-flexible (rate limiting)

  Testing:
    - Jest + Testing Library (frontend)
    - Jest + Supertest (backend)
    - Cypress / Playwright (E2E)

⚠️ CONSULTAR ANTES DE USAR:
  - Material UI / Ant Design / Chakra UI
  - Passport.js (se implementar auth custom)
  - GraphQL / Apollo
  - Socket.io (WebSockets)
  - Bull / Bee-Queue (filas)

❌ PROIBIDO (Viola Regras Supremas ou Arquitetura):
  - Tailwind CSS (viola Styled Components)
  - Prisma (viola Mongoose)
  - Next.js API Routes (usar Express no backend)
  - Sequelize / TypeORM (não é MongoDB)
  - Tipos duplicados entre frontend/backend (usar shared/types/)
```

#### Stack 003

```yaml
OBRIGATÓRIAS (Tecnologia Core):
  Frontend:
    - Next.js (App Router) ← Framework base
    - React ← Biblioteca UI
    - TypeScript ← Linguagem
    - Styled Components ← Estilização (OBRIGATÓRIA)

  Backend (Python):
    - FastAPI ← Framework backend
    - Motor (MongoDB async) ← Database driver
    - Pydantic (com alias_generator) ← Validação (OBRIGATÓRIA)
    - bcrypt / passlib ← Hashing de senha
    - python-jose ← JWT
    - uvicorn ← ASGI server

PERMITIDAS (Complementares):
  Frontend:
    - React Icons / Lucide Icons / Heroicons
    - Framer Motion / React Spring
    - React Hook Form + Zod/Yup
    - Redux Toolkit / Zustand / Jotai
    - Axios / React Query / SWR
    - Date-fns / Day.js
    - Lodash / Ramda

  Backend (Python):
    - python-multipart (upload de arquivos)
    - aiofiles (async file I/O)
    - python-dotenv (env variables)
    - slowapi (rate limiting)
    - python-jose[cryptography] (JWT avançado)
    - email-validator (validação de emails)
    - httpx (async HTTP client)
    - loguru (logging avançado)
    - beanie (ODM alternativo ao Motor, se usar Pydantic models)

  Testing:
    - pytest + pytest-asyncio (backend)
    - Jest + Testing Library (frontend)
    - Cypress / Playwright (E2E)

⚠️ CONSULTAR ANTES DE USAR:
  - Material UI / Ant Design / Chakra UI
  - Celery (task queue)
  - GraphQL / Strawberry
  - WebSockets (FastAPI suporta)
  - SQLAlchemy (apenas se houver SQL além do Mongo)

❌ PROIBIDO (Viola Regras Supremas ou Arquitetura):
  - Tailwind CSS (viola Styled Components)
  - Django / Flask (viola FastAPI)
  - PyMongo (usar Motor para async)
  - Pydantic SEM alias_generator (viola REGRA SUPREMA 003)
  - SQLAlchemy como ORM principal (não é MongoDB)
  - Schemas sem conversão camelCase (viola REGRA SUPREMA 003)
```

**Comando de Auditoria:**

```bash
# Verificar imports não autorizados
# Stack 001:
grep -r "from 'express'" src/
grep -r "import.*prisma" src/
grep -r "className=" src/ | grep -v "styled"

# Se retornar resultados → VIOLAÇÃO
```

---

### 5. Validação de Estrutura de Arquivos

**Objetivo:** Garantir que caminhos relativos estão corretos conforme o MAPA da stack.

**Validação de Paths:**

```typescript
// Exemplo de validação para Stack 001
const VALID_PATHS_001 = {
  frontend: [
    "src/app/",
    "src/components/",
    "src/features/",
    "src/styles/",
    "src/store/",
    "src/services/",
    "src/utils/",
  ],
  backend: [
    "server/models/",
    "server/repositories/",
    "server/services/",
    "server/controllers/",
    "server/utils/",
    "server/config/",
    "server/db/",
  ],
  api: ["app/api/"],
};

function validateFilePath(filePath: string, stack: string): boolean {
  const validPaths = getValidPathsForStack(stack);
  return validPaths.some((validPath) => filePath.startsWith(validPath));
}
```

**Checklist:**

```markdown
[ ] Arquivo criado está em caminho válido do MAPA?
[ ] Imports usam paths corretos (@ aliases)?
[ ] Nenhum import de path absoluto do filesystem?
[ ] Convenção de nomenclatura seguida?

- Stack 001: camelCase para arquivos TS/TSX
- Stack 002: camelCase (front) + snake_case (back Node)
- Stack 003: camelCase (front) + snake_case (back Python)
```

---

## 🚨 Protocolo de Erro

### Quando Detectar Contaminação

Se alguma validação falhar:

1. **PAUSAR** todas as operações
2. **REPORTAR** erro específico ao usuário
3. **AGUARDAR** confirmação de limpeza de contexto
4. **NÃO PROSSEGUIR** até contexto estar limpo

**Mensagens de Erro Padrão:**

```
ERRO DE CONTAMINAÇÃO DE CONTEXTO
Detectados documentos de múltiplas stacks:
- Stack 001: [lista de arquivos]
- Stack 002: [lista de arquivos]

AÇÃO NECESSÁRIA:
1. Descartar contexto atual
2. Recarregar apenas Stack [ID desejada]
3. Re-executar validação

Deseja proceder com limpeza de contexto? (s/n)
```

---

## 📊 Relatório de Validação

Após executar todas as validações, gerar relatório:

```yaml
Relatório de Validação de Contexto
Data: [DD/MM/AAAA HH:MM]
Stack ID: [XXX]

Validações:
  1. Stack Única: ✅ APROVADO | ❌ FALHOU
  2. Documentos Obrigatórios: ✅ APROVADO | ❌ FALHOU
  3. Estado Consistente: ✅ APROVADO | ❌ FALHOU
  4. Bibliotecas Permitidas: ✅ APROVADO | ❌ FALHOU
  5. Estrutura de Arquivos: ✅ APROVADO | ❌ FALHOU

Status Geral: ✅ APROVADO PARA OPERAÇÃO | ❌ BLOQUEADO

Observações:
  [Detalhes de falhas, se houver]
```

---

## 🔄 Quando Re-validar

Execute validação completa:

- ✅ Ao iniciar nova sessão de trabalho
- ✅ Ao trocar de stack
- ✅ Após carregar documentos adicionais
- ✅ Antes de gerar qualquer código
- ✅ Após mudanças significativas no passaporte
- ✅ A cada 10 operações de edição de arquivo
- ✅ Sempre que houver dúvida sobre o estado

---

## 🛠️ Ferramentas de Validação

### Script de Validação Automática

```bash
#!/bin/bash
# validate-context.sh

echo "=== VALIDADOR DE CONTEXTO ==="
echo ""

# 1. Detectar Stack
STACK_ID=$(grep -r "stack_id:" BRIEF_PRODUTO.md | cut -d' ' -f2)
echo "Stack Detectada: $STACK_ID"

# 2. Validar documentos
echo "Validando documentos obrigatórios..."
# [lógica de validação]

# 3. Validar imports
echo "Validando imports e bibliotecas..."
# [lógica de validação]

# 4. Relatório
echo ""
echo "Status: [APROVADO/BLOQUEADO]"
```

---

## 📝 Integração com PASSAPORTE

Adicionar ao PASSAPORTE seção de validação:

```markdown
## 🔍 Última Validação de Contexto

**Data:** [DD/MM/AAAA HH:MM]
**Status:** ✅ Aprovado | ⚠️ Atenção | ❌ Falhou

**Detalhes:**

- Stack Única: [status]
- Documentos: [status]
- Estado: [status]
- Bibliotecas: [status]
- Estrutura: [status]

**Próxima Validação:** Antes de [próxima fase/passo]
```

---

**Documento de Controle** | Executar antes de qualquer operação crítica  
**Responsável:** Todos os agentes de IA  
**Frequência:** Conforme seção "Quando Re-validar"
