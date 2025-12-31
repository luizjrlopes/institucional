# Histórico Institucional por Pipeline

Esta pasta registra a rastreabilidade completa de cada pipeline institucional executado no projeto.

## Estrutura obrigatória

- Cada pipeline executado gera um documento próprio, numerado sequencialmente.
- O nome do arquivo segue o padrão:
  PIPELINE-000X-{nome-do-pipeline}.md
- O changelog geral do projeto permanece em changelog.md

## Regra institucional

- Todo pipeline executado DEVE gerar um documento nesta pasta.
- O documento é obrigatório e segue o template abaixo.
- Agentes não decidem se escrevem ou não: o registro é parte do sistema.

## Template obrigatório

```
# PIPELINE-000X — {NOME_DO_PIPELINE}

Data: YYYY-MM-DD
Status: CONCLUÍDO | PARCIAL | BLOQUEADO
Etapa Institucional: ETAPA 1 | ETAPA 3 | etc.

## 1. Contexto
Por que este pipeline foi executado.

## 2. Agente Criador / Evolutor
- O que foi criado
- O que foi alterado
- O que foi propositalmente deixado de fora

## 3. Agente F-Designer
- Ajustes visuais realizados
- Problemas encontrados
- Decisões de layout/estrutura

## 4. Agente Auditor
- Conformidades verificadas
- Desvios encontrados (se houver)

## 5. Agente Refatorador (se acionado)
- Correções aplicadas
- Arquivos impactados

## 6. Resultado Final
- Estado final do sistema
- Próxima ação esperada
```
