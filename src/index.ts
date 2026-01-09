#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminho base da documentação institucional
const DOCS_BASE = path.resolve(__dirname, "..");

/**
 * Busca recursivamente todos os arquivos .md na estrutura institucional
 */
async function findMarkdownFiles(
  dir: string,
  baseDir: string = dir
): Promise<string[]> {
  const files: string[] = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await findMarkdownFiles(fullPath, baseDir)));
    } else if (entry.name.endsWith(".md")) {
      files.push(path.relative(baseDir, fullPath));
    }
  }

  return files;
}

/**
 * Servidor MCP para documentação institucional
 */
const server = new Server(
  {
    name: "institucional-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      resources: {},
      tools: {},
    },
  }
);

// Lista todos os recursos (arquivos .md) disponíveis
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  const markdownFiles = await findMarkdownFiles(DOCS_BASE);

  return {
    resources: markdownFiles.map((file) => ({
      uri: `institucional:///${file.replace(/\\/g, "/")}`,
      name: path.basename(file, ".md"),
      description: `Documento: ${file}`,
      mimeType: "text/markdown",
    })),
  };
});

// Lê o conteúdo de um recurso específico
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const uri = request.params.uri.toString();
  const filePath = uri
    .replace("institucional:///", "")
    .replace(/\//g, path.sep);
  const fullPath = path.join(DOCS_BASE, filePath);

  try {
    const content = await fs.readFile(fullPath, "utf-8");
    return {
      contents: [
        {
          uri,
          mimeType: "text/markdown",
          text: content,
        },
      ],
    };
  } catch (error) {
    throw new Error(`Erro ao ler arquivo: ${filePath}`);
  }
});

// Lista ferramentas disponíveis
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "search_docs",
        description: "Busca por termo em todos os documentos institucionais",
        inputSchema: {
          type: "object",
          properties: {
            query: {
              type: "string",
              description: "Termo de busca",
            },
          },
          required: ["query"],
        },
      },
      {
        name: "get_stack_info",
        description:
          "Retorna informações sobre uma stack específica (001, 002, 003)",
        inputSchema: {
          type: "object",
          properties: {
            stackId: {
              type: "string",
              description: "ID da stack (001, 002 ou 003)",
              enum: ["001", "002", "003"],
            },
          },
          required: ["stackId"],
        },
      },
    ],
  };
});

// Executa ferramentas
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === "search_docs") {
    const query = (args as { query: string }).query.toLowerCase();
    const markdownFiles = await findMarkdownFiles(DOCS_BASE);
    const results: { file: string; matches: string[] }[] = [];

    for (const file of markdownFiles) {
      const fullPath = path.join(DOCS_BASE, file);
      const content = await fs.readFile(fullPath, "utf-8");
      const lines = content.split("\n");
      const matches = lines.filter((line) =>
        line.toLowerCase().includes(query)
      );

      if (matches.length > 0) {
        results.push({ file, matches: matches.slice(0, 3) });
      }
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(results, null, 2),
        },
      ],
    };
  }

  if (name === "get_stack_info") {
    const stackId = (args as { stackId: string }).stackId;
    const stackDir = path.join(DOCS_BASE, `00${stackId}_stack_*`);

    // Busca o diretório da stack
    const dirs = await fs.readdir(DOCS_BASE);
    const stackFolder = dirs.find((d) => d.startsWith(`00${stackId}_stack_`));

    if (!stackFolder) {
      return {
        content: [{ type: "text", text: `Stack ${stackId} não encontrada` }],
      };
    }

    const stackPath = path.join(DOCS_BASE, stackFolder);
    const files = await findMarkdownFiles(stackPath, DOCS_BASE);

    return {
      content: [
        {
          type: "text",
          text: `Stack ${stackId} (${stackFolder}):\n\n${files.join("\n")}`,
        },
      ],
    };
  }

  throw new Error(`Ferramenta desconhecida: ${name}`);
});

// Inicia o servidor
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Servidor MCP Institucional iniciado");
}

main().catch((error) => {
  console.error("Erro ao iniciar servidor:", error);
  process.exit(1);
});
