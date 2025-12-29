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

- verificar que os slugs técnicos estão em inglês e em `kebab-case` (ex.: `/reset-password`)

### V3 — Arquitetura

Verificar:

- separação de camadas
- shared vs feature
- dependência de auth correta

- verificar alinhamento explícito com os Dossiês institucionais e com o `FLUXO_ORQUESTRADOR` (etapas e bloqueios aplicáveis)

### V4 — Fase e Consistência

- confirmar que a página proposta está sendo implementada na Fase correta (por exemplo: não iniciar implementação na Fase MOC sem Passaporte validado)
- certificar que novos itens adicionados ao Passaporte respeitam a regra de reentrada (Passaporte só autoriza execução após validação)

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
