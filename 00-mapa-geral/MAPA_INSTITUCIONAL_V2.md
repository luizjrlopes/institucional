# 📜 MAPA_INSTITUCIONAL

**Estatuto Normativo de Governança Arquitetural e Operacional**  
**Aplicações Next.js Fullstack**

- **Versão:** vJ-1.0
- **Natureza:** Documento Constitucional Vinculante
- **Status:** Autoridade Máxima
- **Aplicabilidade:** Obrigatória a todos os projetos, agentes (humanos ou automatizados) e artefatos derivados

---

## CLÁUSULA 1 — DA FINALIDADE

1.1. Este documento estabelece as regras constitutivas, normativas e vinculantes que regem:

- a criação,
- a modificação,
- a execução,
- a validação,
- a auditoria  
  de aplicações desenvolvidas sob este framework institucional.

  1.2. Este documento tem por finalidade eliminar:

- ambiguidade interpretativa,
- conflitos de autoridade documental,
- improvisação técnica,
- decisões não rastreáveis.

  1.3. Nenhum artefato técnico, documental ou operacional possui validade fora do escopo e das regras aqui estabelecidas.

---

## CLÁUSULA 2 — DA AUTORIDADE SUPREMA

2.1. O MAPA_INSTITUCIONAL constitui a autoridade máxima do sistema.

2.2. Em caso de conflito, divergência, omissão ou contradição entre documentos, prevalecerá sempre o disposto neste MAPA.

2.3. Nenhum outro documento pode:

- restringir,
- ampliar,
- reinterpretar  
  as regras aqui definidas.

---

## CLÁUSULA 3 — DA HIERARQUIA DE PRECEDÊNCIA DOCUMENTAL

A seguinte ordem hierárquica é obrigatória e inquestionável:

1. MAPA_INSTITUCIONAL
2. Dossiê Institucional — Regras de Criação
3. Dossiê Institucional — Backend
4. Dossiê Institucional — Frontend
5. Playbook do Criador
6. Playbook do Evolutor
7. FLUXO_ORQUESTRADOR
8. Passaporte da Aplicação
9. Referências do Produto (HTML, imagens, notas)

3.1. Documento hierarquicamente inferior não pode:

- invalidar,
- contradizer,
- reinterpretar  
  documento hierarquicamente superior.

---

## CLÁUSULA 4 — DA CLASSIFICAÇÃO OBRIGATÓRIA DOS DOCUMENTOS

### 4.1. Todo documento institucional DEVE pertencer a exatamente uma das categorias abaixo

### 4.2. Documentos não classificados são nulos de pleno direito

#### 4.2.1 Documentos Constitucionais

São documentos de autoridade normativa, não executáveis.

Incluem-se, obrigatoriamente:

- MAPA_INSTITUCIONAL
- Dossiê — Regras de Criação
- Dossiê — Backend
- Dossiê — Frontend

**Esses documentos:**

- não são gerados por projeto,
- não são modificáveis por agentes,
- não admitem interpretação extensiva.

### 4.2.2 Documentos Operacionais

São documentos que ordenam execução.

Incluem-se:

- PLAYBOOK_CRIADOR
- PLAYBOOK_EVOLUTOR
- FLUXO_ORQUESTRADOR

- O FLUXO_ORQUESTRADOR é o documento operacional normativo responsável por executar, em ordem obrigatória, as diretrizes estabelecidas por este MAPA, pelos Dossiês Institucionais e pelos Playbooks.
- O README não possui autoridade normativa; porém, sua leitura é obrigatória para compreensão do sistema institucional antes do início de qualquer execução do fluxo.

### 4.2.3 Documentos de Planejamento por Projeto

São documentos específicos de um produto.

Incluem-se:

- PASSAPORTE_DA_APLICACAO
- RELATORIO_VALIDACAO_PASSAPORTE

Nenhuma página, feature ou endpoint pode existir fora do Passaporte validado.

### 4.2.4 Documentos de Referência

São documentos não normativos.

Incluem-se:

- HTMLs
- Imagens
- notas.md

**Referências:**

- não criam obrigação técnica,
- não definem arquitetura,
- não autorizam execução.

### 4.2.5 Documentos de Histórico

São documentos de registro factual.

Incluem-se:

- auditorias.md
- changelog.md
- decisoes.md
- RASTREAMENTO_PROJETO.md

> **Nota:** RASTREAMENTO_PROJETO.md (quando existir) é considerado Documento de Histórico Institucional por projeto.

### 4.2.6 Artefatos de Persistência (Fase MOC)

São artefatos institucionais obrigatórios durante a fase MOC.

Incluem-se:

- MOCs persistidos em `data/` (um por domínio/entidade)

---

### CLÁUSULA 4.3 — DOS DOCUMENTOS DE HISTÓRICO INSTITUCIONAL

4.3.1. Os Documentos de Histórico Institucional constituem a memória formal, rastreável e não executável do sistema institucional.

4.3.2. Enquadram-se como Documentos de Histórico Institucional:

- `decisoes.md`
- `auditorias.md`
- `changelog.md`
- demais registros históricos formalmente reconhecidos.

  4.3.3. Os Documentos de Histórico possuem as seguintes finalidades exclusivas:

- registrar decisões estruturais ou normativas tomadas ao longo do tempo;
- registrar auditorias, desvios e violações institucionais;
- registrar a evolução histórica do framework institucional.

  4.3.4. Os Documentos de Histórico:

- NÃO possuem autoridade normativa própria;
- NÃO alteram regras vigentes;
- NÃO substituem a atualização dos documentos constitucionais ou operacionais.

  4.3.5. Nenhum agente, humano ou automatizado, pode utilizar Documentos de Histórico como base para inferir, executar ou justificar ações fora das regras vigentes.

  4.3.6. A pasta `06-historico/`:

- NÃO participa de nenhuma etapa do FLUXO_ORQUESTRADOR;
- NÃO pode ser consultada durante execução operacional;
- NÃO pode ser modificada automaticamente por agentes.

  4.3.7. Qualquer decisão registrada em Documentos de Histórico somente adquire validade institucional se:

- refletida nos documentos normativos correspondentes; ou
- expressamente incorporada por atualização formal deste MAPA.

  4.3.8. A alteração, remoção ou reescrita de Documentos de Histórico é vedada, exceto para correção factual explícita, devendo toda modificação ser registrada no `changelog.md`.

---

## CLÁUSULA 5 — DA EXISTÊNCIA DE ARTEFATOS

5.1. Todo artefato técnico ou documental DEVE estar classificado neste MAPA.

5.2. Artefato não classificado:

- não pode ser criado,
- não pode ser utilizado,
- não pode ser automatizado,
- não possui validade institucional.

---

## CLÁUSULA 6 — DO USO DE MOCs E PROIBIÇÃO DE "mock/data"

6.1. Fica expressamente PROIBIDO o uso do termo, referência ou pasta denominada `mock/data` no âmbito institucional.

6.2. Definição normativa: todo MOC institucional DEVE residir exclusivamente na pasta raiz `data/` do projeto. Referir-se a artefatos de dados simulados como "MOC em /data" é a forma normativa obrigatória.

6.3. Condições obrigatórias para MOCs:

- contratos não podem mudar,
- DTOs e tipos devem ser idênticos aos definitivos,
- services e controllers permanecem inalterados.

  6.4. A migração para banco definitivo ocorre somente por substituição do adapter de repositório (DataRepository → MongoRepository) conforme Cláusula 10.

  6.5. É PROIBIDO:

- lógica específica para MOC que não exista em produção,
- alteração de contratos na migração,
- acoplamento da UI à persistência.

  6.6. Violação desta cláusula invalida a execução da etapa e constitui descumprimento institucional grave.

---

## CLÁUSULA 7 — DOS AGENTES INSTITUCIONAIS

7.1. Cada agente possui escopo estritamente definido.

| Agente                  | Escopo              |
| ----------------------- | ------------------- |
| Autoridade              | MAPA_INSTITUCIONAL  |
| Criador                 | Código base         |
| Gerador de Passaporte   | Planejamento        |
| Validador de Passaporte | Conformidade        |
| Evolutor                | Execução autorizada |
| Auditor                 | Verificação         |
| Refatorador             | Correção            |
| Orquestrador            | Coordenação         |

7.2. Nenhum agente pode:

- acumular funções,
- decidir fora de seu escopo,
- ignorar documento superior.

---

## CLÁUSULA 8 — DOS GUARDRAILS (PROIBIÇÕES ABSOLUTAS)

É expressamente proibido:

- criar feature sem Passaporte,
- executar sem Playbook,
- inferir regra a partir de referência,
- mover lógica para camada indevida,
- executar ação fora do fluxo oficial.

Violação implica bloqueio imediato da execução.

---

## CLÁUSULA 9 — DA REFERÊNCIA FORMAL

9.1. Toda aplicação de regra DEVE citar a cláusula correspondente.

9.2. É vedada a aplicação de regras por:

- inferência,
- “entendimento implícito”,
- interpretação subjetiva.

---

## CLÁUSULA 10 — DO MODELO DE PERSISTÊNCIA POR FASE (MOC → PRODUÇÃO)

### CLÁUSULA 10.1 — DEFINIÇÃO DE MOC (Modelo Operacional de Conteúdo)

10.1.1. Para fins deste framework, define-se MOC (Modelo Operacional de Conteúdo) como:

> **Conjunto de dados estruturados, persistidos localmente em arquivos sob a pasta `data/`, utilizados como fonte oficial de verdade durante a fase de construção da aplicação, simulando comportamento de produção sem uso de banco de dados externo.**

10.1.2. O MOC possui caráter:

- institucional,
- obrigatório,
- normativo durante sua fase de vigência.

---

### CLÁUSULA 10.2 — OBRIGATORIEDADE DE MOC POR FEATURE/PÁGINA

10.2.1. Toda página, feature ou domínio funcional criado no sistema DEVE possuir um MOC inicial correspondente, persistido na pasta `data/`.

10.2.2. O MOC é criado pelo agente Evolutor durante a implementação da página, sendo obrigatório que exista ao final da execução da página, e sempre antes de qualquer integração com banco externo. O Evolutor só pode criar ou alterar MOCs relacionados às páginas que está implementando.

10.2.3. Nenhuma página é considerada:

- criada,
- funcional,
- válida  
  sem a existência de seu MOC inicial.

---

### CLÁUSULA 10.3 — ORGANIZAÇÃO OBRIGATÓRIA DOS MOCs

10.3.1. Os MOCs DEVEM ser organizados sob a pasta `data/`, respeitando domínios e entidades, e não exclusivamente telas.

10.3.2. É PERMITIDO que um MOC seja consumido por múltiplas páginas.

10.3.3. É PROIBIDO:

- duplicar a mesma entidade em múltiplos MOCs não sincronizados,
- criar MOCs inconsistentes para a mesma fonte de verdade.

**Exemplo válido:**

```text
data/
 └── usuarios/
    └── usuarios.json
```

**Exemplo inválido:**

```text
data/
 ├── paginaA/usuarios.json
 └── paginaB/usuarios.json
```

---

### CLÁUSULA 10.4 — FASE MOC (FASE DE CONSTRUÇÃO OBRIGATÓRIA)

#### 10.4.1. Durante a fase de construção da aplicação, a persistência de dados DEVE ocorrer exclusivamente via MOCs

#### 10.4.2. Nesta fase

- o banco de dados definitivo NÃO É obrigatório,
- o Mongo Atlas NÃO DEVE ser utilizado como fonte primária,
- o sistema DEVE funcionar integralmente usando MOCs.

  10.4.3. O backend DEVE utilizar um Repository Adapter apontando para `data/` como fonte de verdade.

  10.4.4. A UI:

- NÃO pode acessar `data/` diretamente,
- DEVE consumir dados exclusivamente via services.

  10.4.5. **A fase MOC é considerada concluída quando todas as páginas do Passaporte estão implementadas e validadas funcionalmente em modo MOC, e o usuário informar que não acrescentará novas páginas.**

---

### CLÁUSULA 10.5 — CONTRATOS E IMUTABILIDADE

10.5.1. Os contratos de dados (DTOs, tipos, schemas lógicos):

- DEVEM ser definidos já na fase MOC,
- DEVEM ser idênticos aos contratos da fase de produção.

  10.5.2. É EXPRESSAMENTE PROIBIDO:

- alterar contratos ao migrar para o banco definitivo,
- criar DTOs "temporários" para MOC,
- adaptar a UI para distinguir MOC de banco real.

  10.5.3. A persistência é uma implementação intercambiável; o contrato é definitivo desde o MOC.

---

### CLÁUSULA 10.6 — SINALIZAÇÃO EXPLÍCITA DE MIGRAÇÃO

10.6.1. A migração de MOC para banco definitivo NÃO ocorre automaticamente.

10.6.2. A migração só pode ocorrer mediante sinalização explícita do usuário, por meio de:

- flag de configuração,
- comando manual,
- decisão registrada no histórico institucional.

  10.6.3. Sem sinalização explícita, a aplicação DEVE permanecer operando em modo MOC, independentemente de estar funcional.

---

### CLÁUSULA 10.7 — PROCESSO FORMAL DE MIGRAÇÃO PARA PRODUÇÃO

10.7.1. A migração para produção DEVE ocorrer em duas etapas obrigatórias e sequenciais:

#### Etapa 1 — Importação de Dados

- Transferência integral dos dados existentes nos MOCs para o banco definitivo (Mongo Atlas),
- Preservando contratos, IDs lógicos e relações.

#### Etapa 2 — Troca de Adapter

- Substituição do adapter de repositório:

  - de `DataRepository`
  - para `MongoRepository`.

    10.7.2. É PROIBIDO:

- modificar services,
- modificar controllers,
- modificar UI,
- modificar contratos durante a migração.

---

### CLÁUSULA 10.8 — PÓS-MIGRAÇÃO

10.8.1. Após migração:

- os MOCs NÃO são removidos,
- passam a ter função de:

  - seed,
  - backup,
  - debug,
  - referência histórica.

    10.8.2. O Mongo Atlas torna-se a única fonte primária de persistência.

---

### CLÁUSULA 10.9 — PROIBIÇÕES ABSOLUTAS

É EXPRESSAMENTE PROIBIDO:

- iniciar uma página sem MOC,
- acessar `data/` diretamente na UI,
- criar lógica condicional baseada em "modo MOC" na UI,
- alterar contratos durante migração,
- misturar persistência MOC e banco real simultaneamente como fontes primárias.

#### Violação implica

- bloqueio imediato da execução,
- invalidação da etapa,
- retorno à fase anterior.

---

### CLÁUSULA 10.10 — REGRA FINAL DE VALIDADE

10.10.1. Enquanto a aplicação estiver em fase MOC:  
o MOC é a fonte oficial de verdade.

10.10.2. Após migração validada:  
o banco definitivo é a fonte oficial de verdade.

10.10.3. Não existe fase híbrida.

---

## 📌 PRINCÍPIO FINAL DE VALIDADE INSTITUCIONAL

> Persistência não é um detalhe técnico;  
> é uma decisão institucional por fase.
>
> Nada é produzido fora dessas regras.  
> Nada migra sem sinalização explícita.

---

## CLÁUSULA 11 — DISPOSIÇÃO FINAL

11.1. Este documento entra em vigor imediatamente.

11.2. Nenhuma etapa começa fora dele.  
11.3. Nenhuma exceção é válida sem alteração formal deste MAPA.

Se algo não estiver escrito aqui, não existe institucionalmente.
