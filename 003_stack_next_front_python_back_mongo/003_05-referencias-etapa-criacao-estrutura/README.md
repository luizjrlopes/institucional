# Referências da Etapa de Criação — Stack 003

**Stack:** 003_next_front_python_back_mongo  
**Versão:** v1.0

---

## Objetivo

Este diretório contém exemplos, snippets e referências visuais para auxiliar na criação da estrutura base de projetos com frontend Next.js e backend Python/FastAPI separados.

---

## Estrutura

```
003_05-referencias-etapa-criacao-estrutura/
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
    ├── model.example.py
    ├── schema.example.py
    ├── repository.example.py
    ├── service.example.py
    └── route.example.py
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

Exemplos de código para camadas do backend Python/FastAPI:

- **model**: Estrutura MongoDB
- **schema**: Validação Pydantic
- **repository**: Acesso a dados async
- **service**: Lógica de negócio async
- **route**: Definição de endpoints FastAPI

---

## Regras

1. **Snippets são referências**, não código pronto
2. Sempre adaptar ao domínio específico
3. Respeitar separação de camadas
4. Frontend e backend em projetos separados
5. **SEMPRE async/await no backend Python**
6. Comunicação apenas via HTTP/REST

---

## Observações

- Durante a **Fase MOC**, o backend pode retornar dados mocados
- Na **Fase 4** (Produção), conectar MongoDB real via Motor
- Contratos (Pydantic schemas) devem permanecer idênticos em ambas fases

---

© 2026 - Documentação Institucional Oficial
