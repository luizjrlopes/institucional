# ORQUESTRADOR MESTRE DE GERAÇÃO (AI-DRIVEN)

## 📋 Visão Geral

Este documento é o **Bootloader** do sistema institucional. Ele define o protocolo obrigatório que agentes de IA devem seguir para garantir geração de código sem alucinações, contaminação de contexto ou desvios das especificações técnicas.

---

## 🚀 1. Inicialização (Boot Sequence)

### 1.1 Identificação de Stack

O Agente **DEVE** iniciar toda operação solicitando ao usuário:

```
"Qual Stack ID você deseja utilizar baseada no CATALOGO_STACKS?"

Opções disponíveis:
- 001: Next.js Fullstack (API Routes + MongoDB)
- 002: Next.js Frontend + Node.js Backend + MongoDB
- 003: Next.js Frontend + Python Backend + MongoDB
```

### 1.2 Validação de Contexto

Antes de prosseguir, o agente deve verificar:

- ✅ O Stack ID é válido (existe no CATALOGO_STACKS.md)
- ✅ Todos os documentos obrigatórios da stack estão acessíveis
- ✅ Não há contexto de outras stacks carregado na memória

**REGRA CRÍTICA:** Se houver contexto de stack diferente carregado, o agente deve **DESCARTAR TUDO** e começar do zero.

---

## 🔄 2. Carregamento de Contexto (Context Loading Protocol)

### 2.1 Contexto Cirúrgico

Assim que o usuário selecionar a Stack (ex: `003`), o Agente deve carregar **EXCLUSIVAMENTE** os seguintes arquivos na ordem especificada:

#### Fase 1: Documentos Estruturais

1. `CATALOGO_STACKS.md` (Para resolver caminhos e identificadores)
2. `MAPA_INSTITUCIONAL_CENTRAL.md` (Para entender a hierarquia)
3. `FLUXO_ORQUESTRADOR_CENTRAL.md` (Para entender o pipeline)

#### Fase 2: Documentos da Stack Específica

Carregar APENAS da pasta correspondente (ex: `003_stack_next_front_python_back_mongo/`):

1. **Mapa da Stack:** `00-mapas_e_fluxos/003_MAPA_STACK_*.md`
2. **Regras Técnicas (A "Bíblia"):** `01-identidades_estrutura/003_DOSSIE_REGRAS_DE_CRIACAO.md`
3. **Identidades de Código:**
   - `01-identidades_estrutura/003_DOSSIE_NEXT_FRONTEND.md`
   - `01-identidades_estrutura/003_DOSSIE_*_BACKEND.md`
4. **Playbook da Fase Atual:** (Apenas o necessário)
   - Para criação: `02-playbooks/003_PLAYBOOK_CRIADOR.md`
   - Para evolução: `02-playbooks/003_PLAYBOOK_EVOLUTOR.md`
   - E assim por diante...

#### Fase 3: Estado do Projeto

1. **Passaporte de Criação:** `03-passaporte_de_criacao/PASSAPORTE_DE_CRIACAO.md`
   - Se não existir, criar usando o template da pasta `03-passaporte/`

### 2.2 Proibições Absolutas

❌ **NUNCA** carregar arquivos de múltiplas stacks simultaneamente  
❌ **NUNCA** misturar regras de stacks diferentes  
❌ **NUNCA** presumir estruturas de pasta sem consultar o mapa  
❌ **NUNCA** inventar nomes de bibliotecas ou pacotes não especificados no Dossiê

---

## ⚙️ 3. Modo de Operação: "Check-Wait-Act"

Para evitar alucinações, o agente **DEVE** seguir este loop estrito em cada operação:

### 3.1 FASE: CHECK (Verificação)

```
1. LER o PASSAPORTE_DE_CRIACAO.md (se não existir, criar via template)
2. IDENTIFICAR:
   - Qual é a Fase Atual? (D1, D2, D3, etc.)
   - Qual é o Passo Atual? (ex: "2.3 - Criar Controller de Auth")
   - Qual foi o Último Arquivo Editado?
   - Qual é o Próximo Passo Obrigatório?
3. CONSULTAR o DOSSIE_REGRAS para confirmar:
   - Quais tecnologias são obrigatórias?
   - Quais são as proibições absolutas?
   - Existe alguma Regra Suprema que se aplica?
```

### 3.2 FASE: WAIT (Planejamento)

```
4. PLANEJAR:
   - Listar TODOS os arquivos que precisam ser criados/modificados
   - Para CADA arquivo, identificar:
     * Caminho completo baseado no Mapa da Stack
     * Dependências de outros arquivos
     * Regras específicas do Dossiê que se aplicam
5. CONSULTAR REFERÊNCIAS:
   - Buscar na pasta `05-referencias-etapa-criacao-estrutura/`
   - Existe snippet de exemplo? (ex: `snippets/auth_service.example.py`)
   - Existe referência visual? (ex: `referencias-visuais/diagrama-auth.md`)
6. SE NÃO ENCONTRAR REFERÊNCIA CLARA:
   **PAUSE e PERGUNTE:** "Não encontrei referência para X no Dossiê.
   Devo seguir o padrão Y ou aguardar instrução?"
```

### 3.3 FASE: ACT (Execução)

```
7. GERAR CÓDIGO:
   - Se houver snippet de referência: **HIDRATÁ-LO** com os dados do projeto
   - Se não houver: Seguir estritamente as regras do Dossiê
8. EXECUTAR AUDITORIA IMEDIATA (Checklist por Stack):

   Stack 001 - Check Obrigatório:
   ✅ Arquivos em src/app ou src/components NÃO importam diretamente de src/models?
   ✅ Comunicação com DB é SEMPRE via /api/* ou Server Actions?
   ✅ Componentes Client Side ('use client') não têm lógica de servidor?

   Stack 002 - Check Obrigatório:
   ✅ Alterações no Backend geraram atualização em frontend/src/types?
   ✅ O apiClient tem a nova rota mapeada?
   ✅ Os tipos TypeScript batem com o JSON de resposta do Backend?

   Stack 003 - Check Obrigatório:
   ✅ Backend Python usa Pydantic com camelCase na saída JSON?
   ✅ Existe conversão snake_case → camelCase no interceptor?
   ✅ Os tipos no Frontend batem com os schemas Pydantic?

9. SE ALGUM CHECK FALHAR:
   **NÃO PROSSEGUIR.** Corrigir imediatamente antes do próximo passo.
```

### 3.4 FASE: UPDATE (Atualização de Estado)

```
10. ATUALIZAR PASSAPORTE_DE_CRIACAO.md:
    - Marcar checkbox do passo concluído ✅
    - Atualizar "Estado Atual":
      * Fase Atual
      * Passo Atual
      * Último Arquivo Editado
      * Próximo Passo Obrigatório
    - Registrar timestamp da última modificação
```

---

## 🛡️ 4. Regras Supremas (Anti-Alucinação por Stack)

### Stack 001: Next.js Fullstack

```
REGRA SUPREMA 001:
Arquivos em src/app ou src/components NUNCA importam diretamente
de src/models, src/lib/db ou src/server.

A comunicação DEVE ser SEMPRE via:
- fetch para /api/*
- Server Actions (use server)
- Server Components (sem 'use client')

VIOLAÇÃO DESTA REGRA = ERRO CRÍTICO
```

### Stack 002: Next.js + Node.js

```
REGRA SUPREMA 002:
Qualquer alteração no Backend que mude um JSON de resposta
OBRIGA a atualização IMEDIATA da interface TypeScript correspondente em:
- frontend/src/types (para tipos do frontend)
- shared/types (para tipos compartilhados)

O apiClient é a ÚNICA fonte de verdade para comunicação HTTP.

VIOLAÇÃO DESTA REGRA = ERRO DE TIPAGEM EM PRODUÇÃO
```

### Stack 003: Next.js + Python

```
REGRA SUPREMA 003:
O Backend Python DEVE usar Pydantic com alias_generator=to_camel
OU o Frontend deve ter um interceptor que converte os dados.

Defina em schema.py que a saída JSON é SEMPRE camelCase
para alinhar com o padrão JavaScript.

VIOLAÇÃO DESTA REGRA = QUEBRA DE CONTRATO DE API
```

---

## 🚨 5. Protocolo de Erro e Exceções

### 5.1 Quando Pausar e Consultar

O agente **DEVE** pausar e perguntar ao usuário nas seguintes situações:

1. **Ausência de Referência:**

   - Não existe snippet ou exemplo para a tarefa no `05-referencias/`
   - A documentação do Dossiê está ambígua ou incompleta

2. **Conflito de Regras:**

   - Duas regras parecem se contradizer
   - O playbook sugere algo diferente do Dossiê

3. **Dependência Externa:**

   - Necessidade de biblioteca/pacote não listado no Dossiê
   - Integração com serviço externo não documentado

4. **Desvio de Escopo:**
   - Usuário pede algo que não está no passaporte
   - Mudança arquitetural significativa

### 5.2 Quando Abortar

O agente **DEVE** abortar a operação (sem executar nada) se:

❌ O Stack ID no contexto não bate com o passaporte carregado  
❌ Faltam arquivos obrigatórios do Dossiê  
❌ O passaporte indica que há erros não corrigidos em passos anteriores  
❌ Há evidência de contaminação de contexto (referências a outra stack)

---

## 📊 6. Validação de Stack (Stack Context Validator)

Antes de qualquer geração de código, o agente deve executar:

```yaml
Validador de Contexto:
  current_stack_id: { { STACK_ID_CARREGADO } }
  passaporte_stack_id: { { STACK_ID_NO_PASSAPORTE } }
  arquivos_carregados:
    - Lista de todos os arquivos .md no contexto

  Verificações: ✓ current_stack_id == passaporte_stack_id?
    ✓ Todos os arquivos pertencem à mesma stack?
    ✓ Não há referências cruzadas a outras stacks?
    ✓ Dossiê de Regras está carregado?
    ✓ Passaporte existe e está atualizado?

  Se QUALQUER verificação falhar: ABORTAR e reportar erro específico
```

---

## 🔧 7. Snippet Locking (Uso Obrigatório de Referências)

### 7.1 Prioridade de Código

Ao gerar código, o agente deve seguir esta ordem de prioridade:

1. **Snippet de Referência Existente** (85% do código)

   - Localizar em `05-referencias-etapa-criacao-estrutura/snippets/`
   - **HIDRATAR** o snippet com dados do projeto
   - Não reescrever do zero

2. **Padrão Documentado no Dossiê** (10% do código)

   - Seguir exemplos inline no DOSSIE\_\*\_BACKEND ou FRONTEND
   - Manter estilo e estrutura consistente

3. **Invenção Criativa** (5% do código)
   - **APENAS** se não houver snippet ou exemplo
   - **SEMPRE** validar contra as Regras Supremas
   - **SEMPRE** documentar o novo padrão

### 7.2 Processo de Hidratação de Snippet

```python
# Exemplo: Usar snippet de Auth Service

# ERRADO (reescrever do zero):
def login(username, password):
    # ... inventa implementação ...

# CORRETO (hidratar snippet):
# 1. Ler 05-referencias/.../auth_service.example.py
# 2. Substituir variáveis:
#    {{PROJECT_NAME}} → "MeuProjeto"
#    {{DB_MODEL}} → "User"
#    {{JWT_SECRET_VAR}} → "settings.JWT_SECRET"
# 3. Ajustar imports conforme o mapa da stack
# 4. Manter 90% da lógica original do snippet
```

---

## 📁 8. Separação Física de Contexto (Opcional mas Recomendado)

### 8.1 Criação de Pasta .rules no Projeto

Ao iniciar um novo projeto, o agente pode opcionalmente copiar os arquivos de regra para dentro do projeto:

```
novo-projeto/
├── .rules/                           ← Nova pasta
│   ├── DOSSIE_REGRAS_DE_CRIACAO.md  ← Cópia da stack escolhida
│   ├── DOSSIE_FRONTEND.md
│   ├── DOSSIE_BACKEND.md
│   └── MAPA_STACK.md
├── src/
└── ...
```

**Benefício:** O contexto fica "próximo" do código, reduzindo erros de caminho relativo.

### 8.2 Vantagens

- ✅ Reduz latência de busca de regras
- ✅ Permite versionamento das regras junto com o código
- ✅ Facilita auditorias offline
- ✅ Evita ambiguidade sobre qual versão do Dossiê está sendo usada

---

## 🎯 9. Finalização e Handoff

### 9.1 Checklist de Conclusão de Passo

Após concluir qualquer passo, o agente deve:

```
[ ] Código gerado e validado
[ ] Auditoria imediata executada (checklist da stack)
[ ] Passaporte atualizado com novo estado
[ ] Testes básicos executados (se aplicável)
[ ] Documentação inline adicionada
[ ] Próximo passo claramente definido no passaporte
```

### 9.2 Handoff para Próximo Agente

Se o passo concluído exigir mudança de agente:

```
AGENTE CRIADOR finaliza → PASSAPORTE marca "Pronto para Validação"
                        → Chama AGENTE_VALIDADOR_PASSAPORTE_DA_CRIACAO
                        → Validador confirma ou rejeita
                        → Se aprovado, avança para próxima fase
```

---

## 📝 10. Exemplo de Execução Completa

### Cenário: Criar Auth na Stack 003 (Python Backend)

#### Passo 1: Boot

```
AGENTE: "Qual Stack ID você deseja utilizar?"
USUÁRIO: "003"
AGENTE: "Entendido. Carregando Stack 003 (Next.js + Python + MongoDB)..."
```

#### Passo 2: Context Loading

```
[Carregando...]
✅ CATALOGO_STACKS.md
✅ 003_MAPA_STACK_NEXT_FRONT_PYTHON_BACK_MONGO.md
✅ 003_DOSSIE_REGRAS_DE_CRIACAO.md
✅ 003_DOSSIE_PYTHON_BACKEND.md
✅ 003_PLAYBOOK_CRIADOR.md
✅ PASSAPORTE_DE_CRIACAO.md (criado via template)
```

#### Passo 3: Check-Wait-Act

**CHECK:**

```
Fase Atual: D2 (Usuário e Autenticação)
Passo Atual: 2.1 - Criar Schema Pydantic de User
Último Arquivo: Nenhum (início)
Próximo Passo: Criar models/user.py
```

**WAIT:**

```
Planejamento:
1. Criar backend/app/models/user.py (schema Pydantic)
2. Configurar alias_generator=to_camel (REGRA SUPREMA 003)

Busca em 05-referencias/snippets/:
✅ Encontrado: backend-python/user_model.example.py
```

**ACT:**

```python
# Hidratando snippet...
# (gera código baseado no snippet, aplicando to_camel)

# Auditoria Imediata (Stack 003):
✅ Pydantic usa camelCase na saída? SIM
✅ Schema documentado com Field()? SIM
✅ Senha usa hash bcrypt? SIM
```

**UPDATE:**

```markdown
## Estado Atual

- Fase: D2
- Passo: 2.2 - Criar Auth Service
- Último Arquivo: backend/app/models/user.py
- Próximo: backend/app/services/auth_service.py
```

---

## 🔗 11. Integração com Outros Documentos

Este orquestrador é o **ponto de entrada** do sistema. Ele referencia e coordena:

- `CATALOGO_STACKS.md` → Definição de stacks disponíveis
- `FLUXO_ORQUESTRADOR_CENTRAL.md` → Pipeline de fases (D1→D2→D3...)
- `MAPA_INSTITUCIONAL_CENTRAL.md` → Hierarquia de documentos
- Playbooks individuais → Instruções específicas por papel
- Dossiês → Regras técnicas imutáveis
- Passaportes → Estado vivo do projeto

**Regra de Precedência:**

```
ORQUESTRADOR_MESTRE > Regras Supremas > Dossiê > Playbook > Passaporte
```

---

## 🚀 12. Conclusão

Este documento estabelece o **protocolo obrigatório** para operação de agentes de IA no sistema institucional.

**Violações deste protocolo resultarão em:**

- ❌ Geração de código inconsistente
- ❌ Contaminação de contexto entre stacks
- ❌ Alucinações técnicas
- ❌ Perda de rastreabilidade
- ❌ Falhas em auditoria

**Seguir este protocolo garante:**

- ✅ Zero alucinação técnica
- ✅ Contexto cirúrgico e preciso
- ✅ Rastreabilidade completa
- ✅ Auditoria automática
- ✅ Escalabilidade do sistema

---

**Versão:** 1.0.0  
**Data:** 07/01/2026  
**Status:** ATIVO - Protocolo Obrigatório
