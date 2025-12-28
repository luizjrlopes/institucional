# PLAYBOOK_EVOLUTOR.md

Criação de Páginas e Features — Execução Guiada por Passaporte

Versão: v1.0 — Playbook Institucional

## 1. Objetivo

Este playbook define **como executar a implementação de páginas e features**
em um projeto Next.js Fullstack **após** a fase de bootstrap inicial.

Ele **não define o que construir** — isso é responsabilidade do
**Passaporte da Aplicação**.

O Evolutor apenas **executa fielmente** o plano aprovado.

---

## 2. Pré-condições Obrigatórias

O Evolutor **só pode iniciar** se:

- Estrutura base estiver concluída
- Autenticação estiver funcional
- Home vazia protegida existir
- `features/` existir
- PASSAPORTE_DA_APLICACAO.md existir
- Passaporte estiver **validado**

Se qualquer item falhar, **bloquear execução**.

---

## 3. Unidade de Trabalho

A unidade mínima de trabalho é:

> **UMA PÁGINA FECHADA**

Nenhuma página pode ser deixada “pela metade”.

---

## 4. Etapas de Execução por Página

### ETAPA E1 — Leitura do Passaporte

Para a página atual:

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

---

## 7. Regra Final

> O Evolutor executa.  
> O Passaporte decide.
