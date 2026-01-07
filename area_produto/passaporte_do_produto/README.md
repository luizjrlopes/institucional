# Passaporte do Produto

## 📋 Estrutura de Organização

Os passaportes do produto são organizados **por stack** para manter clareza e rastreabilidade.

### Estrutura de Diretórios

```text
passaporte_do_produto/
├── 001_next_fullstack_mongo/
│   ├── PASSAPORTE_DO_PRODUTO.md
│   └── RELATORIO_VALIDACAO_PASSAPORTE_DO_PRODUTO.md
├── 002_next_front_node_back_mongo/
│   ├── PASSAPORTE_DO_PRODUTO.md
│   └── RELATORIO_VALIDACAO_PASSAPORTE_DO_PRODUTO.md
└── 003_next_front_python_back_mongo/
    ├── PASSAPORTE_DO_PRODUTO.md
    └── RELATORIO_VALIDACAO_PASSAPORTE_DO_PRODUTO.md
```

---

## 🔄 Fluxo de Geração

### 1. Geração do Passaporte

O **AGENTE_GERADOR_PASSAPORTE_DO_PRODUTO** da stack correspondente:

- Lê o [BRIEF_PRODUTO.md](../01-identidades/BRIEF_PRODUTO.md)
- Analisa as referências visuais e funcionais em [referencias-etapa-mock](../referencias-etapa-mock/)
- Utiliza o template apropriado (TEMPLATE_PASSAPORTE_PRODUTO.md da stack)
- Gera o arquivo `PASSAPORTE_DO_PRODUTO.md` dentro da subpasta `[stack_id]/`

**Exemplo de localização final:**

```text
area_produto/passaporte_do_produto/001_next_fullstack_mongo/PASSAPORTE_DO_PRODUTO.md
```

### 2. Validação do Passaporte

O **AGENTE_VALIDADOR_PASSAPORTE_DO_PRODUTO** da stack correspondente:

- Lê o passaporte gerado
- Verifica completude, coerência e executabilidade
- Gera o arquivo `RELATORIO_VALIDACAO_PASSAPORTE_DO_PRODUTO.md` na mesma pasta

**Exemplo de localização final:**

```text
area_produto/passaporte_do_produto/001_next_fullstack_mongo/RELATORIO_VALIDACAO_PASSAPORTE_DO_PRODUTO.md
```

---

## 📌 Observações Importantes

### Sobre os Templates

Cada stack possui seu próprio template de passaporte do produto localizado em:

```text
[stack_id]/001_03-passaporte_de_criacao/001_TEMPLATE_PASSAPORTE_PRODUTO.md
```

### Precedência

O passaporte do produto é criado **após** a estrutura básica estar funcional e validada.

**Ordem de execução:**

1. PASSAPORTE_DE_CRIACAO → estrutura base
2. PASSAPORTE_DO_PRODUTO → funcionalidades e páginas do produto

### Referências de Entrada

O agente gerador usa como referências:

- **BRIEF_PRODUTO.md** - requisitos e funcionalidades
- **referencias-etapa-mock/html/** - protótipos HTML das páginas
- **referencias-etapa-mock/imagens/** - wireframes e designs
- **referencias-etapa-mock/md/** - anotações funcionais e regras de negócio

---

**Nunca edite manualmente o PASSAPORTE_DO_PRODUTO após validação.**  
Qualquer alteração deve passar pelo ciclo: editar referências → regenerar passaporte → revalidar.
