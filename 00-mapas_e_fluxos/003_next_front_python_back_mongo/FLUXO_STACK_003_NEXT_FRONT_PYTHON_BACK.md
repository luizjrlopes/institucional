# FLUXO_STACK_003_NEXT_FRONT_PYTHON_BACK.md

Fluxo Técnico — Stack 003

**Stack:** Next.js (Frontend) + Python (Backend separado)

**Versão:** v1.0

---

## 1. Escopo

Este fluxo se aplica **somente** quando `stack_id = STACK_003_NEXT_FRONT_PYTHON_BACK`.

Em caso de conflito, **os Playbooks prevalecem**.

---

## 2. Pré‑Condições

- `BRIEF_PRODUTO.md` válido e com `stack_id`
- `MAPA_STACK_003_NEXT_FRONT_PYTHON_BACK.md` carregado
- Escopo documental **restrito** à Stack 003

Bloquear se qualquer item faltar.

---

## 3. Criação Base (Bootstrap)

### 3.1 Frontend (Next)

1. Criar projeto Next.js (App Router)
2. Estruturar pastas: `src/app`, `src/components`, `src/features`, `src/lib`
3. Configurar `apiClient` (HTTP) e utilitários
4. Criar páginas obrigatórias (login, cadastro, reset, home vazia)

### 3.2 Backend (Python separado)

1. Criar projeto Python (padrão recomendado: **FastAPI**)
2. Estruturar pastas: `app/api`, `app/controllers`, `app/services`, `app/repositories`, `app/models`, `app/schemas`, `app/core`, `app/database`, `tests`
3. Configurar servidor (`main.py`) e documentação **OpenAPI**
4. Definir banco no Brief (ex.: Postgres/Mongo/SQLite) e provisionar `database/`

---

## 4. Autenticação (Distribuída)

1. Definir mecanismo: **JWT** (access + refresh) ou sessão compatível
2. Backend: endpoints `/auth/login`, `/auth/refresh`, `/auth/logout`, `/auth/me`
3. Frontend: armazenar estado de auth sem violar regras institucionais (evitar `localStorage` para tokens long‑lived)
4. Guards de rota no Next (middleware/layouts protegidos)

---

## 5. Contrato de Integração (Front ↔ Back)

1. **Frontend não acessa banco**
2. Toda integração via `apiClient` (HTTP)
3. Backend expõe contratos estáveis documentados (OpenAPI)
4. Versionar APIs quando necessário (`/v1`, `/v2`)

---

## 6. Execução por Página (Loop)

Para cada página do Passaporte:

1. Criar rota e UI (shared vs feature)
2. Definir endpoints necessários (no backend)
3. Implementar controllers → services → repositories
4. Consumir endpoints via `apiClient` no front
5. Simular estados (loading/erro/vazio) e critérios de aceite

---

## 7. Pipeline Obrigatório

1. Executar `PLAYBOOK_PIPELINE` a cada entrega:

- **F‑Designer** (coerência visual/brief)
- **Auditor** (violação de camadas/contratos)
- **Refatorador** (se necessário)

---

## 8. Observações de Banco/Persistência

1. Se **relacional**: configurar migrations e versionamento de schema
2. Se **Mongo**: padronizar DTOs (Pydantic) e repositórios
3. Nunca expor modelos internos diretamente nas respostas

---

## 9. Regras de Bloqueio

Bloquear se:

- backend for implementado dentro do Next (isso é Stack 001)
- frontend acessar banco diretamente
- ausência de OpenAPI/documentação de contrato
- uso de documentos técnicos de outras stacks (001/002)
- banco não definido quando necessário

---

## 10. Encerramento

1. Ao finalizar todas as páginas do Passaporte:

- rodar pipeline final (designer → auditor)
- emitir relatório de conformidade
- estado: **PROJETO_CONCLUIDO**

---

## 11. Regra Final

Selecionou `STACK_003` → Next é **somente frontend**; backend é **Python separado** com contrato HTTP e documentação formal.
