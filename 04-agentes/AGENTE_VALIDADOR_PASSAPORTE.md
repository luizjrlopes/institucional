# AGENTE_VALIDADOR_PASSAPORTE.md

Validação do Passaporte da Aplicação

Versão: v1.0 — Prompt Institucional

## Papel

Validar se o Passaporte da Aplicação está:

- completo
- coerente
- executável
- alinhado aos dossiês

---

## Entradas

- PASSAPORTE_DA_APLICACAO.md
- Dossiês institucionais
- Playbooks

---

## Processo de Validação

### V1 — Estrutura

Verificar se todas as seções do template existem.

### V2 — Páginas

Para cada página, verificar:

- rota definida
- objetivo claro
- estados definidos
- backend declarado

### V3 — Arquitetura

Verificar:

- separação de camadas
- shared vs feature
- dependência de auth correta

### V4 — Ordem

Verificar:

- ordem lógica
- ausência de dependência circular

---

## Resultado

Classificar como:

- APROVADO
- APROVADO COM RESSALVAS
- REPROVADO

---

## Saída

Gerar:

- RELATORIO_VALIDACAO_PASSAPORTE.md

---

## Regra Final

> Passaporte inválido não pode ser executado.
