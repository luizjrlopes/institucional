# 🚀 Guia de Uso do Sistema Institucional

## 📖 Visão Geral

Este sistema governança a criação completa de aplicações web através de **3 ETAPAS SEQUENCIAIS**:

1. **CRIAÇÃO** - Estrutura base (login, register, autenticação, home vazia)
2. **CONSTRUÇÃO (MOCK)** - Páginas do produto com dados simulados
3. **INTEGRAÇÃO** - Substituição de MOCs por banco de dados real

---

## 🎯 Passo a Passo Completo de Uso

### ✅ PRÉ-REQUISITO: Criar o BRIEF_PRODUTO

**1. Crie o arquivo obrigatório:**

```text
./area_produto/01-identidades/BRIEF_PRODUTO.md
```

**2. Estrutura mínima:**

```markdown
# BRIEF DO PRODUTO

## Identificação da Stack

stack_id: 001_next_fullstack_mongo

## Informações do Produto

nome: [Nome do Seu Produto]
descrição: [Descrição do produto]
objetivo: [Objetivo principal]

## Funcionalidades Principais

- Funcionalidade 1
- Funcionalidade 2
```

**3. Valores válidos para `stack_id`:**

- `001_next_fullstack_mongo` - Next.js Fullstack + MongoDB
- `002_next_front_node_back_mongo` - Next.js + Node.js + MongoDB
- `003_next_front_python_back_mongo` - Next.js + Python + MongoDB

---

## 📘 ETAPA 1: CRIAÇÃO DA ESTRUTURA BASE

### Objetivo

Criar aplicação funcional mínima com autenticação e páginas institucionais.

### Fluxo

#### 1.1 - Geração do Passaporte de Criação

**Ação:** Acionar o agente gerador de passaporte da stack

```text
AGENTE_GERADOR_PASSAPORTE_DA_CRIACAO
```

**O agente irá:**

- Ler o `BRIEF_PRODUTO.md`
- Analisar referências visuais em `{{STACK_ROOT_DIR}}/{{STACK_PREFIX}}_05-referencias-etapa-criacao-estrutura/`
- Gerar `{{STACK_ROOT_DIR}}/{{STACK_PREFIX}}_03-passaporte_de_criacao/{{STACK_PREFIX}}_PASSAPORTE_DE_CRIACAO.md`

#### 1.2 - Validação do Passaporte de Criação

**Automático:** O agente validador será chamado automaticamente

**Resultado:**

- ✅ APROVADO - pode prosseguir
- ⚠️ APROVADO COM RESSALVAS - pode prosseguir com atenção
- ❌ REPROVADO - precisa corrigir e regenerar

#### 1.3 - Confirmação para Criar Estrutura

**Sistema pergunta:** "Passaporte validado. Posso iniciar a criação da estrutura?"

**Você responde:** "Sim" (ou qualquer confirmação)

#### 1.4 - Criação Automática

**O AGENTE_CRIADOR irá:**

1. Criar toda a estrutura do projeto
2. Implementar páginas institucionais:
   - `/login` - Tela de login
   - `/register` - Tela de cadastro
   - `/forgot-password` - Recuperação de senha
   - `/reset-password` - Redefinição de senha
   - `/email-verification` - Verificação de email
   - `/home` - Home vazia (protegida)
3. Configurar autenticação JWT
4. Usar HTMLs de referência literalmente

#### 1.5 - Pipeline de Qualidade

**Automático:** PLAYBOOK_PIPELINE executa ciclo:

- AGENTE_AUDITOR → verifica conformidade
- AGENTE_F_DESIGNER → corrige visual (se necessário)
- AGENTE_REFATORADOR → refatora código (se necessário)

**Repetido até:**

- ✅ Build sem erros
- ✅ Visual conforme referências
- ✅ Auditoria aprovada

#### 1.6 - Conclusão da ETAPA 1

**Sistema informa:**

> "✅ Criação da estrutura finalizada! Build funcional, sem erros e esteticamente conforme referências.  
> Deseja iniciar a etapa de construção do produto?"

**Você responde:** "Sim" para avançar para ETAPA 2

---

## 📗 ETAPA 2: CONSTRUÇÃO DO PRODUTO (MOCK)

### Objetivo da Etapa 2

Implementar todas as páginas do produto usando dados simulados (MOCs).

### Preparação

**Antes de iniciar, você precisa preparar as referências do produto:**

1. Acesse: `area_produto/referencias-etapa-mock/`

2. Popule os diretórios:

**`/html/`** - Protótipos HTML das páginas do produto

```text
page-home.html
page-dashboard.html
page-perfil.html
page-configuracoes.html
```

**`/imagens/`** - Wireframes e designs visuais

```text
wireframe-home.png
mockup-dashboard.png
```

**`/md/`** - Documentação funcional de cada página

````markdown
# Página: Home

## Funcionalidades

- Exibir dashboard com resumo
- Mostrar últimas atividades

## Regras de Negócio

- Apenas usuários autenticados
- Dados carregados de forma assíncrona

## Componentes Necessários

- DashboardCard
- ActivityFeed

## Fluxo

#### 2.1 - Geração do Passaporte do Produto

**Ação:** Sistema aciona automaticamente

```text
AGENTE_GERADOR_PASSAPORTE_DO_PRODUTO
```
````

**O agente irá:**

- Ler `BRIEF_PRODUTO.md`
- Analisar todas as referências em `referencias-etapa-mock/`
- Gerar `area_produto/passaporte_do_produto/{{STACK_ROOT_DIR}}/PASSAPORTE_DO_PRODUTO.md`

#### 2.2 - Validação do Passaporte do Produto

**Automático:** AGENTE_VALIDADOR_PASSAPORTE_DO_PRODUTO valida

**Sistema informa:**

> "✅ Passaporte do produto validado!  
> Deseja seguir para a elaboração das páginas do produto?"

**Você responde:** "Sim"

#### 2.3 - Implementação da Home

**Automático:** AGENTE_EVOLUTOR implementa primeira página (home)

**Com:**

- MOCs em `data/` (dados simulados)
- Backend: routes, controllers, services, repositories
- Frontend: pages, components, services
- Estados: loading, error, success

**Restrições:**

- ❌ PROIBIDO MongoDB/Mongoose
- ✅ OBRIGATÓRIO MOCs
- ✅ OBRIGATÓRIO DataRepository

#### 2.4 - Pipeline para Home

**Automático:** PLAYBOOK_PIPELINE valida home

**Resultado:**

> "✅ Página home implementada com sucesso!  
> Qual página deseja implementar a seguir?"

#### 2.5 - Implementação das Demais Páginas (Iterativo)

**Você informa:** Nome da próxima página (ex: "dashboard")

**Sistema repete:**

1. AGENTE_EVOLUTOR implementa página
2. PLAYBOOK_PIPELINE valida
3. Pergunta próxima página

> **Continue até implementar todas as páginas**

#### 2.6 - Conclusão da ETAPA 2

**Quando todas as páginas estiverem prontas, você informa:**
"Todas as páginas estão funcionando corretamente com MOCs"

**Sistema pergunta:**

> "✅ Todas as páginas do produto foram implementadas com MOCs!  
> Deseja iniciar a etapa de integração com banco de dados?"

**Você responde:** "Sim" para avançar para ETAPA 3

---

## 📕 ETAPA 3: INTEGRAÇÃO COM BANCO DE DADOS

### Objetivo da Etapa 3

Substituir MOCs por banco de dados real (MongoDB).

### Fluxo de Integração

#### 3.1 - Confirmação

**Você confirma:** "Sim, quero integrar com banco"

#### 3.2 - Integração Automática

**AGENTE_EVOLUTOR (com permissão de banco) irá:**

1. Configurar MongoDB/Mongoose
2. Criar schemas Mongoose para cada entidade
3. Criar MongoRepository (implementação real)
4. Substituir DataRepository por MongoRepository
5. Migrar dados dos MOCs para banco (se aplicável)
6. Remover MOCs de `data/`
7. Testar todas as páginas

#### 3.3 - Pipeline Final

**Automático:** PLAYBOOK_PIPELINE valida integração

- AGENTE_AUDITOR audita banco
- AGENTE_REFATORADOR otimiza (se necessário)
- Testes end-to-end

#### 3.4 - Conclusão FINAL

**Sistema informa:**

> "✅ Integração com banco de dados concluída com sucesso!  
> Sistema pronto para deploy."

---

## 📊 Resumo das Entregas por Etapa

### ETAPA 1: CRIAÇÃO

**Duração:** ~30-60 minutos (automático após passaporte validado)

**Entregáveis:**

- ✅ Estrutura completa do projeto
- ✅ Autenticação JWT funcional
- ✅ 5 páginas institucionais (/login, /register, etc.)
- ✅ Home vazia protegida
- ✅ Build sem erros
- ✅ Styled Components configurado

### ETAPA 2: CONSTRUÇÃO

**Duração:** ~2-6 horas (depende do número de páginas)

**Entregáveis:**

- ✅ Passaporte do produto documentado
- ✅ Todas as páginas do produto implementadas
- ✅ MOCs funcionando em `data/`
- ✅ Backend completo (sem banco real)
- ✅ Frontend completo
- ✅ Visual 100% conforme referências
- ✅ Build sem erros

### ETAPA 3: INTEGRAÇÃO

**Duração:** ~1-2 horas (automático)

**Entregáveis:**

- ✅ MongoDB configurado
- ✅ Schemas Mongoose criados
- ✅ MongoRepository implementado
- ✅ MOCs substituídos por banco real
- ✅ Todas as funcionalidades testadas
- ✅ Sistema pronto para deploy

---

## 📁 Estrutura de Arquivos Importante

```text
./
├── area_produto/                           # ÁREA DO PRODUTO
│   ├── 01-identidades/
│   │   ├── BRIEF_PRODUTO.md               # ⭐ VOCÊ CRIA AQUI
│   │   └── README.md
│   ├── referencias-etapa-mock/             # ⭐ VOCÊ POPULA AQUI
│   │   ├── html/                           # Protótipos HTML
│   │   ├── imagens/                        # Wireframes/designs
│   │   ├── md/                             # Docs funcionais
│   │   └── README.md
│   └── passaporte_do_produto/
│       └── {{STACK_ROOT_DIR}}/                     # Gerado automaticamente
│           ├── PASSAPORTE_DO_PRODUTO.md
│           └── RELATORIO_VALIDACAO_*.md
│
├── 001_stack_next_fullstack_mongo/         # STACK 001
│   ├── 001_00-mapas_e_fluxos/
│   ├── 001_01-identidades_estrutura/
│   ├── 001_02-playbooks/
│   ├── 001_03-passaporte_de_criacao/       # Gerado automaticamente
│   ├── 001_04-agentes/                     # Agentes da stack
│   └── 001_05-referencias-etapa-criacao-estrutura/
│       ├── referencias-visuais/            # HTMLs institucionais
│       └── snippets/                       # Código reutilizável
│
├── 002_stack_next_front_node_back_mongo/   # STACK 002 - ✅ COMPLETA
│   ├── README.md
│   ├── 002_00-mapas_e_fluxos/
│   │   └── 002_MAPA_STACK_NEXT_FRONT_NODE_BACK_MONGO.md
│   ├── 002_01-identidades_estrutura/
│   │   ├── 002_DOSSIE_REGRAS_DE_CRIACAO.md
│   │   ├── 002_DOSSIE_NEXT_FRONTEND.md
│   │   └── 002_DOSSIE_NODE_BACKEND.md
│   ├── 002_02-playbooks/                   # ✅ 6 playbooks completos
│   │   ├── 002_PLAYBOOK_AUDITOR.md        # 5,9 KB - Completo
│   │   ├── 002_PLAYBOOK_CRIADOR.md        # 6,7 KB - Completo
│   │   ├── 002_PLAYBOOK_EVOLUTOR.md       # 8,7 KB - Completo
│   │   ├── 002_PLAYBOOK_F_DESIGNER.md     # 4,9 KB - Completo
│   │   ├── 002_PLAYBOOK_PIPELINE.md       # 4,9 KB - Completo
│   │   ├── 002_PLAYBOOK_REFATORADOR.md    # 6,5 KB - Completo
│   │   └── Readme.md
│   ├── 002_03-passaporte_de_criacao/
│   │   └── (templates - criados dinamicamente)
│   ├── 002_04-agentes/                     # ✅ 9 agentes completos
│   │   ├── 002_AGENTE_AUDITOR.md
│   │   ├── 002_AGENTE_CRIADOR.md
│   │   ├── 002_AGENTE_EVOLUTOR.md
│   │   ├── 002_AGENTE_F_DESIGNER.md
│   │   ├── 002_AGENTE_GERADOR_PASSAPORTE_DA_CRIACAO.md
│   │   ├── 002_AGENTE_GERADOR_PASSAPORTE_DO_PRODUTO.md
│   │   ├── 002_AGENTE_REFATORADOR.md
│   │   ├── 002_AGENTE_VALIDADOR_PASSAPORTE_DA_CRIACAO.md
│   │   └── 002_AGENTE_VALIDADOR_PASSAPORTE_DO_PRODUTO.md
│   └── 002_05-referencias-etapa-criacao-estrutura/
│       ├── referencias-visuais/
│       │   └── html/                       # HTMLs institucionais
│       └── snippets/                       # ✅ 9 snippets Node.js/Express
│           ├── backend/                    # 5 arquivos TypeScript
│           │   ├── user.model.ts           # Model Mongoose
│           │   ├── user.repository.ts      # Repository pattern
│           │   ├── auth.service.ts         # Service + JWT
│           │   ├── auth.controller.ts      # Controller Express
│           │   └── auth.route.ts           # Routes Express
│           └── frontend/                   # 4 arquivos Next.js
│               ├── apiClient.ts            # Axios config
│               ├── AuthContext.tsx         # Context API
│               ├── Button.tsx              # Shared component
│               └── Input.tsx               # Form component
│
├── 003_stack_next_front_python_back_mongo/ # STACK 003 - 🚀 EM EXPANSÃO
│   ├── README.md
│   ├── 003_00-mapas_e_fluxos/
│   │   └── 003_MAPA_STACK_NEXT_FRONT_PYTHON_BACK_MONGO.md
│   ├── 003_01-identidades_estrutura/
│   │   ├── 003_DOSSIE_REGRAS_DE_CRIACAO.md
│   │   ├── 003_DOSSIE_NEXT_FRONTEND.md
│   │   └── 003_DOSSIE_PYTHON_BACKEND.md
│   ├── 003_02-playbooks/                   # ⚡ 3/6 expandidos
│   │   ├── 003_PLAYBOOK_AUDITOR.md        # ✅ 20,1 KB - EXPANDIDO (3,3x Stack 002)
│   │   ├── 003_PLAYBOOK_CRIADOR.md        # ✅ 19,6 KB - EXPANDIDO (4x Stack 002)
│   │   ├── 003_PLAYBOOK_EVOLUTOR.md       # ✅ 22,2 KB - EXPANDIDO (2,5x Stack 002)
│   │   ├── 003_PLAYBOOK_F_DESIGNER.md     # ⏳ 1,8 KB - Pendente expansão
│   │   ├── 003_PLAYBOOK_PIPELINE.md       # ⏳ 2,1 KB - Pendente expansão
│   │   ├── 003_PLAYBOOK_REFATORADOR.md    # ⏳ 1,6 KB - Pendente expansão
│   │   └── Readme.md
│   ├── 003_03-passaporte_de_criacao/
│   │   └── (templates - criados dinamicamente)
│   ├── 003_04-agentes/                     # ⚡ 1/9 expandidos
│   │   ├── 003_AGENTE_AUDITOR.md          # ⏳ Pendente expansão
│   │   ├── 003_AGENTE_CRIADOR.md          # ✅ 21,5 KB - EXPANDIDO (2,5x Stack 002)
│   │   ├── 003_AGENTE_EVOLUTOR.md         # ⏳ Pendente expansão
│   │   ├── 003_AGENTE_F_DESIGNER.md       # ⏳ Pendente expansão
│   │   ├── 003_AGENTE_GERADOR_PASSAPORTE_DA_CRIACAO.md
│   │   ├── 003_AGENTE_GERADOR_PASSAPORTE_DO_PRODUTO.md
│   │   ├── 003_AGENTE_REFATORADOR.md      # ⏳ Pendente expansão
│   │   ├── 003_AGENTE_VALIDADOR_PASSAPORTE_DA_CRIACAO.md
│   │   └── 003_AGENTE_VALIDADOR_PASSAPORTE_DO_PRODUTO.md
│   └── 003_05-referencias-etapa-criacao-estrutura/
│       ├── referencias-visuais/
│       │   └── html/                       # HTMLs institucionais
│       └── snippets/                       # ✅ 9 snippets Python/FastAPI
│           ├── backend/                    # 5 arquivos Python async
│           │   ├── config_settings.py      # Pydantic Settings
│           │   ├── mongodb_connection.py   # Motor async setup
│           │   ├── security_jwt.py         # JWT + bcrypt (passlib)
│           │   ├── user_repository.py      # Repository async
│           │   └── user_service.py         # Service async
│           └── frontend/                   # 4 arquivos Next.js (compartilhados)
│               ├── apiClient.ts            # Axios config
│               ├── AuthContext.tsx         # Context API
│               ├── Button.tsx              # Shared component
│               └── Input.tsx               # Form component

└── mapas_e_fluxos_centrais/
    ├── FLUXO_ORQUESTRADOR_CENTRAL.md       # ⭐ FLUXO COMPLETO
    └── MAPA_INSTITUCIONAL_CENTRAL.md
```

---

## 📊 Status de Desenvolvimento das Stacks

### Stack 001 - Next.js Fullstack + MongoDB

✅ **STATUS: COMPLETA E OPERACIONAL**

- Estrutura 100% documentada
- Pronta para uso em produção

### Stack 002 - Next.js + Node.js/Express + MongoDB

✅ **STATUS: COMPLETA E OPERACIONAL**

- 6 Playbooks completos (37,6 KB total)
- 9 Agentes completos
- 9 Snippets (backend Node.js + frontend Next.js)
- Pronta para uso em produção

### Stack 003 - Next.js + Python/FastAPI + MongoDB

🚀 **STATUS: EM EXPANSÃO - JÁ UTILIZÁVEL**

**Arquivos Expandidos (Prontos):**

- ✅ 003_AGENTE_CRIADOR.md: 21,5 KB (2,5x maior que Stack 002)
- ✅ 003_PLAYBOOK_CRIADOR.md: 19,6 KB (4x maior que Stack 002)
- ✅ 003_PLAYBOOK_EVOLUTOR.md: 22,2 KB (2,5x maior que Stack 002)
- ✅ 003_PLAYBOOK_AUDITOR.md: 20,1 KB (3,3x maior que Stack 002)
- ✅ 9 Snippets Python/FastAPI completos (async/await, Motor, Pydantic)

**Total Expandido:** 83,4 KB (arquivos principais)

**Pendente de Expansão:**

- ⏳ 3 Playbooks: F_DESIGNER, PIPELINE, REFATORADOR
- ⏳ 8 Agentes: EVOLUTOR, AUDITOR, REFATORADOR, F_DESIGNER, + 4 geradores/validadores

**Diferencial da Stack 003:**

- Detalhamento completo de async/await (Python)
- Exemplos de Motor (MongoDB async)
- Validação Pydantic detalhada
- Fluxos FastAPI com dependencies
- Segurança JWT + bcrypt (passlib)
- Arquitetura separada enfatizada

**Conclusão:** Stack 003 já possui os arquivos principais mais completos e detalhados que a Stack 002, com especificidades de Python/FastAPI. Os arquivos expandidos são suficientes para uso em produção. Os arquivos pendentes são secundários e não bloqueiam o uso.

---

## ⚠️ Regras Importantes

### ❌ Não Fazer

1. **Não pule etapas** - Sistema bloqueia se tentar
2. **Não edite passaportes manualmente** - Sempre regenere
3. **Não use MongoDB antes da ETAPA 3** - Sistema bloqueia
4. **Não crie MOCs em `mock/data`** - Só em `data/`
5. **Não use Tailwind ou CSS inline** - Só Styled Components

### ✅ Fazer

1. **Prepare BRIEF_PRODUTO detalhado** - Quanto mais informação, melhor
2. **Prepare boas referências visuais** - HTMLs bem estruturados
3. **Documente regras de negócio** - No `/md/` das referências
4. **Confirme cada etapa** - Sistema aguarda sua aprovação
5. **Informe problemas ao auditor** - Pipeline corrigirá automaticamente

---

## 🆘 Troubleshooting

### "Sistema bloqueado - BRIEF_PRODUTO não encontrado"

**Solução:** Crie `area_produto/01-identidades/BRIEF_PRODUTO.md` com `stack_id` válido

### "Passaporte reprovado"

**Solução:** Verifique o relatório de validação e ajuste as referências antes de regenerar

### "Build com erros após criação"

**Solução:** Pipeline corrigirá automaticamente. Se persistir, auditor sinalizará problema específico

### "Página implementada diferente das referências"

**Solução:** AGENTE_F_DESIGNER corrigirá no próximo ciclo do pipeline

### "Quero mudar funcionalidades durante ETAPA 2"

**Solução:** Atualize `referencias-etapa-mock/`, regenere PASSAPORTE_DO_PRODUTO, revalide

---

## 📚 Documentos de Referência

- [FLUXO_ORQUESTRADOR_CENTRAL](mapas_e_fluxos_centrais/FLUXO_ORQUESTRADOR_CENTRAL.md) - Fluxo completo detalhado
- [MAPA_INSTITUCIONAL_CENTRAL](README.md) - Governança e catálogo de stacks
- [README - area_produto/01-identidades](area_produto/01-identidades/README.md) - Detalhes do BRIEF_PRODUTO
- [README - referencias-etapa-mock](area_produto/referencias-etapa-mock/Readme.md) - Como preparar referências

---

## 🎯 Dica Final

**O sistema é altamente automatizado.** Seu trabalho principal é:

1. ✍️ Criar BRIEF_PRODUTO detalhado
2. 🎨 Preparar boas referências visuais e funcionais
3. ✅ Confirmar quando solicitado
4. 📝 Informar qual próxima página implementar (ETAPA 2)

**Todo o resto é automático!** 🚀

---

**Versão do Guia:** v2.0  
**Última Atualização:** Janeiro 2026
