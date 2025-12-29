# Tabela Decisória — Pedido → Agente

Esta tabela é normativa.
O Agente Orquestrador deve seguir exatamente isso.

| Pedido do Usuário         | Estado do Projeto | Agente Correto        | Observação                            |
| ------------------------- | ----------------- | --------------------- | ------------------------------------- |
| Criar projeto             | Não existe        | Criador               | Inicia do zero                        |
| Criar login/auth          | Projeto sem auth  | Criador ou Evolutor\* | Depende se ainda está na Etapa 1 ou 2 |
| Criar página nova         | Auth + Home OK    | Evolutor              | Criar feature                         |
| Criar domínio             | Estrutura pronta  | Evolutor              | Sempre via features/                  |
| Ajustar organização       | Código funcional  | Refatorador           | Sem mudar comportamento               |
| Melhorar nomes            | Código funcional  | Refatorador           | Clareza apenas                        |
| Reorganizar pastas        | Código funcional  | Refatorador           | Estrutural                            |
| Verificar se está correto | Qualquer          | Auditor               | Só análise                            |
| "Melhorar arquitetura"    | Ambíguo           | ❌ Bloquear           | Solicitar especificação               |
| Criar feature sem login   | Auth inexistente  | ❌ Bloquear           | Ordem violada                         |
| Refatorar + criar feature | Qualquer          | ❌ Bloquear           | Dividir pedido                        |
| Alterar stack             | Qualquer          | ❌ Bloquear           | Decisão institucional                 |

## 📌 Regra de ouro

Um pedido → um agente → um tipo de ação
