# MAPA_INSTITUCIONAL.md

Governança Arquitetural e Operacional — Next.js Fullstack

**Versão:** v1.0 — Documento de Amarração Institucional

## 1. Objetivo do Mapa Institucional

Este documento existe para:

- Definir quem decide o quê
- Estabelecer ordem de precedência entre documentos
- Explicar quando cada documento é usado
- Indicar qual agente consome qual artefato
- Evitar conflitos, duplicidade e improvisação

Nenhum documento técnico deve ser usado fora do contexto definido aqui.

## 2. Hierarquia Oficial de Documentos (Precedência)

Em caso de qualquer dúvida, conflito ou ambiguidade, a ordem abaixo deve ser respeitada rigorosamente:

1. MAPA_INSTITUCIONAL.md → governa todos os demais
1. Dossiê Institucional — Regras de Criação → decisões imutáveis (stack, arquitetura, princípios)
1. Dossiê Institucional — Backend → detalhamento técnico do backend
1. Dossiê Institucional — Frontend → detalhamento técnico do frontend
1. Playbook do Criador (Channel 1) → execução da fase inicial
1. Playbook do Evolutor (Channel 2) → execução de features/páginas
1. Passaporte da Aplicação → plano específico daquele produto
1. Referências (HTML / Imagens) → insumo visual e funcional, nunca autoridade

## 3. Papéis dos Documentos (Quem faz o quê)

### 3.1 Documentos Constitucionais (Não Executáveis)

| Documento                  | Papel                                       |
| -------------------------- | ------------------------------------------- |
| Dossiê — Regras de Criação | Define o que não pode mudar                 |
| Dossiê — Backend           | Define como o backend deve ser estruturado  |
| Dossiê — Frontend          | Define como o frontend deve ser estruturado |
| Mapa Institucional         | Define como tudo se conecta                 |

Esses documentos não executam tarefas. Eles limitam e orientam.

### 3.2 Documentos Operacionais (Executáveis)

| Documento               | Papel                                    |
| ----------------------- | ---------------------------------------- |
| Playbook do Criador     | Executa o bootstrap do projeto           |
| Playbook do Evolutor    | Executa criação de páginas/features      |
| Passaporte da Aplicação | Planeja a execução específica do produto |

### 3.3 Documentos de Referência (Não Normativos)

| Documento    | Papel                                 |
| ------------ | ------------------------------------- |
| HTMLs        | Referência de layout e funcionalidade |
| Imagens      | Referência visual                     |
| Notas soltas | Contexto auxiliar                     |

Esses nunca definem arquitetura ou regra de negócio.

## 4. Agentes Institucionais e Dependências

### 4.1 Mapa Agente → Documentos

| Agente                  | Documentos que consome                      | Documentos que produz |
| ----------------------- | ------------------------------------------- | --------------------- |
| Orquestrador            | Todos                                       | Nenhum                |
| Criador                 | Regras, Backend, Frontend, Playbook Criador | Código base           |
| Gerador de Passaporte   | Regras, Dossiês, Referências                | Passaporte            |
| Validador de Passaporte | Regras, Dossiês, Playbooks                  | Relatório             |
| Evolutor                | Passaporte, Playbook Evolutor               | Código de feature     |
| Refatorador             | Regras, Dossiês                             | Código refatorado     |
| Auditor                 | Todos                                       | Relatório             |

## 3.4 Classificação dos Artefatos Institucionais (Fixo × Gerado por Projeto)

Para eliminar ambiguidades sobre responsabilidade, geração e versionamento,
todos os artefatos institucionais são classificados em três categorias.

### 3.4.1 Artefatos Fixos (Base Institucional)

São criados **uma única vez** e reutilizados em todos os projetos.
Representam o método, não o produto.

- MAPA_INSTITUCIONAL.md
- Dossiê Institucional — Regras de Criação
- Dossiê Institucional — Backend
- Dossiê Institucional — Frontend
- Playbook do Criador (Channel 1)
- Playbook do Evolutor (Channel 2)
- Todos os Prompts de Agentes Institucionais

**Regra:**  
Esses artefatos **não são gerados por IA por projeto**.
A IA apenas os consome como autoridade normativa.

---

### 3.4.2 Templates Institucionais

São criados uma vez, mas **instanciados por projeto**.

- TEMPLATE_PASSAPORTE.md

**Regra:**  
Templates nunca representam estado final de um projeto.
Eles apenas definem o formato esperado.

---

### 3.4.3 Artefatos Gerados por Projeto

São produzidos especificamente para cada aplicação.

- PASSAPORTE_DA_APLICACAO.md
- RELATORIO_VALIDACAO_PASSAPORTE.md
- Referências do produto (HTML, imagens, notas)
- Registros em histórico (decisões, auditorias, changelog)

**Regra:**  
Esses artefatos **devem ser criados, validados e versionados por projeto**.

---

### 3.4.4 Responsabilidade de Geração

| Artefato                | Responsável                    |
| ----------------------- | ------------------------------ |
| Passaporte da Aplicação | Agente Gerador de Passaporte   |
| Relatório de Validação  | Agente Validador de Passaporte |
| Código Base             | Agente Criador                 |
| Features/Páginas        | Agente Evolutor                |
| Refatorações            | Agente Refatorador             |
| Auditorias              | Agente Auditor                 |

---

### 3.4.5 Regra Institucional Final

> Se um artefato não estiver classificado nesta seção,  
> **ele não pode ser criado, usado ou automatizado.**

## 5. Fluxo Institucional Oficial

1. Regras + Dossiês
1. Playbook do Criador
1. Projeto Base + Auth + Home vazia
1. Gerador de Passaporte
1. Passaporte da Aplicação
1. Validador de Passaporte
1. Playbook do Evolutor
1. Execução Página por Página
1. Auditoria (opcional / contínua)

## 6. Regras de Ouro (Obrigatórias)

- Nenhuma feature sem Passaporte
- Nenhuma execução sem Playbook
- Nenhuma interpretação livre de HTML/imagem
- Nenhuma lógica fora das camadas institucionais
- Nenhum agente acumula funções

## 7. O que este mapa resolve

- "Tem arquivo demais" → Agora cada um tem função clara
- "Não sei qual seguir" → Precedência definida
- "Isso contradiz aquilo?" → Hierarquia resolve
- "Parece overengineering" → Não é: é governança explícita

## 8. Status do Sistema Institucional

- Arquitetura: definida
- Governança: estabelecida
- Execução: controlada
- Evolução: segura
- Auditoria: possível

## 9. Regra Final

Se algo não estiver claro, o problema não é o código — é o documento que falta.

## Encerramento

Este arquivo é o ponto zero de leitura para qualquer novo agente, humano ou automático.

Nada começa fora dele.
