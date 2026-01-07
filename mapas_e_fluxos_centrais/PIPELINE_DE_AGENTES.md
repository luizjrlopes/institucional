# PIPELINE DE AGENTES - Fluxo de Execução

**Versão:** 1.0  
**Data:** 07/01/2026  
**Status:** Documento Oficial

---

## 📋 Visão Geral

Este documento define o **pipeline obrigatório** de execução dos agentes no sistema institucional. Cada agente tem um papel específico e deve ser executado na ordem correta para garantir qualidade e conformidade.

---

## 🎯 Princípios do Pipeline

### 1. Separação de Responsabilidades

Cada agente tem **uma única responsabilidade** clara:

- **CRIADOR:** Estrutura e arquitetura
- **EVOLUTOR:** Novas funcionalidades
- **F_DESIGNER:** UI/UX e estética
- **AUDITOR:** Validação e conformidade
- **REFATORADOR:** Correção de problemas
- **PIPELINE:** Orquestração (quando aplicável)

### 2. Ciclo de Qualidade

**Nenhum código vai para produção sem passar pelo AUDITOR.**

### 3. Loop de Refinamento

Se o AUDITOR reprovar, o REFATORADOR corrige até aprovação.

---

## 🔄 Pipeline Padrão de Desenvolvimento

### Sequência Obrigatória

```
┌─────────────────────────────────────────────────────────────┐
│  FASE 1: CRIAÇÃO/EVOLUÇÃO                                   │
│  Agente: CRIADOR (estrutura) ou EVOLUTOR (features)        │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────┐
│  FASE 2: DESIGN UI/UX                                       │
│  Agente: F_DESIGNER                                         │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────┐
│  FASE 3: AUDITORIA                                          │
│  Agente: AUDITOR                                            │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  ▼
            ┌─────┴─────┐
            │ Aprovado? │
            └─────┬─────┘
       ┌──────────┼──────────┐
       │ SIM      │          │ NÃO
       ▼          │          ▼
  ┌────────┐     │    ┌─────────────────┐
  │FINALIZA│     │    │  REFATORADOR    │
  └────────┘     │    └────────┬────────┘
                 │             │
                 │             ▼
                 │    ┌─────────────────┐
                 │    │    AUDITOR      │
                 │    │   (revalida)    │
                 │    └────────┬────────┘
                 │             │
                 └─────────────┘
```

---

## 📝 Detalhamento por Fase

### FASE 1: CRIAÇÃO/EVOLUÇÃO

#### CRIADOR (Estrutura Base)

**Quando usar:** Fase D1 (Estrutura Base) e D2 (Autenticação)

**Responsabilidades:**

```yaml
Input:
  - BRIEF_PRODUTO
  - DOSSIE_REGRAS_DE_CRIACAO
  - MAPA_STACK
  - PLAYBOOK_CRIADOR
  - PASSAPORTE (vazio ou fase D0)

Ações: 1. Criar estrutura de pastas conforme MAPA
  2. Criar arquivos base (layout, config, utils)
  3. Configurar dependências (package.json, requirements.txt)
  4. Implementar autenticação básica (login, register)
  5. Seguir REGRAS SUPREMAS estritamente
  6. Usar snippets de 05-referencias/

Output:
  - Código funcional (pode não ser bonito)
  - Estrutura conforme arquitetura
  - Testes básicos passando
  - PASSAPORTE atualizado (D1/D2 concluída)

Próximo agente: F_DESIGNER
```

#### EVOLUTOR (Novas Features)

**Quando usar:** Fase D3 (Páginas de Domínio) em diante

**Responsabilidades:**

```yaml
Input:
  - PASSAPORTE (fase D2+ concluída)
  - DOSSIE_REGRAS
  - PLAYBOOK_EVOLUTOR
  - Requisitos da nova feature

Ações: 1. Criar Models/Schemas para novo domínio
  2. Criar Repositories, Services, Controllers
  3. Criar rotas/endpoints
  4. Criar componentes de UI (estrutura básica)
  5. Integrar com autenticação existente
  6. Seguir padrões já estabelecidos

Output:
  - Nova funcionalidade funcionando
  - Integrada com o sistema existente
  - Testes da feature passando
  - PASSAPORTE atualizado

Próximo agente: F_DESIGNER
```

---

### FASE 2: DESIGN UI/UX

#### F_DESIGNER (Frontend Designer)

**Quando usar:** Sempre após CRIADOR ou EVOLUTOR

**Responsabilidades:**

```yaml
Input:
  - Código funcional do CRIADOR/EVOLUTOR
  - PLAYBOOK_F_DESIGNER
  - Sistema de design (se houver)

Ações: 1. USAR componentes prontos (Radix UI, Headless UI)
  - Modal → @radix-ui/react-dialog
  - Dropdown → @radix-ui/react-dropdown-menu
  - Tooltip → @radix-ui/react-tooltip
  - Select → @radix-ui/react-select ou Downshift

  2. Estilizar com Styled Components
  - Aplicar tema (cores, tipografia, espaçamentos)
  - Garantir responsividade
  - Adicionar estados hover/active/disabled

  3. Melhorar experiência do usuário
  - Feedback visual (loading, success, error)
  - Animações suaves (Framer Motion)
  - Micro-interações

  4. Garantir acessibilidade
  - Contraste adequado
  - Navegação por teclado
  - ARIA labels (componentes headless já têm)

  5. Otimizar performance visual
  - Lazy loading de imagens
  - Skeleton loading
  - Otimizar re-renders

Output:
  - UI polida e profissional
  - Componentes acessíveis
  - Experiência fluida
  - Documentação de componentes (se necessário)

Próximo agente: AUDITOR
```

**Exemplo - Modal com Radix UI:**

```typescript
import * as Dialog from "@radix-ui/react-dialog";
import styled from "styled-components";

const Overlay = styled(Dialog.Overlay)`
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled(Dialog.Content)`
  background: ${(props) => props.theme.colors.background};
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  max-width: 500px;
  width: 90%;
`;

const Title = styled(Dialog.Title)`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 16px;
`;

// F_DESIGNER não cria lógica de modal do zero,
// apenas estiliza o comportamento do Radix UI
```

---

### FASE 3: AUDITORIA

#### AUDITOR

**Quando usar:** Sempre após F_DESIGNER (ou após REFATORADOR)

**Responsabilidades:**

```yaml
Input:
  - Código do CRIADOR/EVOLUTOR + F_DESIGNER
  - PLAYBOOK_AUDITOR
  - DOSSIE_REGRAS (com REGRAS SUPREMAS)
  - PASSAPORTE

Ações:
  1. Validar REGRAS SUPREMAS
     Stack 001:
       ✓ Nenhum import de src/server em Client Components?
       ✓ Comunicação via API Routes ou Server Actions?

     Stack 002:
       ✓ Tipos sincronizados (Backend → shared → Frontend)?
       ✓ apiClient é a única fonte de HTTP?

     Stack 003:
       ✓ Pydantic usa alias_generator=to_camel?
       ✓ Frontend usa camelCase, backend snake_case?

  2. Validar Estrutura
     ✓ Arquivos nos caminhos corretos do MAPA?
     ✓ Nomenclatura seguida?
     ✓ Imports corretos?

  3. Validar Qualidade
     ✓ Código limpo e legível?
     ✓ Sem duplicação desnecessária?
     ✓ Componentes reutilizáveis?

  4. Validar Funcionalidade
     ✓ Testes passando?
     ✓ Funcionalidade funcionando end-to-end?
     ✓ Tratamento de erros adequado?

  5. Validar UI/UX
     ✓ Acessibilidade (WCAG AA)?
     ✓ Responsividade?
     ✓ Performance (lighthouse > 80)?

  6. Gerar Relatório
     - Lista de aprovações ✅
     - Lista de problemas ❌
     - Gravidade (crítico, alto, médio, baixo)

Output:
  - Relatório de auditoria detalhado
  - Status: APROVADO ou REPROVADO
  - Se REPROVADO: lista de ações para REFATORADOR

Próximo agente:
  - Se APROVADO: FINALIZA (ou próxima fase)
  - Se REPROVADO: REFATORADOR
```

**Formato do Relatório:**

```yaml
Relatório de Auditoria
Data: 07/01/2026 15:30
Fase: D2 (Autenticação)
Auditor: AGENTE_AUDITOR

Conformidade com Regras Supremas:
  Stack 001 - REGRA SUPREMA 001: ✅ APROVADO
    - Nenhum import proibido detectado
    - Comunicação correta via API Routes

Estrutura de Arquivos:
  ✅ Todos os arquivos em caminhos válidos
  ✅ Nomenclatura consistente

Qualidade de Código:
  ✅ Código limpo e bem estruturado
  ⚠️ Duplicação detectada em auth.service.ts (linha 45-60)

Funcionalidade:
  ✅ Login funciona corretamente
  ✅ Register valida emails duplicados
  ❌ Logout não limpa token do cookie (CRÍTICO)

UI/UX:
  ✅ Acessibilidade adequada
  ✅ Responsivo (mobile, tablet, desktop)
  ⚠️ Loading state faltando no botão de login

Performance:
  ✅ Lighthouse: 92/100

RESULTADO FINAL: ❌ REPROVADO

Ações Obrigatórias para REFATORADOR:
  1. [CRÍTICO] Corrigir logout - limpar cookie HTTP-only
  2. [MÉDIO] Adicionar loading state no botão de login
  3. [BAIXO] Refatorar duplicação em auth.service.ts
```

---

### FASE 4: REFATORAÇÃO (Condicional)

#### REFATORADOR

**Quando usar:** Quando AUDITOR reprova

**Responsabilidades:**

```yaml
Input:
  - Relatório do AUDITOR
  - Código atual (com problemas)
  - PLAYBOOK_REFATORADOR
  - DOSSIE_REGRAS

Ações:
  1. Ler relatório do AUDITOR
  2. Priorizar problemas CRÍTICOS primeiro
  3. Para cada problema:
     - Localizar código problemático
     - Corrigir mantendo funcionalidade
     - Testar correção
     - Marcar como resolvido
  4. Atualizar PASSAPORTE
  5. NÃO adicionar features novas
  6. NÃO mudar arquitetura

Output:
  - Problemas corrigidos
  - Funcionalidade mantida/melhorada
  - Relatório de refatoração
  - PASSAPORTE atualizado

Próximo agente: AUDITOR (para revalidação)
```

**Loop de Refinamento:**

```
REFATORADOR → corrige problemas
    ↓
AUDITOR → revalida
    ↓
    ├─→ ✅ APROVADO → FINALIZA
    └─→ ❌ REPROVADO → REFATORADOR (novamente)

Máximo de iterações: 3
Se não aprovar em 3 iterações → Escalar para humano
```

---

## 🎯 Casos de Uso Específicos

### Caso 1: Criação de Estrutura Base (Fase D1)

```yaml
Sequência: 1. CRIADOR
  - Cria estrutura de pastas
  - Configura Next.js, Mongoose, Styled Components
  - Cria layout.tsx, page.tsx básicos
  - Configura theme, GlobalStyles
  - Cria Health Check

  2. F_DESIGNER
  - Estiliza layout base
  - Aplica cores, tipografia, espaçamentos do tema
  - Adiciona Loading component (Skeleton)
  - Garante responsividade

  3. AUDITOR
  - Valida estrutura conforme MAPA
  - Verifica se compila sem erros
  - Testa Health Check
  - ✅ APROVA (se tudo OK)

  4. FINALIZA FASE D1
```

### Caso 2: Criação de Feature de Usuários (Fase D3)

```yaml
Sequência:
  1. EVOLUTOR
     - Cria User Model (server/models/User.ts)
     - Cria UserRepository, UserService, UserController
     - Cria rotas /api/users (CRUD)
     - Cria componentes UserList, UserForm (básico)
     - Cria página /users

  2. F_DESIGNER
     - Usa Radix UI Dialog para modal de criar/editar usuário
     - Usa Radix UI Dropdown para ações (editar, deletar)
     - Estiliza lista com hover states
     - Adiciona animações de entrada (Framer Motion)
     - Implementa feedback visual (toast notifications)

  3. AUDITOR
     - Valida REGRA SUPREMA 001 (sem imports proibidos)
     - Testa CRUD completo (criar, listar, editar, deletar)
     - Valida acessibilidade do modal
     - Testa responsividade
     - ❌ REPROVA: Falta validação de email único

  4. REFATORADOR
     - Adiciona validação de email único no UserService
     - Adiciona mensagem de erro no frontend
     - Testa correção

  5. AUDITOR (revalidação)
     - Testa validação de email único
     - ✅ APROVA

  6. FINALIZA FEATURE
```

### Caso 3: Refatoração de Código Legado

```yaml
Sequência: 1. REFATORADOR (acionado diretamente)
  - Identifica código para refatorar
  - Aplica melhorias (sem quebrar funcionalidade)
  - Extrai componentes duplicados
  - Melhora nomes de variáveis

  2. AUDITOR
  - Valida que funcionalidade não quebrou
  - Verifica qualidade do código
  - ✅ APROVA

  3. FINALIZA REFATORAÇÃO
```

---

## 📊 Métricas e KPIs

### Métricas por Agente

**CRIADOR:**

- Tempo médio de criação de estrutura
- % de estruturas aprovadas na primeira auditoria
- Cobertura de testes

**EVOLUTOR:**

- Tempo médio por feature
- % de features aprovadas na primeira auditoria
- Bugs encontrados em produção

**F_DESIGNER:**

- Score de acessibilidade (Lighthouse)
- Performance score (Lighthouse)
- Tempo médio de estilização

**AUDITOR:**

- % de aprovação (primeira tentativa)
- Número médio de problemas encontrados
- Tempo médio de auditoria

**REFATORADOR:**

- Número médio de iterações até aprovação
- Tempo médio de correção
- % de regressões introduzidas

---

## 🚨 Protocolo de Escalação

### Quando Escalar para Humano

```yaml
Cenário 1: Loop Infinito
  - REFATORADOR → AUDITOR → REFATORADOR (3+ vezes)
  - Ação: Pausar e pedir orientação humana

Cenário 2: Problema Arquitetural
  - AUDITOR detecta violação grave de REGRA SUPREMA
  - Correção requer mudança arquitetural
  - Ação: Consultar humano antes de refatorar

Cenário 3: Requisito Ambíguo
  - CRIADOR/EVOLUTOR não consegue interpretar requisito
  - Ação: Pausar e pedir clarificação

Cenário 4: Tecnologia Não Listada
  - Agente precisa usar biblioteca não documentada
  - Ação: Consultar VALIDADOR_DE_CONTEXTO
  - Se não estiver listada → Perguntar ao humano
```

---

## 🔗 Integração com Outros Documentos

Este pipeline referencia e é referenciado por:

- **ORQUESTRADOR_MESTRE.md** → Define protocolo Check-Wait-Act
- **FLUXO_ORQUESTRADOR_CENTRAL.md** → Define fases D0→D4
- **VALIDADOR_DE_CONTEXTO.md** → Valida antes de cada agente
- **PLAYBOOK\_\*.md** → Instruções específicas por agente
- **PASSAPORTE_DE_CRIACAO.md** → Rastreia execução do pipeline

---

## ✅ Checklist de Execução

### Antes de Iniciar Pipeline

```markdown
[ ] Stack selecionada (BRIEF_PRODUTO)
[ ] Contexto validado (VALIDADOR_DE_CONTEXTO)
[ ] PASSAPORTE atualizado
[ ] Documentos da stack carregados
[ ] Playbook do agente atual carregado
```

### Após Cada Agente

```markdown
[ ] Ação concluída
[ ] Output gerado
[ ] PASSAPORTE atualizado (Estado Atual)
[ ] Testes executados (se aplicável)
[ ] Próximo agente identificado
```

### Antes de Finalizar Fase

```markdown
[ ] AUDITOR aprovou
[ ] PASSAPORTE marcado como concluído
[ ] Código commitado (se usando git)
[ ] Documentação atualizada
```

---

**Documento de Orquestração** | Pipeline Obrigatório  
**Responsável:** Todos os agentes  
**Frequência:** A cada criação/evolução de código
