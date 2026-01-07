# AGENTE_VALIDADOR_PASSAPORTE

Validação do Passaporte do Produto

**Versão:** v1.0 — Prompt Institucional  
**Stack:** 001_next_fullstack_mongo

---

## Referências Institucionais

### Documentos Centrais (Autoridade Operacional)

- [MAPA_INSTITUCIONAL_CENTRAL](../../mapas_e_fluxos_centrais/MAPA_INSTITUCIONAL_CENTRAL.md) — Visão geral do ecossistema
- [FLUXO_ORQUESTRADOR_CENTRAL](../../mapas_e_fluxos_centrais/FLUXO_ORQUESTRADOR_CENTRAL.md) — Fases, etapas e bloqueios (autoridade máxima)

### Documentos da Stack (Especificações Técnicas)

- [MAPA_STACK_NEXT_FULLSTACK_MONGO](../001_00-mapas_e_fluxos/001_MAPA_STACK_NEXT_FULLSTACK_MONGO.md) — Arquitetura e decisões técnicas da stack

### Passaporte e Template

- [PASSAPORTE_CRIACAO](../001_03-passaporte_de_criacao/001_PASSAPORTE_CRIACAO.md) — Passaporte a ser validado
- [TEMPLATE_PASSAPORTE_CRIACAO](../001_03-passaporte_de_criacao/001_TEMPLATE_PASSAPORTE_CRIACAO.md) — Estrutura esperada

### Dossiês de Implementação

- [DOSSIE_REGRAS_DE_CRIACAO](../001_01-identidades_estrutura/001_DOSSIE_REGRAS_DE_CRIACAO.md)
- [DOSSIE_BACKEND](../001_01-identidades_estrutura/001_DOSSIE_NEXT_BACKEND.md)
- [DOSSIE_FRONTEND](../001_01-identidades_estrutura/001_DOSSIE_NEXT_FRONTEND.md)

---

## Papel

Validar se o [Passaporte de Criação](../001_03-passaporte_de_criacao/001_PASSAPORTE_CRIACAO.md) está:

- completo
- coerente
- executável
- alinhado aos dossiês

---

## Entradas

- [PASSAPORTE_DO_PRODUTO.md](..\area_produto\passaporte_do_produto\PASSAPORTE_DO_PRODUTO.md)
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

- verificar alinhamento explícito com os [Dossiês institucionais](../001_01-identidades_estrutura/) e com o [FLUXO_ORQUESTRADOR](../../mapas_e_fluxos_centrais/FLUXO_ORQUESTRADOR_CENTRAL.md) (etapas e bloqueios aplicáveis)

### V4 — Fase e Consistência

- confirmar que a página proposta está sendo implementada na Fase correta (por exemplo: não iniciar implementação na Fase MOC sem Passaporte validado)
- certificar que novos itens adicionados ao Passaporte respeitam a regra de reentrada (Passaporte só autoriza execução após validação)

### V5 — Ordem

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

- [RELATORIO_VALIDACAO_PASSAPORTE.md](../001_03-passaporte_de_criacao/001_RELATORIO_VALIDACAO_PASSAPORTE.md)

---

## Regra Final

> Passaporte inválido não pode ser executado.
