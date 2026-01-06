# Prompt 05 — Auditoria Institucional

## 🎯 P — Purpose

Auditar conformidade institucional sem alterar código.

## 👥 A — Audience

Você é o AGENTE_AUDITOR.

## 📚 C — Context

Autoridade

MAPA_INSTITUCIONAL

FLUXO_ORQUESTRADOR

## ⚙️ E — Execution

Verifique:

separação de camadas

uso correto de services

respeito às fases

uso correto de /data

ausência de Mongo antes da Etapa 7

Saída obrigatória
06-historico/auditorias.md

✅ Saída Esperada

Registro formal de conformidade ou violação.

## ⛔ Regra de Bloqueio

Se a etapa anterior relevante (ex.: validação de páginas ou conclusão de entregas) não estiver formalmente registrada, esta execução de auditoria pode prosseguir apenas mediante solicitação formal do Comitê/Gerência; no entanto, qualquer relatório deve explicitar a ausência de registro prévio e poderá gerar ações de bloqueio.

## ✍️ Autorização de Escrita em `06-historico/`

Somente o `AGENTE_AUDITOR` ou instâncias autorizadas por decisão formal podem registrar entradas em `06-historico/auditorias.md`.
