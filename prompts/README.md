# 07-prompts

Esta pasta contém os prompts institucionais que instanciam os agentes responsáveis por cada etapa do fluxo operacional, conforme o MAPA_INSTITUCIONAL.

## Estrutura dos Prompts (Método PACE)

Cada arquivo segue a estrutura PACE (definição institucional):

- **P — Purpose (Propósito):** O objetivo fundamental da etapa.
- **A — Audience (Papel do Agente):** Quem executa, seu papel e restrições.
- **C — Context (Contexto e Regras Institucionais):** Documentos de autoridade, leitura obrigatória e contexto normativo.
- **E — Execution (Execução e Critérios de Aceite):** O que executar, proibições, artefatos gerados e critérios de conclusão.

## Estrutura dos arquivos

```
07-prompts/
├── executaveis/
│   ├── prompt-00-executor-pipeline.md
│   ├── prompt-01-criacao-estrutura.md
│   ├── prompt-02-geracao-passaporte.md
│   └── prompt-04-evolucao-moc.md
├── internos/
│   ├── prompt-02-geracao-passaporte.md
│   ├── prompt-03-validacao-passaporte.md
│   ├── prompt-05-auditoria.md
│   ├── prompt-06-f-designer.md
│   └── prompt-07-refatoracao.md
```

Prompts em /executaveis podem ser chamados diretamente pelo humano.
Prompts em /internos são acionados automaticamente como parte do pipeline institucional.

O F-Designer é um prompt interno obrigatório de normalização visual, não corresponde a uma ETAPA, mas sua execução é obrigatória dentro do pipeline:

Criador/Evolutor → F-Designer → Auditor → Refatorador (se necessário) → F-Designer → Auditor
