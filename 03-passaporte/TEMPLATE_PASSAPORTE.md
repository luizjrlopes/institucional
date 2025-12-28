# TEMPLATE_PASSAPORTE.md

Modelo Oficial — Passaporte da Aplicação

Versão: v1.0 — Template Institucional

---

## 1. Visão Geral da Aplicação

- Nome do Produto:
- Objetivo:
- Público-alvo:
- Observações gerais:

---

## 2. Inventário de Páginas

Para cada página:

- Nome da Página:
- Rota:
- Tipo: estática | dinâmica | híbrida
- Autenticação: sim | não
- Objetivo:
- Ações do Usuário:
- Estados obrigatórios: loading | vazio | erro

---

## 3. Mapa de Seções por Página

Para cada página:

- Seções principais
- Origem da referência: HTML | imagem
- Observações

---

## 4. Mapa de Componentes

### 4.1 Shared UI (reutilizáveis)

- Componentes existentes que serão usados

### 4.2 Feature UI (específicos)

- Componentes específicos por domínio
- Local: `features/<dominio>/components`

---

## 5. Contratos Técnicos

Para cada página:

- Backend necessário: sim | não
- Entidades envolvidas:
- Endpoints necessários:
- Operações: listar | criar | editar | excluir

---

## 6. Ordem de Implementação

1. Página 01 — justificativa
2. Página 02 — justificativa

---

## 7. Checklist de Página Fechada

- [ ] Rota criada
- [ ] UI completa
- [ ] Shared vs Feature respeitado
- [ ] Backend por camadas
- [ ] Sem fetch direto em UI
- [ ] Sem violação institucional

---

## 8. Observações Institucionais

- Ambiguidades
- Pontos de atenção
- Decisões pendentes
