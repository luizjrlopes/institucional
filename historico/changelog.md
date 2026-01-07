# Changelog do Sistema Institucional

**Objetivo:** Registrar todas as mudanças estruturais e evolutivas do sistema.

---

## Como Usar Este Template

Para cada mudança significativa:

1. Adicione entrada na seção correspondente (Unreleased, versão específica)
2. Categorize como: Added, Changed, Deprecated, Removed, Fixed, Security
3. Use presente simples (ex: "Add", não "Added")

---

## [Unreleased]

### Added

- (vazio)

### Changed

- (vazio)

### Deprecated

- (vazio)

### Removed

- (vazio)

### Fixed

- (vazio)

---

## [2.0.0] - 2026-01-07

### Added

- **CATALOGO_STACKS.md** - Catálogo central mapeando stack_id → stack_root_dir
- **Stacks 002 e 003** - Estruturas stub para stacks futuras (status DRAFT)
- **historico/** - Templates para decisões, changelog, auditorias e pipelines
- **area_produto/** - Organização de BRIEF, passaportes e referências por stack
- **GUIA_DE_USO.md** - Documentação completa do fluxo de 3 etapas
- **Placeholders {{STACK_ROOT_DIR}}** em documentos centrais

### Changed

- **FLUXO_ORQUESTRADOR_CENTRAL.md** - Reestruturado em 3 ETAPAS (Criação, Mock, Integração)
- **Organização de pastas** - Separação clara entre central/stack/produto/prompts
- **Passaportes do produto** - Agora organizados por stack em area_produto/passaporte_do_produto/[stack_id]/
- **READMEs** - Todos atualizados com contexto detalhado e instruções claras

### Deprecated

- Referências diretas a `[stack_id]/path/` sem usar catálogo

### Removed

- Referências a arquivo inexistente `001_FLUXO_STACK_NEXT_FULLSTACK_MONGO.md`
- Duplicações em playbooks (EVOLUTOR e AUDITOR)
- Paths hardcoded em alguns prompts

### Fixed

- Ambiguidade entre stack_id e nome do diretório
- Inconsistência em nomenclatura (STACK*001*\* vs 001_next_fullstack_mongo)
- 15 referências quebradas em playbooks após reestruturação
- Referências a pastas antigas (../../01-identidades/estrutura_base/)

---

## [1.0.0] - Data Anterior

### Added

- Estrutura inicial do institucional
- Stack 001 completa (mapa, dossiês, playbooks, agentes)
- Agentes de criação e evolução
- Sistema de passaportes de criação
- Playbook Pipeline

---

## Formato de Versionamento

Seguimos [Semantic Versioning](https://semver.org/):

- **MAJOR** (X.0.0) - Mudanças incompatíveis com versões anteriores
- **MINOR** (0.X.0) - Novas funcionalidades compatíveis
- **PATCH** (0.0.X) - Correções de bugs compatíveis

---

## Categorias de Mudanças

- **Added** - Novas funcionalidades
- **Changed** - Mudanças em funcionalidades existentes
- **Deprecated** - Funcionalidades marcadas para remoção futura
- **Removed** - Funcionalidades removidas
- **Fixed** - Correções de bugs
- **Security** - Correções de vulnerabilidades
