# Referências da Etapa de Criação — Stack 002

**Stack:** 002_next_front_node_back_mongo  
**Versão:** v1.0

---

## Objetivo

Este diretório contém exemplos, snippets e referências visuais para auxiliar na criação da estrutura base de projetos com frontend Next.js e backend Node.js/Express separados.

---

## Estrutura

```
002_05-referencias-etapa-criacao-estrutura/
│
├── referencias-visuais/
│   ├── login.html
│   ├── register.html
│   ├── reset-password.html
│   └── dashboard.html
│
├── snippets-frontend/
│   ├── apiClient.example.ts
│   ├── AuthContext.example.tsx
│   ├── service.example.ts
│   └── hook.example.ts
│
└── snippets-backend/
    ├── model.example.ts
    ├── repository.example.ts
    ├── service.example.ts
    ├── controller.example.ts
    └── route.example.ts
```

---

## Como Usar

### Referências Visuais

Os HTMLs em `referencias-visuais/` devem ser seguidos **literalmente** durante a criação das páginas de autenticação.

**Permitido alterar:**

- `{APP_NAME}` → Nome da aplicação
- `{BRAND_PALETTE}` → Cores da marca

**Proibido alterar:**

- Estrutura DOM
- Classes CSS
- Organização dos elementos

### Snippets Frontend

Exemplos de código para estruturas comuns do frontend Next.js:

- **apiClient**: Cliente HTTP centralizado
- **AuthContext**: Provider de autenticação
- **service**: Serviço de comunicação com backend
- **hook**: Hook customizado para features

### Snippets Backend

Exemplos de código para camadas do backend Node.js/Express:

- **model**: Schema Mongoose
- **repository**: Acesso a dados
- **service**: Lógica de negócio
- **controller**: Tratamento HTTP
- **route**: Definição de endpoints

---

## Regras

1. **Snippets são referências**, não código pronto
2. Sempre adaptar ao domínio específico
3. Respeitar separação de camadas
4. Frontend e backend em projetos separados
5. Comunicação apenas via HTTP/REST

---

## Observações

- Durante a **Fase MOC**, o backend pode usar adapters com dados em `frontend/src/data/`
- Na **Fase 4** (Produção), trocar adapter para MongoDB real
- Contratos (DTOs) devem permanecer idênticos em ambas fases

---

© 2026 - Documentação Institucional Oficial
