# CATÁLOGO DE STACKS

**Versão:** v1.0  
**Objetivo:** Mapear identificadores lógicos (stack_id) para diretórios físicos (stack_root_dir)

---

## Regra de Resolução

O sistema deve **SEMPRE** resolver `stack_id` → `stack_root_dir` através deste catálogo.

**NUNCA** usar `stack_id` diretamente como path em documentos ou código.

---

## Catálogo Oficial

| stack_id                           | stack_root_dir                            | Status   | Descrição                                    |
| ---------------------------------- | ----------------------------------------- | -------- | -------------------------------------------- |
| `001_next_fullstack_mongo`         | `001_stack_next_fullstack_mongo/`         | ✅ ATIVO | Next.js Fullstack + MongoDB                  |
| `002_next_front_node_back_mongo`   | `002_stack_next_front_node_back_mongo/`   | ✅ ATIVO | Next.js Frontend + Node.js Backend + MongoDB |
| `003_next_front_python_back_mongo` | `003_stack_next_front_python_back_mongo/` | ✅ ATIVO | Next.js Frontend + Python Backend + MongoDB  |

---

## Como Usar

### Em Documentos

**❌ ERRADO:**

```markdown
Acesse: [stack_id]/{{STACK_PREFIX}}\_02-playbooks/{{STACK_PREFIX}}\_PLAYBOOK_CRIADOR.md
```

**✅ CORRETO:**

```markdown
Acesse: {{STACK_ROOT_DIR}}/{{STACK_PREFIX}}\_02-playbooks/{{STACK_PREFIX}}\_PLAYBOOK_CRIADOR.md
```

### Em Código/Automação

```javascript
// 1. Ler stack_id do BRIEF_PRODUTO
const stackId = briefProduto.stack_id; // Ex: "001_next_fullstack_mongo"

// 2. Consultar catálogo
const stackRootDir = CATALOGO[stackId].stack_root_dir; // "001_stack_next_fullstack_mongo/"

// 3. Construir path completo
const playbook = `${stackRootDir}/{{STACK_PREFIX}}_02-playbooks/{{STACK_PREFIX}}_PLAYBOOK_CRIADOR.md`;
```

---

## Estrutura Interna de Cada Stack

Todas as stacks seguem a mesma estrutura interna padronizada:

```
{stack_root_dir}/
├── {{STACK_PREFIX}}_00-mapas_e_fluxos/
│   └── {{STACK_PREFIX}}_MAPA_STACK_*.md
├── {{STACK_PREFIX}}_01-identidades_estrutura/
│   ├── {{STACK_PREFIX}}_DOSSIE_REGRAS_DE_CRIACAO.md
│   ├── {{STACK_PREFIX}}_DOSSIE_*_FRONTEND.md
│   └── {{STACK_PREFIX}}_DOSSIE_*_BACKEND.md
├── {{STACK_PREFIX}}_02-playbooks/
│   ├── {{STACK_PREFIX}}_PLAYBOOK_CRIADOR.md
│   ├── {{STACK_PREFIX}}_PLAYBOOK_EVOLUTOR.md
│   ├── {{STACK_PREFIX}}_PLAYBOOK_REFATORADOR.md
│   ├── {{STACK_PREFIX}}_PLAYBOOK_AUDITOR.md
│   ├── {{STACK_PREFIX}}_PLAYBOOK_PIPELINE.md
│   └── {{STACK_PREFIX}}_PLAYBOOK_F_DESIGNER.md
├── {{STACK_PREFIX}}_03-passaporte_de_criacao/
│   ├── {{STACK_PREFIX}}_TEMPLATE_PASSAPORTE_DE_CRIACAO.md
│   ├── {{STACK_PREFIX}}_PASSAPORTE_DE_CRIACAO.md (gerado)
│   └── README.md
├── {{STACK_PREFIX}}_04-agentes/
│   ├── {{STACK_PREFIX}}_AGENTE_CRIADOR.md
│   ├── {{STACK_PREFIX}}_AGENTE_EVOLUTOR.md
│   ├── {{STACK_PREFIX}}_AGENTE_REFATORADOR.md
│   ├── {{STACK_PREFIX}}_AGENTE_AUDITOR.md
│   ├── {{STACK_PREFIX}}_AGENTE_F_DESIGNER.md
│   ├── {{STACK_PREFIX}}_AGENTE_GERADOR_PASSAPORTE_DA_CRIACAO.md
│   ├── {{STACK_PREFIX}}_AGENTE_VALIDADOR_PASSAPORTE_DA_CRIACAO.md
│   ├── {{STACK_PREFIX}}_AGENTE_GERADOR_PASSAPORTE_DO_PRODUTO.md
│   └── {{STACK_PREFIX}}_AGENTE_VALIDADOR_PASSAPORTE_DO_PRODUTO.md
└── {{STACK_PREFIX}}_05-referencias-etapa-criacao-estrutura/
    ├── referencias-visuais/
    └── snippets/
```

---

## Adicionando Nova Stack

Para adicionar uma nova stack ao sistema:

1. **Criar diretório** seguindo padrão `{NNN}_stack_{nome}/`
2. **Adicionar entrada** neste catálogo
3. **Criar estrutura interna** conforme template acima
4. **Atualizar** MAPA_INSTITUCIONAL_CENTRAL.md
5. **Marcar status** como 🚧 DRAFT até conclusão

---

## Status das Stacks

### ✅ ATIVO

Stack completa, testada e pronta para uso em produção.

### 🚧 DRAFT

Stack em desenvolvimento. Estrutura criada mas documentos incompletos.

### ⚠️ DEPRECATED

Stack marcada para descontinuação. Não usar em novos projetos.

### ❌ ARCHIVED

Stack arquivada. Apenas referência histórica.

---

**Última Atualização:** Janeiro 2026
