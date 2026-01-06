# PLAYBOOK_EVOLUTOR.md

Playbook Institucional — Execução de Páginas e Features

Versão: v2.0 — Playbook Oficial do Executor

---

## 1. Objetivo

Este playbook define o processo de **execução controlada de páginas e features** após a criação da base do projeto.

Ele é responsável por **transformar o planejamento (Passaporte)** em código funcional, **uma página por vez**.

Este playbook **não cria estrutura base**, **não decide escopo** e **não improvisa funcionalidades**.

---

## 2. Momento de Execução

Este playbook só pode ser executado quando:

- PLAYBOOK_CRIADOR foi concluído
- PLAYBOOK_PIPELINE foi executado com sucesso
- PASSAPORTE_DA_APLICACAO.md existe
- Passaporte está validado

Caso qualquer condição falhe, a execução deve ser bloqueada.

---

## 3. Entrada Obrigatória

- [PASSAPORTE_DA_APLICACAO.md](../../03-passaporte/PASSAPORTE_DA_APLICACAO.md)
- [DOSSIE_REGRAS_DE_CRIACAO.md](../../01-identidades/estrutura_base/001_next_fullstack_mongo/DOSSIE_REGRAS_DE_CRIACAO.md)
- [DOSSIE_NEXT_FRONTEND.md](../../01-identidades/estrutura_base/001_next_fullstack_mongo/DOSSIE_NEXT_FRONTEND.md)
- [DOSSIE_NEXT_BACKEND.md](../../01-identidades/estrutura_base/001_next_fullstack_mongo/DOSSIE_NEXT_BACKEND.md)
- [PASSAPORTE_DA_APLICACAO.md](../../03-passaporte/PASSAPORTE_DA_APLICACAO.md)
- [DOSSIE_REGRAS_DE_CRIACAO.md](../../01-identidades/estrutura_base/001_next_fullstack_mongo/DOSSIE_REGRAS_DE_CRIACAO.md)
- [DOSSIE_NEXT_FRONTEND.md](../../01-identidades/estrutura_base/001_next_fullstack_mongo/DOSSIE_NEXT_FRONTEND.md)
- [DOSSIE_NEXT_BACKEND.md](../../01-identidades/estrutura_base/001_next_fullstack_mongo/DOSSIE_NEXT_BACKEND.md)

---

## 4. Unidade de Trabalho

A unidade mínima de trabalho do Evolutor é:

> **UMA PÁGINA FECHADA**

Nenhuma página pode ser parcialmente implementada.

---

## 5. Etapas de Execução por Página

### 5.1 Etapa E1 — Leitura do Passaporte

Ações obrigatórias:

- Ler definição da página
- Ler rota
- Ler objetivo
- Ler ações do usuário
- Ler estados obrigatórios

Nenhuma decisão nova pode ser tomada.

---

### 5.2 Etapa E2 — Criação da Rota

Ações obrigatórias:

- Criar `app/<rota>/page.tsx`
- Criar rota dinâmica se aplicável (`[id]`)

Resultado esperado:

- Página renderizando

---

### 5.3 Etapa E3 — Estrutura da Feature

Ações obrigatórias:

- Criar `features/<dominio>/components`
- Criar `features/<dominio>/hooks`
- Criar `features/<dominio>/types`

Regra:

- Componentes shared não são criados aqui

---

### 5.4 Etapa E4 — Backend da Página (se aplicável)

Ações obrigatórias:

- Criar model
- Criar repository
- Criar service
- Criar controller
- Criar `app/api/**/route.ts`

Regra:

- Nenhuma lógica em `route.ts`

---

### 5.5 Etapa E5 — Implementação da UI

Ações obrigatórias:

- Implementar UI completa
- Usar services para comunicação
- Implementar estados:

  - loading
  - erro
  - vazio

Regra:

- Proibido fetch direto em componentes

---

### 5.6 Etapa E6 — Validação da Página

Checklist obrigatório:

- [ ] Rota funciona
- [ ] UI completa
- [ ] Estados implementados
- [ ] Backend funcional (se houver)
- [ ] Nenhuma violação institucional

---

## 6. Encerramento da Página

Após página fechada:

- Não iniciar próxima página
- Acionar obrigatoriamente o PLAYBOOK_PIPELINE

---

## 7. Regras de Proibição

- Proibido criar páginas fora do Passaporte
- Proibido alterar escopo
- Proibido pular pipeline

---

## 8. Regra Final

> O Evolutor executa o plano.
>
> O Passaporte governa.
