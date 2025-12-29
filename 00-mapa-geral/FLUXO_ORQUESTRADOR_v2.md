# 🔁 FLUXO_ORQUESTRADOR.md

<!-- markdownlint-disable MD024 MD036 -->

Orquestração Institucional de Interações Humano ↔ Agentes

**Versão:** v2.0  
**Natureza:** Documento Operacional Normativo  
**Autoridade:** Subordinado ao MAPA_INSTITUCIONAL  
**Escopo:** Define, passo a passo, como o trabalho é executado, validado, bloqueado e retomado

## 1. FINALIDADE DO DOCUMENTO

Este documento define a execução obrigatória do fluxo institucional, estabelecendo:

- Ordem exata das etapas
- Responsabilidades de cada agente
- Artefatos obrigatórios por etapa
- Pontos de bloqueio
- Critérios de validação
- Regras explícitas de persistência por fase (MOC → Produção)

📌 **Regra absoluta:** Nenhuma execução fora deste fluxo possui validade institucional.

## 2. RELAÇÃO COM OUTROS DOCUMENTOS

Este documento:

- **NÃO define** regras constitucionais → isso é papel do MAPA_INSTITUCIONAL
- **NÃO define** arquitetura → isso é papel dos Dossiês
- **NÃO planeja** produto → isso é papel do Passaporte

Ele **EXECUTA** o que os outros **MANDAM**.

### Hierarquia (obrigatória)

1. MAPA_INSTITUCIONAL
2. Dossiês Institucionais
3. PLAYBOOKS
4. FLUXO_ORQUESTRADOR (este documento)
5. Passaporte da Aplicação

## 3. VISÃO GERAL DO FLUXO (MACRO)

```text
ETAPA 0 — Preparação (Humano)
        ↓
ETAPA 1 — Criador (Scaffold)
        ↓
ETAPA 2 — Gerador de Passaporte
        ↓
ETAPA 3 — Validador de Passaporte
        ↓
ETAPA 4 — Evolutor (Página por Página, com MOC)
        ↓
ETAPA 5 — Auditor (Opcional / Contínuo)
        ↓
ETAPA 6 — Refatorador (Se necessário)
        ↓
ETAPA 7 — Transição de Persistência (MOC → Produção)
```

📌 Cada seta representa bloqueio real.  
📌 Nenhuma etapa inicia sem a anterior concluída.

## 4. ETAPAS DETALHADAS

### ETAPA 0 — PREPARAÇÃO (HUMANO)

**Responsável:** Humano  
**Objetivo:** Entender o sistema institucional e preparar ambiente inicial

#### Entradas obrigatórias

Leitura completa de:

- README.md
- MAPA_INSTITUCIONAL.md
- FLUXO_ORQUESTRADOR.md

Estudo de:

- 05a-exemplos-etapa-criacao-estrutura/

#### Ações obrigatórias

Preparar ambiente para o scaffold inicial (não exige referências do produto ainda)

#### Saída obrigatória — ETAPA 0

Ambiente pronto para execução do scaffold

#### Validação

❌ Se ambiente não estiver pronto → BLOQUEAR fluxo

---

### ETAPA 1 — CRIAÇÃO DO SCAFFOLD (AGENTE CRIADOR)

**Agente:** AGENTE_CRIADOR  
**Playbook:** PLAYBOOK_CRIADOR  
**Objetivo:** Criar base funcional da aplicação

#### Responsabilidades do Agente

Criar projeto Next.js com:

- App Router
- Auth funcional
- Context + Provider
- Estrutura src/features/
- Backend organizado (src/server/)
- Home protegida (vazia)

#### Saída obrigatória

- Projeto compila
- npm run dev funciona sem erros

#### Validação

❌ Se não compilar → Criador revisa  
✅ Se compilar → Prosseguir

---

### ETAPA 1.5 — REFERÊNCIAS DO PRODUTO (HUMANO)

**Responsável:** Humano
**Objetivo:** Preparar referências do produto APÓS o scaffold

#### Ações obrigatórias

Criar e preencher:

```code
05b-exemplos-etapa-mock/
├── html/ (mínimo 1 HTML)
├── imagens/ (mínimo 1 imagem)
└── notas.md (obrigatório, não vazio)
```

#### Saída obrigatória

Referências completas do produto

#### Validação

❌ Se faltar qualquer item → BLOQUEAR fluxo

---

### ETAPA 2 — GERAÇÃO DO PASSAPORTE (AGENTE GERADOR)

**Agente:** AGENTE_GERADOR_PASSAPORTE  
**Objetivo:** Planejar o produto de forma normativa

#### Entradas obrigatórias

Pasta 05b-exemplos-etapa-mock/ completa

#### Responsabilidades do Agente

Gerar PASSAPORTE_DA_APLICACAO.md contendo:

- Inventário completo de páginas
- Para cada página:
  - nome
  - rota
  - objetivo
  - ações do usuário
  - dados
  - estados (loading, erro, vazio)
  - endpoints
  - contratos (tipos/DTOs)
- Domínios explícitos
- Proibições

#### Proibições

❌ Inventar páginas  
❌ Omitir estados  
❌ Criar ambiguidade

---

### ETAPA 3 — VALIDAÇÃO DO PASSAPORTE (AGENTE VALIDADOR)

**Agente:** AGENTE_VALIDADOR_PASSAPORTE  
**Objetivo:** Garantir conformidade institucional

#### Entradas

PASSAPORTE_DA_APLICACAO.md

#### Responsabilidades do Agente

Verificar conformidade com:

- DOSSIE_REGRAS_DE_CRIACAO
- DOSSIE_NEXT_FRONTEND
- DOSSIE_NEXT_BACKEND

#### Saída obrigatória

RELATORIO_VALIDACAO_PASSAPORTE.md com status:

- ✅ APROVADO
- ❌ CORREÇÕES NECESSÁRIAS

#### Regra de bloqueio

❌ Passaporte não aprovado → Evolução proibida

---

### ETAPA 4 — EVOLUÇÃO INCREMENTAL (AGENTE EVOLUTOR)

**Agente:** AGENTE_EVOLUTOR  
**Playbook:** PLAYBOOK_EVOLUTOR  
**Objetivo:** Implementar páginas, uma por vez

#### Pré-condições obrigatórias (todas)

- Página está no Passaporte
- Passaporte está validado

### Regra Institucional — MOC é Entrega Obrigatória do Evolutor

Durante a ETAPA 4 (Evolução Incremental), o AGENTE_EVOLUTOR
é o responsável por criar e manter os MOCs na pasta `data/`.

O humano NÃO fornece MOCs.
O humano fornece apenas referências do produto (HTML, imagens, notas).

#### Compartilhamento de MOCs entre páginas

**Regra Institucional:**

Um mesmo MOC pode (e deve) ser compartilhado por múltiplas páginas,
desde que represente uma única entidade ou domínio consistente.

**Exemplo válido:**

- `data/usuarios/usuarios.json` é consumido por:
  - `/perfil` (exibe dados do usuário)
  - `/configuracoes` (edita dados do usuário)
  - `/admin/usuarios` (lista todos os usuários)

**Proibição:**

❌ Criar `data/perfil/usuarios.json` e `data/admin/usuarios.json` separadamente

✅ Criar `data/usuarios/usuarios.json` e consumir de múltiplas páginas

#### Ordem obrigatória de execução por página

**⚠️ Regra de Conformidade com Passaporte:**

Os contratos definidos ou confirmados pelo Evolutor
DEVEM estar em conformidade com o PASSAPORTE_DA_APLICACAO.md.

Nenhum ajuste local de contrato é permitido sem atualização do Passaporte.

**O MOC é criado pelo agente Evolutor durante a implementação da página, sendo obrigatório que exista ao final da execução da página, e sempre antes de qualquer integração com banco externo. O Evolutor só pode criar ou alterar MOCs relacionados às páginas que está implementando.**

Para cada página/feature/domínio implementado, o Evolutor DEVE executar:

1. Definir ou confirmar contratos (DTOs, tipos, schemas lógicos) do domínio **conforme especificado no Passaporte**
2. Criar OU atualizar o MOC correspondente em `data/<dominio>/<entidade>.json`
3. O MOC inicial PODE ser mínimo, desde que:

   - represente fielmente os contratos definidos
   - permita o funcionamento real da página
   - não contenha campos fictícios que não existirão em produção

4. Implementar backend (services/repositories) consumindo o MOC via adapter
5. Implementar frontend consumindo apenas via services
6. Implementar estados obrigatórios (loading/erro/vazio)
7. Validar funcionamento ponta a ponta

#### Critério de validade da página

Uma página/feature só é considerada "implementada" se, ao final da execução:

- [ ] existir MOC correspondente em `data/` (criado ou atualizado pelo Evolutor)
- [ ] o sistema operar usando o adapter `DataRepository`
- [ ] não houver acesso direto de UI a `data/`
- [ ] contratos permanecerem consistentes com a futura fase de produção

#### Proibições absolutas

É proibido ao Evolutor:

- finalizar uma página sem MOC correspondente
- duplicar entidade em múltiplos MOCs não sincronizados
- criar lógica de UI condicionada a "modo MOC"
- usar Mongo Atlas como fonte primária durante fase MOC

---

### ETAPA 5 — AUDITORIA (AGENTE AUDITOR)

**Natureza:** Opcional / Contínua  
**Objetivo:** Verificar conformidade (não corrigir)

#### Responsabilidades

Verificar:

- Separação de camadas
- Uso correto de services
- Repository pattern
- Ausência de fetch direto em UI
- **Existência e coerência dos MOCs criados**
- **Alinhamento entre MOCs, contratos e serviços**
- **Conformidade dos MOCs com contratos do Passaporte**
- **Ausência de MOCs duplicados para mesma entidade**
- **Organização correta: `data/<dominio>/<entidade>.json`**

#### Saída

RELATORIO_AUDITORIA.md

---

### ETAPA 6 — REFATORAÇÃO (AGENTE REFATORADOR)

**Objetivo:** Corrigir desvios apontados pela Auditoria

#### Regras

- Refatorar apenas o que foi apontado
- ❌ Proibido alterar comportamento
- ❌ Proibido "melhorar por gosto"

---

### ETAPA 7 — TRANSIÇÃO DE PERSISTÊNCIA (MOC → PRODUÇÃO)

**Natureza:** Etapa institucional obrigatória  
**Gatilho:** Sinalização explícita do humano

#### Pré-condições obrigatórias

- Todas as páginas do Passaporte implementadas e validadas funcionalmente em modo MOC
- O usuário informa que não acrescentará novas páginas
- Aplicação funciona integralmente com MOCs
- Decisão registrada em RASTREAMENTO_PROJETO.md

#### Processo obrigatório

#### Passo 1 — Importação

- Migrar dados de `data/` para Mongo Atlas
- Preservar contratos e IDs

#### Passo 2 — Troca de Adapter

- Substituir DataRepository por MongoRepository
- ❌ Não alterar UI, services ou controllers

#### Regra final

❌ Não existe fase híbrida  
❌ Não existe migração parcial

---

## 5. PONTOS DE BLOQUEIO CRÍTICOS

| Situação                      | Ação                   |
| ----------------------------- | ---------------------- |
| Referências incompletas       | Humano corrige         |
| Scaffold não compila          | Criador revisa         |
| Passaporte não validado       | Validador bloqueia     |
| Página sem MOC                | Evolutor bloqueia      |
| Tentativa de usar Mongo antes | BLOQUEIO institucional |
| Migração sem sinalização      | BLOQUEIO institucional |

---

## 6. REGRA DE OURO FINAL

> Se algo não estiver explicitamente permitido aqui, a execução está proibida.
>
> Este fluxo não é sugestão.  
> É procedimento obrigatório.
