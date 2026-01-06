# PLAYBOOK_REFATORADOR

Objetivo: orientar a execução do AGENTE_REFATORADOR quando acionado pelo Auditor.

Escopo:

- Receber relatório de desvios e aplicar correções limitadas e justificadas.
- Correções devem ser focadas exclusivamente nos itens apontados pelo Auditor.
- Não introduzir melhorias estruturais não solicitadas.

Regras essenciais:

- Refatorador só atua mediante relatório formal do Auditor.
- Todas as mudanças devem ser registradas em `06-historico/` com referência ao relatório.
- Após refatoração, reexecutar F-Designer e Auditor conforme pipeline.

Critério de aceite:

- Desvios apontados resolvidos e validados pelo Auditor.
- Nenhuma alteração de comportamento funcional.
