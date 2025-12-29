# 07-prompts

Esta pasta contém os prompts institucionais que instanciam os agentes responsáveis por cada etapa do fluxo operacional, conforme o MAPA_INSTITUCIONAL.

## Estrutura dos Prompts (Método PACE)

Cada arquivo segue a estrutura PACE (definição institucional):

- **P — Purpose (Propósito):** O objetivo da etapa.
- **A — Audience (Papel do Agente):** Quem executa e suas restrições.
- **C — Context (Autoridade e Regras):** Documentos de autoridade e leitura obrigatória.
- **E — Execution (Escopo de Execução e Saídas):** O que executar, proibições e artefatos gerados.

## Arquivos

- prompt-01-criacao-estrutura.md
- prompt-02-geracao-passaporte.md
- prompt-03-validacao-passaporte.md
- prompt-04-evolucao-moc.md
- prompt-05-auditoria.md
- prompt-06-refatoracao.md

Cada prompt corresponde a uma etapa do FLUXO_ORQUESTRADOR e instancia um agente específico, sem sobreposição de fases.
