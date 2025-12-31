# 07-prompts

Esta pasta contém os prompts institucionais que instanciam os agentes responsáveis por cada etapa do fluxo operacional, conforme o MAPA_INSTITUCIONAL.

## Estrutura dos Prompts (Método PACE)

Cada arquivo segue a estrutura PACE (definição institucional):

- **P — Purpose (Propósito):** O objetivo fundamental da etapa.
- **A — Audience (Papel do Agente):** Quem executa, seu papel e restrições.
- **C — Context (Contexto e Regras Institucionais):** Documentos de autoridade, leitura obrigatória e contexto normativo.
- **E — Execution (Execução e Critérios de Aceite):** O que executar, proibições, artefatos gerados e critérios de conclusão.

## Arquivos

- prompt-01-criacao-estrutura.md
- prompt-02-geracao-passaporte.md
- prompt-03-validacao-passaporte.md
- prompt-04-evolucao-moc.md
- prompt-05-auditoria.md
- prompt-06-refatoracao.md
- prompt-aux-f-designer.md

Prompts 01..06 correspondem às ETAPAS do FLUXO_ORQUESTRADOR e instanciam agentes específicos.
O prompt-aux-f-designer.md é um prompt auxiliar obrigatório de normalização visual, não corresponde a uma ETAPA, mas sua execução é obrigatória dentro do pipeline institucional:

Criador/Evolutor → F-Designer → Auditor → Refatorador (se necessário) → F-Designer → Auditor
