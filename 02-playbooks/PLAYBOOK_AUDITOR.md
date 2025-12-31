# PLAYBOOK_AUDITOR

Objetivo: orientar a execução obrigatória do AGENTE_AUDITOR no pipeline institucional.

Escopo:

- Receber artefatos (codigo, páginas, MOCs) após execução do F-Designer.
- Realizar checagens de conformidade contra MAPA_INSTITUCIONAL, Dossiês e Playbooks.
- Emitir RELATORIO_VALIDACAO com nível de severidade e lista de desvios.

Regras essenciais:

- Auditor não corrige; apenas aponta desvios.
- Qualquer desvio crítico aciona o Refatorador.
- Auditor registra evidências em `06-historico/`.

Critérios de aceite:

- Checklist de conformidade (UI literal, rotas, contratos, MOCs).
- Se tudo OK → emitir status APROVADO.
- Se houver desvios → emitir CORREÇÕES_NECESSÁRIAS com itens acionáveis.
