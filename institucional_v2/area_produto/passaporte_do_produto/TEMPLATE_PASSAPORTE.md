# TEMPLATE_PASSAPORTE.md

Modelo Oficial — Passaporte da Aplicação

**Versão:** v2.0 — Template Institucional Refinado

---

## 0. Princípio do Passaporte (Leitura Obrigatória)

O Passaporte da Aplicação é um **documento de planejamento executivo**.

Ele existe para:

- transformar referências (HTML, imagens, notas) em **plano de execução**
- eliminar improviso durante a implementação
- permitir validação antes de qualquer código de produto

O Passaporte **não contém código**, **não decide arquitetura** e **não executa tarefas**.

---

## 1. Identidade da Aplicação

- **Nome do Produto:**
- **Descrição resumida:** (1–2 frases)
- **Objetivo principal:**
- **Público-alvo:**
- **Contexto de uso:** interno | público | misto
- **Observações institucionais iniciais:**

---

## 2. Escopo Declarado

### 2.1 O que faz parte do produto

- Funcionalidades incluídas explicitamente

### 2.2 O que **não** faz parte do produto

- Funcionalidades fora de escopo

> Tudo que não estiver explicitado aqui é considerado **fora do escopo**.

---

## 3. Inventário de Páginas (Autoridade Central)

Para **cada página**, preencher obrigatoriamente:

- **Nome da Página:**
- **Rota:**
- **Tipo:** estática | dinâmica | híbrida
- **Requer autenticação:** sim | não
- **Objetivo da Página:**
- **Ações do Usuário:**
- **Estados obrigatórios:** loading | vazio | erro
- **Prioridade:** alta | média | baixa

---

## 4. Detalhamento de Página (Repetir para cada página)

### 4.X Página: < Nome >

#### 4.X.1 Referências

- Origem: HTML | imagem | mista
- Arquivos utilizados:

> Referências são **inspiração**, não fonte de código literal.

---

#### 4.X.2 Seções da Página

- Seção 01 — objetivo
- Seção 02 — objetivo

---

#### 4.X.3 Componentes Envolvidos

**Shared UI (reutilizáveis):**

- Componentes existentes
- Novos componentes (se necessário)

**Feature UI (específicos):**

- Componentes exclusivos da página
- Local: `features/<dominio>/components`

---

#### 4.X.4 Comportamento e Estados

- Estado inicial
- Estado de loading
- Estado vazio
- Estado de erro

---

#### 4.X.5 Backend Associado

- Backend necessário: sim | não

Se sim:

- Entidades envolvidas:
- Operações: listar | criar | editar | excluir
- Endpoints esperados:

---

## 5. Mapa Global de Componentes

### 5.1 Shared UI (Reutilização Global)

- Lista de componentes compartilhados

### 5.2 Feature UI (Por Domínio)

- Domínio → componentes específicos

---

## 6. Contratos Técnicos Consolidados

- Entidades principais do sistema
- Relacionamentos relevantes
- Dependências externas (se houver)

---

## 7. Ordem Oficial de Implementação

Definir a **ordem obrigatória**, com justificativa:

1. Página 01 — justificativa
2. Página 02 — justificativa
3. Página 03 — justificativa

---

## 8. Checklist de Página Fechada (Critério de Aceite)

Uma página só é considerada concluída se **TODOS** os itens estiverem marcados:

- [ ] Rota criada
- [ ] UI completa
- [ ] Estados implementados
- [ ] Shared vs Feature respeitado
- [ ] Backend por camadas (se aplicável)
- [ ] Sem fetch direto em UI
- [ ] Passou pelo PLAYBOOK_PIPELINE
- [ ] Sem violação institucional

---

## 9. Riscos, Ambiguidades e Decisões Pendentes

- Pontos ambíguos identificados
- Decisões que exigem validação humana

---

## 10. Aprovação do Passaporte

- Status: rascunho | validado | bloqueado
- Responsável pela validação:
- Observações finais:

---

## Regra Final

> Nenhuma página pode ser implementada sem estar descrita neste Passaporte.
