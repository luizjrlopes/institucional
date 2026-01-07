# PLAYBOOK_PIPELINE.md

Pipeline Institucional de Pós-Processamento — Stack 002

Versão: v1.0 — Playbook Obrigatório

**Stack:** 002_next_front_node_back_mongo

---

## 1. Objetivo

Este playbook define o **pipeline institucional obrigatório** para projetos com arquitetura separada (frontend Next.js + backend Node.js).

Ele garante que **nenhuma entrega técnica seja considerada válida** sem passar por:

1. Normalização visual
2. Auditoria técnica (ambos os projetos)
3. Refatoração corretiva (se necessário)
4. Registro histórico

Este pipeline é executado **sempre que um agente de execução entregar código**, seja:

- Agente Criador (Playbook Criador)
- Agente Evolutor (Playbook Evolutor)

---

## 2. Quando este pipeline é acionado

Este pipeline é acionado automaticamente quando:

- O PLAYBOOK_CRIADOR é concluído
- O PLAYBOOK_EVOLUTOR conclui uma página

> Nenhuma entrega encerra o processo sozinha.

---

## 3. Ordem Fixa de Execução

A ordem abaixo **não pode ser alterada**:

1. PLAYBOOK_F_DESIGNER
2. PLAYBOOK_AUDITOR
3. (Condicional) PLAYBOOK_REFATORADOR
4. PLAYBOOK_F_DESIGNER (reaplicação)
5. PLAYBOOK_AUDITOR (revalidação)
6. Registro em histórico

---

## 4. Etapas do Pipeline

### 4.1 Etapa P1 — Normalização Visual (F-DESIGNER)

Responsável:

- Agente F-Designer

Ações obrigatórias:

- Revisar layout e hierarquia visual do **FRONTEND**
- Ajustar espaçamentos, padrões e estados visuais
- Garantir consistência entre páginas
- Não alterar lógica de negócio
- Não mexer no backend

Saída esperada:

- Interface visual consistente no frontend

---

### 4.2 Etapa P2 — Auditoria Técnica

Responsável:

- Agente Auditor

Ações obrigatórias:

**FRONTEND:**

- Verificar conformidade com dossiê frontend
- Verificar separação entre componentes shared e feature
- Verificar uso correto do apiClient
- Rodar `npm run build`

**BACKEND:**

- Verificar conformidade com dossiê backend
- Verificar separação de camadas (routes → controllers → services → repositories → models)
- Verificar validação de entrada
- Verificar tratamento de erros
- Compilar TypeScript

**INTEGRAÇÃO:**

- Verificar contratos entre frontend e backend
- Verificar CORS
- Verificar autenticação JWT

Classificação do resultado:

- APROVADO
- APROVADO COM RESSALVAS
- BLOQUEADO (exige decisão humana)

---

### 4.3 Etapa P3 — Refatoração (Condicional)

Responsável:

- Agente Refatorador

Executado somente se:

- Auditoria detectar violações corrigíveis

Ações permitidas:

**FRONTEND:**

- Reorganizar código
- Corrigir uso do apiClient
- Mover componentes entre shared e feature
- Corrigir imports

**BACKEND:**

- Reorganizar camadas
- Corrigir separação de responsabilidades
- Ajustar validações
- Melhorar tratamento de erros

Ações proibidas:

- Criar novas funcionalidades
- Alterar escopo definido no Passaporte
- Misturar código de frontend com backend
- Ignorar contratos HTTP

---

### 4.4 Etapa P4 — Revalidação

Após refatoração:

1. Executar novamente o PLAYBOOK_F_DESIGNER
2. Executar novamente o PLAYBOOK_AUDITOR

Objetivo:

- Garantir que a correção não introduziu novos problemas

---

### 4.5 Etapa P5 — Registro Histórico

Responsável:

- Agente Auditor ou Orquestrador

Registrar em `historico/pipelines/`:

- O que foi entregue (frontend e backend)
- O que foi corrigido
- Por que foi corrigido
- De onde vieram as inferências

---

## 5. Regras de Bloqueio

O pipeline deve ser interrompido se:

- Frontend tentar acessar banco diretamente
- Backend criado dentro do Next.js
- CORS não configurado
- Tokens não implementados
- Camadas misturadas no backend
- apiClient não usado no frontend
- Exigir decisão de produto não definida
- Exigir conexão externa proibida (Fase MOC)

---

## 6. Checklist de Conformidade

### Frontend

- [ ] Usa apiClient para todas as requisições HTTP
- [ ] Não acessa banco diretamente
- [ ] Componentes shared vs feature corretos
- [ ] AuthContext configurado
- [ ] Middleware de proteção de rotas
- [ ] Build sem erros

### Backend

- [ ] Camadas separadas corretamente
- [ ] Validação de entrada implementada
- [ ] Tratamento de erros centralizado
- [ ] JWT funcional
- [ ] CORS configurado
- [ ] Logger estruturado
- [ ] Compila sem erros

### Integração

- [ ] Contratos HTTP respeitados
- [ ] Autenticação distribuída funcional
- [ ] Refresh token operacional
- [ ] Erros HTTP tratados no frontend

---

## 7. Saída do Pipeline

Ao final do pipeline, o projeto deve estar:

- ✅ Visualmente consistente
- ✅ Arquiteturalmente conforme
- ✅ Funcional (builds limpos)
- ✅ Documentado
- ✅ Auditado

---

**Governança Técnica**  
Engenharia de Software — Stack 002 — v1.0

© 2026 - Documentação Institucional Oficial
