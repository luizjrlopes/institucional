# Servidor MCP Institucional

Este é um servidor Model Context Protocol (MCP) que expõe toda a documentação institucional de stacks e agentes para uso com GitHub Copilot e outras ferramentas compatíveis com MCP.

## 📦 Instalação

```bash
cd institucional
npm install
npm run build
```

## 🚀 Uso Local

```bash
npm start
```

## 🔧 Configuração no VS Code

### Opção 1: Configuração do Usuário (Global)

1. Abra o Command Palette (`Ctrl+Shift+P`)
2. Execute: `Preferences: Open User Settings (JSON)`
3. Adicione:

```json
{
  "github.copilot.chat.modelContextProtocol.servers": {
    "institucional": {
      "command": "node",
      "args": [
        "C:\\Users\\[nome_usuario]\\Desktop\\Projeto\\institucional\\dist\\index.js"
      ]
    }
  }
}
```

### Opção 2: Configuração do Workspace

1. Crie/edite `.vscode/settings.json` na raiz do projeto
2. Adicione:

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

## 📚 Recursos Expostos

O servidor expõe:

- **Recursos** — Todos os arquivos `.md` da estrutura institucional
- **Tools** — Ferramentas para buscar e navegar na documentação

### Ferramentas Disponíveis

#### `search_docs`

Busca por termo em todos os documentos.

```typescript
{
  query: string; // Termo de busca
}
```

#### `get_stack_info`

Retorna informações sobre uma stack específica.

```typescript
{
  stackId: "001" | "002" | "003";
}
```

## 🎯 Uso no Copilot Chat

Depois de configurado, você pode perguntar no Copilot Chat:

- "Quais são os playbooks da stack 001?"
- "Como funciona o agente criador?"
- "Busque informações sobre validador de passaporte"

## 📂 Estrutura

```text
institucional/
├── src/
│   └── index.ts          # Servidor MCP
├── package.json
├── tsconfig.json
└── README_MCP.md         # Este arquivo
```

## 🔗 Links Úteis

- [MCP Specification](https://spec.modelcontextprotocol.io/)
- [MCP SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- [GitHub Copilot MCP Integration](https://github.blog/changelog/2024-11-25-model-context-protocol-mcp-support-in-github-copilot-chat-in-vs-code-public-preview/)
