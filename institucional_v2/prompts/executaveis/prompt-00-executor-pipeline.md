# Prompt 00 — Executor de Pipeline

## 🎯 Propósito

Orquestrar e garantir a execução sequencial obrigatória do pipeline institucional após qualquer execução do AGENTE_CRIADOR ou AGENTE_EVOLUTOR.

## 👥 Papel

Este prompt representa o papel do Executor de Pipeline (humano ou agente automatizado). Sua execução garante que os passos do PLAYBOOK_PIPELINE sejam acionados em ordem e que o registro final seja gerado em `06-historico/`.

## 📚 Autoridade

- MAPA_INSTITUCIONAL
- PLAYBOOK_PIPELINE
- FLUXO_ORQUESTRADOR

## ⚙️ Execução (Resumo)

1. Acionar `prompt-06-f-designer.md` (F-Designer)
2. Acionar `prompt-05-auditoria.md` (Auditor)
3. Se Auditor sinalizar desvios, acionar `prompt-07-refatoracao.md` (Refatorador)
4. Se PASSO 3 ocorreu, reexecutar F-Designer e Auditor
5. Gerar registro completo em `06-historico/pipelines/` seguindo o template do PLAYBOOK_PIPELINE

## ⛔ Regras

- Não alterar o conteúdo dos prompts chamados.
- Não encerrar o pipeline sem aprovação final do AGENTE_AUDITOR.
- Registrar falhas e motivos no arquivo de histórico do pipeline.

## Saída

- `PIPELINE-YYYYMMDD-HHMM-{scope}/00-resumo.md` e demais arquivos de etapa dentro do diretório do pipeline em `06-historico/pipelines/`.

---

> Observação: este prompt é um artefato operacional. Sua execução pode ser humana (procedimento manual) ou automatizada (agente executor), mas a regra institucional sobre ordem e registro é imutável.
