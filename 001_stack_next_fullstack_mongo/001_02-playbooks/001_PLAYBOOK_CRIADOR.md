# PLAYBOOK_CRIADOR.md

Playbook Institucional — Criação Inicial do Projeto

Versão: v2.0 — Playbook Oficial de Bootstrap

---

## 1. Objetivo

Este playbook define o **processo completo de criação inicial** de um projeto Next.js Fullstack.

Ele é responsável por **fazer o projeto nascer**, garantindo que:

- A estrutura base esteja correta
- A autenticação funcione
- As páginas institucionais existam
- O projeto compile e rode

Este playbook **não cria produto final**. Ele cria uma **base saudável e operacional**.

---

## 2. Momento de Execução

Este playbook deve ser executado **uma única vez por projeto**, logo no início.

Pré-condição:

- Projeto ainda não iniciado

Pós-condição:

- Projeto funcional, autenticável e auditável

---

## 3. Entradas Obrigatórias

- [MAPA_INSTITUCIONAL_CENTRAL.md](../../mapas_e_fluxos_centrais/MAPA_INSTITUCIONAL_CENTRAL.md)
- [FLUXO_ORQUESTRADOR_CENTRAL.md](../../mapas_e_fluxos_centrais/FLUXO_ORQUESTRADOR_CENTRAL.md)
- [MAPA_STACK_NEXT_FULLSTACK_MONGO.md](../001_00-mapas_e_fluxos/001_MAPA_STACK_NEXT_FULLSTACK_MONGO.md)
- [DOSSIE_REGRAS_DE_CRIACAO.md](../001_01-identidades_estrutura/001_DOSSIE_REGRAS_DE_CRIACAO.md)
- [DOSSIE_NEXT_FRONTEND.md](../001_01-identidades_estrutura/001_DOSSIE_NEXT_FRONTEND.md)
- [DOSSIE_NEXT_BACKEND.md](../001_01-identidades_estrutura/001_DOSSIE_NEXT_BACKEND.md)
- Snippets Institucionais (../001_05-referencias-etapa-criacao-estrutura/snippets/)
- Referências Visuais (../001_05-referencias-etapa-criacao-estrutura/referencias-visuais/)

---

## 4. Etapas de Execução

### 4.1 Etapa C1 — Criação da Estrutura Base

Ações obrigatórias:

- Criar estrutura Next.js (App Router)
- Configurar frontend e backend integrados
- Configurar ambiente e variáveis
- Criar estrutura de pastas conforme dossiês

Resultado esperado:

- Projeto inicial compilável

---

### 4.2 Etapa C2 — Infraestrutura Institucional

Ações obrigatórias:

- Implementar Context e Provider
- Configurar cliente de API
- Implementar middleware base
- Criar componentes shared obrigatórios:

  - Loading
  - Modals
  - Header
  - Footer (se aplicável)

Fontes permitidas:

- Snippets institucionais

---

### 4.3 Etapa C3 — Autenticação e Usuário

Ações obrigatórias:

- Criar páginas:

  - login
  - cadastro
  - resetar senha

- Implementar fluxo de sessão
- Proteger rota de home vazia

Resultado esperado:

- Login funcional
- Navegação autenticada válida

---

### 4.4 Etapa C4 — Análise das Referências

Ações obrigatórias:

- Ler HTMLs do produto
- Ler imagens de referência
- Inferir:

  - páginas existentes
  - componentes necessários
  - funcionalidades esperadas

Regra:

- Não criar lógica de produto definitiva

---

### 4.5 Etapa C5 — Criação do Esqueleto das Páginas

Ações obrigatórias:

- Criar rotas das páginas inferidas
- Criar pastas de features
- Criar componentes base das páginas
- Garantir que todas renderizem

Regra:

- Sem lógica profunda
- Sem backend específico

---

### 4.6 Etapa C6 — Aplicação Inicial de Design

Ações obrigatórias:

- Ajustar layout conforme referências
- Aplicar hierarquia visual
- Garantir estados visuais básicos

Regra:

- Não otimizar design
- Apenas alinhar estrutura visual

---

### 4.7 Etapa C7 — Validação Técnica Inicial

Ações obrigatórias:

- Rodar `npm run build`
- Corrigir erros de compilação
- Substituir dependências proibidas por mock

Resultado esperado:

- Build funcional

---

### 4.8 Etapa C8 — Encerramento e Handoff

Ações obrigatórias:

- Finalizar criação
- Não iniciar auditoria manual
- Acionar obrigatoriamente o PLAYBOOK_PIPELINE

Regra explícita:

> O PLAYBOOK_CRIADOR nunca encerra o processo sozinho.

---

## 5. Saída Esperada

Ao final deste playbook:

- Projeto inicial funcional
- Autenticação ativa
- Estrutura clara
- Pronto para pipeline institucional

---

## 6. Regras de Proibição

- Proibido criar produto final
- Proibido pular etapas
- Proibido iniciar evolução de páginas

---

## 7. Regra Final

> Este playbook cria a base.
>
> O pipeline valida.
