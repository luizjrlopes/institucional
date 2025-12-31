# PLAYBOOK_EVOLUTOR.md

Criação de Páginas e Features — Execução Guiada por Passaporte

Versão: v1.0 — Playbook Institucional

## 1. Objetivo

Este playbook define **como executar a implementação de páginas e features**
em um projeto Next.js Fullstack **após** a fase de bootstrap inicial.

Ele **não define o que construir** — isso é responsabilidade do
**Passaporte da Aplicação**.

O Evolutor apenas **executa fielmente** o plano aprovado.
O Evolutor **NÃO** faz ajustes visuais — isso é do F-Designer.

**A execução deste agente nunca encerra a entrega.**

Cada página/feature só é considerada concluída após execução obrigatória do pipeline institucional:

Evolutor → F-Designer → Auditor → Refatorador (se necessário) → F-Designer → Auditor

---

## 2. Pré-condições Obrigatórias

O Evolutor **só pode iniciar** se:

- Estrutura base estiver concluída
- Autenticação estiver funcional
- Home vazia protegida existir
- `features/` existir
- PASSAPORTE_DA_APLICACAO.md existir
- Passaporte estiver **validado**
- Durante a Fase MOC, os MOCs DEVEM residir em `data/` e o Evolutor utiliza o adapter DataRepository correspondente. É proibido referir ou criar `mock/data`.

Se qualquer item falhar, **bloquear execução**.

### 2.1 Dependências e compatibilidade (obrigatório)

**Regra institucional:** garantir que as dependências listadas em `package.json` estejam travadas e compatíveis entre si.

- Manter o lockfile (`package-lock.json` / `pnpm-lock.yaml` / `yarn.lock`) no repositório.
- Usar `npm ci`/equivalente no CI para instalações reprodutíveis.
- Preferir versões estáveis e testadas; evitar misturar majors incompatíveis.
- Após atualizar dependências, executar build e testes locais/CI antes de avançar.
- Documentar exceções ou upgrades críticos no Passaporte ou changelog.

---

### Observação: Responsabilidade sobre Referências

- A análise e consolidação das referências visuais (HTML, imagens, notas.md) é atribuição exclusiva do **Agente Gerador de Passaporte**.

- O Playbook do Evolutor assume que o `PASSAPORTE_DA_APLICACAO.md` já contém todas as informações necessárias. O Evolutor não deve realizar análises de referência para alterar o Passaporte; qualquer dúvida deve ser direcionada ao Gerador.

---

## 3. Unidade de Trabalho

A unidade mínima de trabalho é:

> **UMA PÁGINA FECHADA**

Nenhuma página pode ser deixada “pela metade”.

---

## 4. Etapas de Execução por Página

### ETAPA E0 — Verificação no Passaporte (OBRIGATÓRIA)

#### ⛔ REGRA CRÍTICA: TODA PÁGINA DEVE EXISTIR NO PASSAPORTE ANTES DA CRIAÇÃO\*\*

Antes de iniciar qualquer trabalho:

1. Abrir `PASSAPORTE_DA_APLICACAO.md`
2. Localizar a página solicitada
3. Confirmar que existe entrada completa com todos os campos obrigatórios

**Se a página NÃO estiver no Passaporte:**

- **PARAR IMEDIATAMENTE**
- Informar ao usuário que a página precisa ser adicionada ao Passaporte primeiro
- Aguardar atualização do Passaporte + validação
- Não criar nenhum arquivo

**Se a página ESTIVER no Passaporte:**

- Prosseguir para ETAPA E1

**Observação sobre Evolução do Passaporte:**

O Passaporte não é imutável. Ele pode ser atualizado para incluir novas páginas. Mas o fluxo deve ser:

1. Usuário solicita nova página
2. Se não está no Passaporte → Atualizar Passaporte (Gerador de Passaporte ou edição manual)
3. Validar Passaporte (Agente Validador)
4. Executar Evolutor com página agora aprovada

---

### ETAPA E1 — Leitura do Passaporte

Para a página atual (já confirmada no Passaporte):

- Ler objetivo
- Ler rota
- Ler ações do usuário
- Ler estados obrigatórios
- Ler contratos técnicos

Nenhuma decisão nova pode ser tomada.

---

### ETAPA E2 — Criação da Rota

Criar:

- `app/<rota>/page.tsx`
- `[id]/page.tsx` se dinâmico

A rota deve renderizar mesmo sem dados.

---

### ETAPA E3 — Estrutura da Feature

Criar:

- `features/<dominio>/components`
- `features/<dominio>/hooks`
- `features/<dominio>/types`

Componentes shared **não são criados aqui**, apenas reutilizados.

---

### ETAPA E4 — Backend da Página (se aplicável)

Criar:

- model
- repository
- service
- controller
- routes (`app/api/**/route.ts`)

Regras:

- Nenhuma query em `route.ts`
- Nenhuma regra de negócio fora de `service`

---

### ETAPA E5 — UI Final

Implementar UI completa:

- loading
- vazio
- erro
- sucesso

Sempre via `services`, nunca `fetch` direto.

---

### ETAPA E6 — Validação da Página

Uma página só é considerada pronta se:

- Rota funciona
- UI completa
- Backend responde (se existir)
- Nenhuma violação institucional

---

## 5. Regras de Bloqueio

- Proibido criar página sem Passaporte
- Proibido adaptar HTML fora do plano
- Proibido criar domínio novo sem previsão
- Proibido misturar shared e feature

---

## 6. Saída Esperada

Ao final de cada página:

- Página funcional
- Código organizado
- Pronta para auditoria

### Observação (Fase 3 — Fase MOC)

- Enquanto durar a Fase MOC, usar o adapter de repositório que consome MOCs em `data/` como backend. É proibido referir ou criar `mock/data`.
- Quando a aplicação completa estiver funcional com MOCs em `data/`, trocar apenas o adapter para Mongo Atlas, mantendo os mesmos contratos/DTOs e services/UI inalterados.

---

## 7. Regra Final

> O Evolutor executa.  
> O Passaporte decide.
