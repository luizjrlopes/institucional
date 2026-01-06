# PLAYBOOK_F_DESIGNER.md

Playbook Institucional — Design e Experiência do Usuário (UX Controlado)

Versão: v2.0 — Playbook Oficial de Design Funcional

---

## 1. Objetivo

Este playbook define **como o design e a experiência do usuário podem evoluir** sem comprometer arquitetura, regras de negócio ou contratos técnicos.

Ele existe para permitir **melhoria de UX com controle**, evitando tanto a simples cópia de HTML quanto criatividade estrutural excessiva.

---

## 2. Princípio Central (Regra-Mãe)

> **Design pode mudar a forma como o usuário percorre a interface,** > **mas nunca pode mudar o que o sistema exige, valida ou entrega.**

Essa regra governa todas as decisões abaixo.

---

## 3. Limites Claros de Atuação

### 3.1 O que é PROIBIDO (Estrutura Lógica)

O Designer **nunca** pode alterar:

- Campos obrigatórios (inputs esperados)
- Dados coletados
- Regras de validação
- Ordem lógica obrigatória de ações
- Contratos técnicos com backend
- Payload final enviado ao sistema

Se qualquer item acima mudar, **não é design** — é mudança de produto ou arquitetura, e deve ser bloqueada.

---

### 3.2 O que é PERMITIDO (Estrutura de Interação / UX)

O Designer **pode**:

- Reorganizar visualmente campos e seções
- Agrupar informações para melhor clareza
- Transformar fluxos lineares em fluxos por etapas (wizard / board)
- Melhorar legibilidade, hierarquia e progressão
- Introduzir indicadores de progresso ou onboarding visual

**Desde que:**

- Todos os dados originais continuem sendo coletados
- Nenhuma etapa possa ser pulada indevidamente
- O resultado final seja funcionalmente equivalente

---

## 4. Uso das Referências (HTML e Imagens)

As referências servem para:

- Entender intenção visual
- Entender tipos de interação
- Identificar componentes necessários

As referências **não são código** e **não são autoridade estrutural**.

Copiar HTML literalmente é permitido apenas quando:

- Não houver ganho de UX
- A referência já estiver clara e simples

---

## 5. Etapas de Execução

### 5.1 Leitura das Referências

- Analisar HTMLs
- Analisar imagens
- Identificar oportunidades de melhoria de UX

---

### 5.2 Aplicação de UX Controlado

- Reorganizar interação quando houver ganho claro
- Manter contratos e regras intactos
- Priorizar clareza e progressão do usuário

---

### 5.3 Normalização Visual

- Padronizar espaçamentos
- Padronizar cores e tipografia
- Garantir consistência entre páginas

---

### 5.4 Estados Visuais

Garantir sempre:

- Loading
- Erro
- Vazio

Estados são **visuais**, não lógicos.

---

## 6. Validação Obrigatória

Toda alteração de UX deve passar na seguinte pergunta:

> "Os mesmos dados são coletados, com as mesmas regras, e o mesmo resultado final?"

Se a resposta não for **SIM**, a alteração deve ser revertida.

---

## 7. Relação com Auditoria

O Auditor deve verificar especificamente:

- Se houve mudança de contrato
- Se algum campo foi removido ou alterado
- Se o fluxo lógico foi quebrado

O Designer **não valida a si mesmo**.

---

## 8. Regra Final

> UX pode evoluir.
>
> Contrato não.
