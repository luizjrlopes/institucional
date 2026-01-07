# README - Passaporte do Produto (Stack 001)

## 📋 Arquivos Gerados Neste Diretório

Este diretório contém o passaporte do produto e seu relatório de validação para a stack **001_next_fullstack_mongo**.

### Arquivos Esperados

- `PASSAPORTE_DO_PRODUTO.md` - Gerado pelo AGENTE_GERADOR_PASSAPORTE_DO_PRODUTO
- `RELATORIO_VALIDACAO_PASSAPORTE_DO_PRODUTO.md` - Gerado pelo AGENTE_VALIDADOR_PASSAPORTE_DO_PRODUTO

---

## 🔄 Processo de Geração

### 1. Pré-requisitos

Antes da geração, certifique-se de que:

- ✅ [BRIEF_PRODUTO.md](../../01-identidades/BRIEF_PRODUTO.md) existe com `stack_id: 001_next_fullstack_mongo`
- ✅ [referencias-etapa-mock](../../referencias-etapa-mock/) está populado com:
  - HTMLs das páginas do produto
  - Imagens/wireframes
  - Documentação funcional (.md)

### 2. Geração do Passaporte

O agente responsável:

```text
/institucional_v2/001_stack_next_fullstack_mongo/001_04-agentes/001_AGENTE_GERADOR_PASSAPORTE_DO_PRODUTO.md
```

**Analisa:**

- BRIEF_PRODUTO.md
- Referências em referencias-etapa-mock/
- Template: `001_03-passaporte_de_criacao/001_TEMPLATE_PASSAPORTE_PRODUTO.md`

**Gera:**

- `PASSAPORTE_DO_PRODUTO.md` (neste diretório)

### 3. Validação do Passaporte

O agente responsável:

```text
/institucional_v2/001_stack_next_fullstack_mongo/001_04-agentes/001_AGENTE_VALIDADOR_PASSAPORTE_DO_PRODUTO.md
```

**Valida:**

- Completude do passaporte
- Coerência com dossiês da stack
- Executabilidade das especificações

**Gera:**

- `RELATORIO_VALIDACAO_PASSAPORTE_DO_PRODUTO.md` (neste diretório)

---

## 📌 Status da Validação

Após a validação, o relatório indicará:

- ✅ **APROVADO** - Passaporte pronto para implementação
- ⚠️ **APROVADO COM RESSALVAS** - Implementação pode iniciar, mas com pontos de atenção
- ❌ **REPROVADO** - Passaporte precisa ser corrigido

---

## 🚀 Próximos Passos

Com o passaporte **APROVADO**, o fluxo prossegue para:

1. **AGENTE_EVOLUTOR** inicia implementação página por página
2. **PLAYBOOK_PIPELINE** orquestra ciclos de designer → auditor → refatorador
3. Iterações até todas as páginas estarem implementadas com MOCs

---

## ⚠️ Importante

**Não edite manualmente estes arquivos.**  
Qualquer alteração deve seguir o ciclo:

1. Atualizar referências em `referencias-etapa-mock/`
2. Regenerar passaporte
3. Revalidar
