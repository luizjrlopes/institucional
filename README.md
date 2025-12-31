# 🧭 Framework Institucional — Orquestração Humano × Agentes (Next.js)

**Versão:** v1.0  
**Status:** Estável  
**Escopo:** Produção de aplicações Next.js com agentes especializados, fluxo validado e zero improvisação.

---

## 1. Propósito deste Framework

Este repositório define um framework institucional de produção de software baseado em:

- Orquestração explícita entre humano e agentes
- Fluxo determinístico, validável e auditável
- Separação rígida de responsabilidades
- Evolução incremental, sem atalhos

Ele existe para resolver um problema clássico:
como construir aplicações complexas sem caos, retrabalho ou decisões invisíveis.

Aqui, nada é criado sem plano, nenhuma página nasce sem contrato, e nenhum agente improvisa.

**Observação institucional:** o `README.md` **não possui autoridade normativa**. No entanto, **a leitura do `README.md` é obrigatória** para compreensão do sistema institucional antes do início de qualquer execução do fluxo.

---

## 2. Princípios Fundamentais (Leis do Sistema)

Estas regras não são sugestões:

- Nenhuma página de produto existe sem estar no Passaporte da Aplicação
- Nenhum agente pula etapas
- Toda etapa gera artefatos verificáveis
- UI nunca acessa dados diretamente
- Regras de negócio nunca vivem em rotas
- Auditoria não corrige; refatoração não inventa

Se algo "funcionou mesmo assim", o processo está errado.

---

## 3. Visão Geral do Fluxo Institucional (macro)

A execução institucional ocorre em etapas com bloqueio real:

1. Preparação (Humano)
2. Agente Criador (Estrutura Técnica Inicial)
3. Referências do Produto (Humano)
4. Agente Gerador de Passaporte
5. Agente Validador de Passaporte
6. Agente Evolutor (Página por Página, cria MOCs junto com a página)
7. Agente Auditor (Contínuo — obrigatório no pipeline)
8. Agente Refatorador (Se necessário)
9. Transição MOC → Produção (Banco Real) _(gatilho humano explícito)_

**Notas obrigatórias:**

- As referências do produto são preparadas e entregues **após** o scaffold inicial, nunca antes.
- O MOC nasce junto com a implementação de cada página pelo Evolutor.
- Cada seta representa bloqueio real: se a etapa anterior não terminou, a próxima não acontece.

---

## 🔷 Visão Geral das Fases do Sistema

O desenvolvimento é organizado em **quatro grandes fases institucionais**, governadas por artefatos obrigatórios e pontos formais de bloqueio.

Essas fases não são opcionais, não se sobrepõem e não dependem de interpretação.

┌──────────────────────────────────────────────┐
│ FASE 1 — Estrutura Técnica Inicial │
│ (Scaffold / Infra Base) │
│ │
│ - Criação do projeto Next.js │
│ - Providers, Contextos, Auth estrutural │
│ - Estrutura de pastas (frontend + backend) │
│ - Páginas institucionais base (auth/sistema) │
│ copiadas literalmente dos HTMLs 05a │
│ - Nenhuma página de produto │
│ - Nenhum domínio funcional │
└──────────────────────────────────────────────┘
│
▼
┌──────────────────────────────────────────────┐
│ FASE 2 — Planejamento do Produto │
│ (Passaporte da Aplicação) │
│ │
│ - Definição normativa das páginas de produto │
│ - Rotas, ações, contratos e domínios │
│ - Validação institucional do Passaporte │
│ │
│ ⚠️ Esta fase pode ser reaberta sempre que │
│ uma nova página de produto for solicitada │
│ fora do Passaporte existente │
└──────────────────────────────────────────────┘
│
▼
┌──────────────────────────────────────────────┐
│ FASE 3 — Implementação do Produto │
│ (Fase MOC) │
│ │
│ - Criação de páginas conforme Passaporte │
│ - Criação/atualização de MOCs em /data │
│ - Backend via DataRepository │
│ - Frontend consome apenas services │
│ - Auditoria e refatoração contínuas │
│ │
│ 🔒 MOCs são a fonte oficial de verdade │
│ 🔒 Banco real NÃO é utilizado nesta fase │
└──────────────────────────────────────────────┘
│
▼
┌──────────────────────────────────────────────┐
│ FASE 4 — Transição para Produção │
│ (Banco de Dados Real) │
│ │
│ - Importação dos dados de /data │
│ - Troca DataRepository → MongoRepository │
│ - Nenhuma alteração em UI, services ou │
│ contratos │
│ │
│ 🚨 Depende de sinalização explícita do humano │
│ 🚨 Não existe fase híbrida │
└──────────────────────────────────────────────┘

📍 Observações Importantes

- Planejamento (Fase 2) e Implementação (Fase 3) são distintas:
  - Planejamento define o que será feito; implementação executa como será feito.
- Existe apenas uma Fase MOC:
  - toda a implementação do produto ocorre nesta fase.
- A fonte de verdade muda apenas uma vez:
  - MOC → Banco Real, de forma explícita e institucional.

🔒 Regra de Leitura

Se houver divergência entre este resumo visual e os documentos normativos
(**MAPA_INSTITUCIONAL** ou **FLUXO_ORQUESTRADOR**), prevalecem sempre os documentos normativos.

---

## 4. Estrutura Oficial de Pastas

````txt
institucional/
├── 00-mapa-geral/
│   ├── MAPA_INSTITUCIONAL_V2.md
│   └── FLUXO_ORQUESTRADOR_v2.md
├── 01-dossies/
│   ├── DOSSIE_REGRAS_DE_CRIACAO.md
│   ├── DOSSIE_NEXT_FRONTEND.md
│   └── DOSSIE_NEXT_BACKEND.md
├── 02-playbooks/
│   ├── PLAYBOOK_CRIADOR.md
│   ├── PLAYBOOK_EVOLUTOR.md
│   ├── PLAYBOOK_PIPELINE.md
│   ├── PLAYBOOK_F_DESIGNER.md
│   └── PLAYBOOK_AUDITOR.md
├── 03-passaporte/
│   ├── PASSAPORTE_DA_APLICACAO.md
│   └── RELATORIO_VALIDACAO_PASSAPORTE.md
├── 04-agentes/
│   ├── AGENTE_CRIADOR.md
│   ├── AGENTE_GERADOR_PASSAPORTE.md
│   ├── AGENTE_VALIDADOR_PASSAPORTE.md
│   ├── AGENTE_EVOLUTOR.md
│   ├── AGENTE_F_DESIGNER.md
│   ├── AGENTE_AUDITOR.md
│   └── AGENTE_REFATORADOR.md
├── 05-referencias/
│   ├── 05a-exemplos-etapa-criacao-estrutura/
│   └── 05b-exemplos-etapa-mock/
├── 06-historico/
│   ├── auditorias.md
│   ├── changelog.md
│   └── RASTREAMENTO_PROJETO.md
└── 07-prompts/
   ├── executaveis/
   │   ├── prompt-00-executor-pipeline.md
   │   ├── prompt-01-criacao-estrutura.md
   │   ├── prompt-02-geracao-passaporte.md
   │   └── prompt-04-evolucao-moc.md
   └── internos/
      ├── prompt-03-validacao-passaporte.md
      ├── prompt-05-auditoria.md
      ├── prompt-06-f-designer.md
      └── prompt-07-refatoracao.md
Observação: o arquivo `02-playbooks/PLAYBOOK_PIPELINE.md` descreve o pipeline obrigatório pós-entrega (Criador → F-Designer → Auditor → Refatorador → F-Designer → Auditor). A execução desse playbook é mandatória antes de considerar uma entrega final.

📌 Regra estrutural: o código do app não fica em institucional/.
O app deve ser criado em uma pasta na raiz do projeto com o nome do app (ex.: {APP_NAME}/).

5. Referências: A Divisão Mais Importante do Framework
5a — Exemplos do Método (institucional)
O que é: padrões reutilizáveis do framework.
Caráter: referencial, mas executável literalmente na Fase 1 para páginas institucionais base.

Contém:

Layouts base

Exemplos de componentes

Snippets de Context, Providers, Pages

Estruturas que podem ser replicadas

Regras:

Nunca descrevem um produto específico.

Na Fase 1, os HTMLs institucionais de auth/sistema devem ser copiados literalmente para o app.

5b — Referências do Produto (responsabilidade do humano)
O que é: tradução visual e conceitual do produto (páginas de produto).

```txt
05-referencias/05b-exemplos-etapa-mock/
├── html/
├── imagens/
└── notas.md
````

Regra de ouro: sem isso, não existe Passaporte; sem Passaporte, não existe evolução do produto.

1. Etapas do Fluxo (Resumo Operacional)
   ETAPA 0 — Preparação (Humano)
   Estudar o framework

Preparar referências do produto (5b)

Garantir clareza de objetivo

Saída obrigatória: HTML + imagem + notas.md

ETAPA 1 — Agente Criador (Estrutura Técnica Inicial)
Cria a base funcional:

Next.js App Router

Auth estrutural + Providers/Context

Estrutura de pastas (frontend + backend)

src/features/ (vazia)

Projeto compilando

Obrigatório nesta etapa:

Páginas institucionais base (auth/sistema) copiadas dos HTMLs 5a

Regra de página: page.tsx + Main.tsx para cada rota criada nesta etapa

Validação: npm run dev sem erros

ETAPA 2 — Agente Gerador de Passaporte
Transforma referências 5b em plano normativo:

Inventário completo de páginas de produto

Rotas, ações, dados, estados

Contratos técnicos

Domínios explícitos

Saída: PASSAPORTE_DA_APLICACAO.md

ETAPA 3 — Agente Validador de Passaporte
Verifica conformidade com dossiês:

Frontend

Backend

Regras de criação

Saída: RELATORIO_VALIDACAO_PASSAPORTE.md (APROVADO ou CORREÇÕES)

ETAPA 4 — Agente Evolutor (Incremental)
Cria uma página por vez, somente se:

estiver no Passaporte

estiver validada

Entrega completa por página:

Rota

Feature

Backend (se necessário)

Estados tratados

MOC criado/atualizado em /data (Fase 3)

ETAPA 5 — Agente Auditor (Contínuo — obrigatório no pipeline)
Revisa conformidade, não corrige.
Saída: relatório de desvios ou conformidade.

ETAPA 6 — Agente Refatorador (Se acionado)
Corrige apenas o que foi apontado

Sem melhorias oportunistas

Sem mudanças de comportamento

ETAPA 7 — Transição MOC → Produção (gatilho humano)
Importa /data para banco real

Troca DataRepository → MongoRepository

Sem alterar UI/services/contratos

Sem fase híbrida

1. Guardrails (Bloqueios Absolutos)
   Estas situações param o fluxo imediatamente:

Criar página de produto fora do Passaporte

Gerar Passaporte sem referências 5b

Evoluir sem validação do Passaporte

Fetch direto na UI

Regras de negócio em route.ts

Criar ou usar /data fora da Fase MOC

Criar “versão neutra” das páginas institucionais em vez de copiar os HTMLs 5a

Quebrar a regra page.tsx + Main.tsx

1. Como Começar um Projeto Novo (Resumo Executivo)
   Copie a pasta institucional/ para o projeto

Leia este README e o FLUXO_ORQUESTRADOR

Preencha 05-referencias/05b-exemplos-etapa-mock/

Execute o Prompt 01 (Agente Criador)

Gere e valide o Passaporte

Evolua página por página (Fase MOC)

Faça a transição para banco real quando o humano sinalizar

Sem atalhos. Sem pressa. Sem gambiarra.

1. Filosofia Final
   Este framework assume algo simples e impopular:

Software bom é consequência de processo bom.

Aqui, o processo não é burocracia — ele é o que permite velocidade sustentável sem perda de qualidade.

Se algo parece lento, revise a etapa anterior.
O erro quase nunca está onde "quebrou".
