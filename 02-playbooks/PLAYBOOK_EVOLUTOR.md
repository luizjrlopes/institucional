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
- Se a macro fase 2 estiver em andamento, usar o adapter de repositório mock/data até a migração final para Mongo Atlas.

Se qualquer item falhar, **bloquear execução**.

---

## 2.1 ETAPA PRE-0 — Análise de Referências do Produto (ANTES do Passaporte)

Antes de gerar o Passaporte, o **Gerador de Passaporte** deve analisar as referências do produto:

**Localização:** `05-referencias/05b-exemplos-etapa-mock/`

**Conteúdo esperado:**

- `html/` — Exemplos de layouts e estruturas visuais
- `imagens/` — Mockups, wireframes, designs
- `notas.md` — Especificações, requisitos, descrições de funcionalidades

**Processo de Análise:**

1. **Inventariar Referências**

   - Listar todos os HTMLs disponíveis
   - Listar todas as imagens disponíveis
   - Ler notas.md completo

2. **Identificar Páginas**

   - Cada HTML geralmente representa uma página ou seção
   - Imagens podem mostrar múltiplas páginas ou estados da mesma página
   - Notas podem especificar páginas adicionais não visualizadas

3. **Extrair Funcionalidades**

   - Para cada página identificada, mapear:
     - Ações do usuário (botões, formulários, filtros)
     - Dados exibidos (listas, cards, detalhes)
     - Navegação (links, menus, breadcrumbs)
     - Estados especiais (loading, erro, vazio)

4. **Definir Domínios**

   - Agrupar páginas relacionadas em domínios lógicos
   - Ex: páginas de cursos → domínio `courses`
   - Ex: páginas de perfil → domínio `profile`

5. **Mapear Contratos Técnicos**
   - Para cada funcionalidade, definir:
     - Endpoints da API necessários
     - Modelos de dados
     - Estados globais (se necessário)

**Resultado:** Lista completa de páginas a serem incluídas no Passaporte.

**⚠️ Regra Crítica:**  
Se não houver referências suficientes para definir uma página, **não invente**. Solicite ao usuário mais informações ou referências adicionais.

---

## 3. Unidade de Trabalho

A unidade mínima de trabalho é:

> **UMA PÁGINA FECHADA**

Nenhuma página pode ser deixada “pela metade”.

---

## 4. Etapas de Execução por Página

### ETAPA E0 — Verificação no Passaporte (OBRIGATÓRIA)

**⛔ REGRA CRÍTICA: TODA PÁGINA DEVE EXISTIR NO PASSAPORTE ANTES DA CRIAÇÃO**

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

### Observação (Macro Fase 2 — dados simulados)

- Enquanto durar a fase de dados simulados, usar o adapter de repositório mock/data como backend.
- Quando a aplicação completa estiver funcional, trocar apenas o adapter para Mongo Atlas, mantendo os mesmos contratos/DTOs e services/UI inalterados.

---

## 7. Regra Final

> O Evolutor executa.  
> O Passaporte decide.
