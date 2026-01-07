# Histórico de Decisões Arquiteturais

**Objetivo:** Registrar decisões importantes sobre arquitetura, padrões e processos.

---

## Como Usar Este Template

Para cada decisão importante:

1. Copie o template abaixo
2. Preencha todos os campos
3. Adicione no final deste arquivo (mais recente primeiro)

---

## Template de Decisão

```markdown
## [ID] - [Título da Decisão]

**Data:** YYYY-MM-DD  
**Autor:** [Nome/Agente]  
**Stack:** [001/002/003/CENTRAL]  
**Status:** [PROPOSTA/APROVADA/REJEITADA/OBSOLETA]

### Contexto

[Por que esta decisão foi necessária? Qual problema estamos resolvendo?]

### Decisão

[O que foi decidido? Descrever a solução escolhida]

### Alternativas Consideradas

1. **Alternativa A:** [descrição] - Rejeitada porque [motivo]
2. **Alternativa B:** [descrição] - Rejeitada porque [motivo]

### Consequências

#### Positivas

- [Benefício 1]
- [Benefício 2]

#### Negativas

- [Trade-off 1]
- [Trade-off 2]

### Referências

- [Documento relacionado 1]
- [Documento relacionado 2]

---
```

---

## Decisões Registradas

### DEC-001 - Separação entre stack_id e stack_root_dir

**Data:** 2026-01-07  
**Autor:** Sistema  
**Stack:** CENTRAL  
**Status:** APROVADA

#### Contexto

Havia ambiguidade entre o identificador lógico da stack (`stack_id`) e o caminho físico do diretório (`stack_root_dir`). Documentos e prompts usavam `stack_id` diretamente como path, o que causava erros em automação.

#### Decisão

Criar catálogo explícito (CATALOGO_STACKS.md) que mapeia `stack_id` → `stack_root_dir`. Documentos devem usar placeholder `{{STACK_ROOT_DIR}}` em vez de paths hardcoded.

#### Alternativas Consideradas

1. **Renomear todas as pastas para remover prefixo `stack_`** - Rejeitada porque causaria breaking change em todos os documentos existentes
2. **Forçar stack_id = nome da pasta** - Rejeitada porque remove flexibilidade futura

#### Consequências

##### Positivas

- Elimina ambiguidade na resolução de paths
- Permite renomear diretórios sem quebrar referências
- Facilita automação e parsing

##### Negativas

- Adiciona uma camada de indireção
- Requer consulta ao catálogo em todo acesso

#### Referências

- [CATALOGO_STACKS.md](../mapas_e_fluxos_centrais/CATALOGO_STACKS.md)
- [FLUXO_ORQUESTRADOR_CENTRAL.md](../mapas_e_fluxos_centrais/FLUXO_ORQUESTRADOR_CENTRAL.md)

---

### DEC-002 - Estrutura de 3 Etapas (Criação, Mock, Integração)

**Data:** 2026-01-07  
**Autor:** Sistema  
**Stack:** CENTRAL  
**Status:** APROVADA

#### Contexto

Fluxo original misturava criação de estrutura com implementação de features, causando confusão sobre quando usar MOCs vs banco real.

#### Decisão

Separar fluxo em 3 etapas explícitas e sequenciais:

1. CRIAÇÃO - estrutura base + autenticação
2. CONSTRUÇÃO (MOCK) - páginas do produto com MOCs
3. INTEGRAÇÃO - substituir MOCs por MongoDB

#### Alternativas Consideradas

1. **Permitir banco real desde o início** - Rejeitada porque aumenta complexidade e dificulta testes
2. **Criar tudo com MOCs e nunca integrar banco** - Rejeitada porque não entrega sistema produtivo

#### Consequências

##### Positivas

- Clareza sobre quando usar MOCs vs banco
- Facilita testes sem dependência de infraestrutura
- Permite iteração rápida na ETAPA 2

##### Negativas

- Exige refatoração na ETAPA 3 (DataRepository → MongoRepository)
- Adiciona tempo total ao fluxo

#### Referências

- [FLUXO_ORQUESTRADOR_CENTRAL.md](../mapas_e_fluxos_centrais/FLUXO_ORQUESTRADOR_CENTRAL.md)
- [GUIA_DE_USO.md](../GUIA_DE_USO.md)

---

### DEC-003 - Styled Components como padrão obrigatório

**Data:** 2026-01-07  
**Autor:** Sistema  
**Stack:** 001  
**Status:** APROVADA

#### Contexto

Projetos anteriores usavam mix de Tailwind, CSS modules e inline styles, causando inconsistência e dificuldade de manutenção.

#### Decisão

Styled Components é o único padrão permitido. Tailwind e CSS inline são proibidos.

#### Alternativas Consideradas

1. **Tailwind CSS** - Rejeitada porque dificulta leitura e não encapsula estilos por componente
2. **CSS Modules** - Rejeitada porque não tem acesso a props/state do componente
3. **Permitir qualquer solução** - Rejeitada porque gera inconsistência

#### Consequências

##### Positivas

- Estilos encapsulados por componente
- Acesso a props e state
- Type-safe com TypeScript
- Facilita temas dinâmicos

##### Negativas

- Curva de aprendizado inicial
- Bundle size ligeiramente maior
- Requer runtime CSS-in-JS

#### Referências

- [DOSSIE_REGRAS_DE_CRIACAO.md](../001_stack_next_fullstack_mongo/001_01-identidades_estrutura/001_DOSSIE_REGRAS_DE_CRIACAO.md)

---

## Legenda de Status

- **PROPOSTA:** Decisão sugerida, aguardando aprovação
- **APROVADA:** Decisão em vigor, deve ser seguida
- **REJEITADA:** Decisão proposta mas não aprovada
- **OBSOLETA:** Decisão anteriormente aprovada mas substituída por outra
