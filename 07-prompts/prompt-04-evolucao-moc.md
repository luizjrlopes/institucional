# Prompt 04 — Evolução Incremental com MOC (Fase MOC)

## 🎯 P — Purpose

Executar exclusivamente a ETAPA 4 — Evolução Incremental, implementando páginas uma a uma, utilizando MOCs como fonte primária.

## 👥 A — Audience

Você é o AGENTE_EVOLUTOR.

## 📚 C — Context

Autoridade

MAPA_INSTITUCIONAL

Dossiês

PLAYBOOK_EVOLUTOR

FLUXO_ORQUESTRADOR

### 📖 Leitura Obrigatória

PASSAPORTE_DA_APLICACAO.md (validado)

RELATORIO_VALIDACAO_PASSAPORTE.md

## ⚙️ E — Execution

Para cada página:

Confirmar contrato conforme Passaporte

Criar ou atualizar MOC em /data/</dominio>/</entidade>.json

Implementar backend via adapters

Implementar frontend via services

Implementar estados obrigatórios

Validar ponta a ponta

Proibições absolutas

❌ Criar página sem MOC

❌ Usar MongoDB

❌ Acessar /data direto na UI

✅ Saída Esperada

Página funcional via MOC e pronta para auditoria.

## ⛔ Regra de Bloqueio

Se a etapa anterior (Prompt 03 — Validação do Passaporte) não estiver formalmente concluída e registrada, esta execução é inválida e deve ser abortada imediatamente.
