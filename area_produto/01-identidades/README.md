# Identidades do Produto

## 📍 Localização do BRIEF_PRODUTO

**Este diretório é o ponto de partida obrigatório para iniciar qualquer projeto.**

### Arquivo Obrigatório

Crie aqui o arquivo:

```text
BRIEF_PRODUTO.md
```

### Estrutura Mínima Obrigatória

```markdown
# BRIEF DO PRODUTO

## Identificação da Stack

stack_id: 001_next_fullstack_mongo

## Informações do Produto

nome: [Nome do Produto]
descrição: [Descrição breve]
objetivo: [Objetivo principal]

## Funcionalidades Principais

- Funcionalidade 1
- Funcionalidade 2
- Funcionalidade 3
```

### Valores Válidos para stack_id

- `001_next_fullstack_mongo` - Next.js Fullstack + MongoDB
- `002_next_front_node_back_mongo` - Next.js Frontend + Node.js Backend + MongoDB
- `003_next_front_python_back_mongo` - Next.js Frontend + Python Backend + MongoDB

---

## 🚀 Próximos Passos Após Criar o BRIEF

Após criar o `BRIEF_PRODUTO.md` neste diretório:

1. O sistema irá ler o `stack_id` declarado
2. Carregará automaticamente os documentos da stack correspondente
3. Iniciará o fluxo de criação conforme [FLUXO_ORQUESTRADOR_CENTRAL](../../mapas_e_fluxos_centrais/FLUXO_ORQUESTRADOR_CENTRAL.md)

---

## ⚠️ Bloqueio do Sistema

**Sem o arquivo `BRIEF_PRODUTO.md` com `stack_id` válido, o sistema entra em estado BLOQUEADO.**

Nenhum agente, playbook ou operação pode ser executada sem este arquivo.
