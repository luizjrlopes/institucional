# Projeto Institucional — Sistema Multi-Stack

Sistema de governança e documentação para criação de aplicações em diferentes stacks tecnológicas.

## 📁 Estrutura

- **`mapas_e_fluxos_centrais/`** — governança central e catálogo de stacks
- **`001_stack_next_fullstack_mongo/`** — Stack Next.js Fullstack + MongoDB
- **`002_stack_next_front_node_back_mongo/`** — Stack Next.js + Node.js + MongoDB
- **`003_stack_next_front_python_back_mongo/`** — Stack Next.js + Python + MongoDB
- **`area_produto/`** — identidades e passaportes de produtos
- **`historico/`** — auditorias, changelog e decisões
- **`prompts/`** — prompts executáveis e internos

## 🎯 Documentos Principais

- [MAPA_INSTITUCIONAL_CENTRAL.md](mapas_e_fluxos_centrais/MAPA_INSTITUCIONAL_CENTRAL.md) — governança central
- [CATALOGO_STACKS.md](mapas_e_fluxos_centrais/CATALOGO_STACKS.md) — stacks disponíveis
- [ORQUESTRADOR_MESTRE.md](ORQUESTRADOR_MESTRE.md) — orquestração de agentes
- [README_MCP.md](README_MCP.md) — servidor MCP para integração com Copilot

## 🚀 Servidor MCP

Este projeto inclui um servidor Model Context Protocol para expor toda a documentação ao GitHub Copilot.

Ver instruções completas em [README_MCP.md](README_MCP.md).

### Instalação Rápida

```bash
npm install
npm run build
```

### Configuração no VS Code

Adicione em `.vscode/settings.json`:

```json
{
  "github.copilot.chat.modelContextProtocol.servers": {
    "institucional": {
      "command": "node",
      "args": ["${workspaceFolder}/institucional/dist/index.js"]
    }
  }
}
```

## 📚 Sobre as Stacks

Cada stack possui sua própria documentação completa incluindo:

- **Mapas e Fluxos** — visão arquitetural da stack
- **Identidades e Estrutura** — dossiês técnicos e regras de criação
- **Playbooks** — processos executáveis (criador, evolutor, auditor, etc.)
- **Agentes** — agentes especializados por stack
- **Passaportes de Criação** — templates e validadores
- **Referências** — exemplos e estruturas de referência

### Stacks Disponíveis

| Stack ID | Descrição                                    | Status   |
| -------- | -------------------------------------------- | -------- |
| 001      | Next.js Fullstack + MongoDB                  | ✅ Ativo |
| 002      | Next.js Frontend + Node.js Backend + MongoDB | ✅ Ativo |
| 003      | Next.js Frontend + Python Backend + MongoDB  | ✅ Ativo |

## 🔄 Fluxo de Trabalho

1. **Seleção de Stack** — via `BRIEF_PRODUTO.stack_id`
2. **Carregamento de Contexto** — mapa e dossiês da stack
3. **Execução de Playbooks** — criação/evolução seguindo pipeline
4. **Validação e Auditoria** — garantia de conformidade institucional

## 📖 Documentação Complementar

- [BLINDAGEM_ANTI_ALUCINACAO.md](BLINDAGEM_ANTI_ALUCINACAO.md) — controle de qualidade e validações
- [GUIA_DE_USO.md](GUIA_DE_USO.md) — guia geral de uso do sistema
- [GUIA_DE_USO_TOKENS.md](GUIA_DE_USO_TOKENS.md) — otimização de tokens
