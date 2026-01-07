# PLAYBOOK_REFATORADOR.md

Playbook Institucional — Refatoração Corretiva — Stack 002

Versão: v1.0 — Playbook de Correção

**Stack:** 002_next_front_node_back_mongo

---

## 1. Objetivo

Corrigir violações arquiteturais detectadas pelo **PLAYBOOK_AUDITOR**, sem alterar funcionalidades ou escopo.

Este playbook é executado **condicionalmente** pelo PLAYBOOK_PIPELINE, apenas quando a auditoria detecta violações corrigíveis.

---

## 2. Quando Executar

Executar apenas se:

- Auditoria retornou status **BLOQUEADO**
- Violações são **corrigíveis** (não exigem decisão humana)

---

## 3. Escopo de Atuação

### Permitido

**Frontend:**

- Reorganizar estrutura de pastas
- Mover componentes entre shared e feature
- Corrigir uso do apiClient
- Refatorar hooks
- Eliminar fetch direto
- Corrigir imports
- Padronizar error handling

**Backend:**

- Reorganizar camadas
- Extrair lógica de controllers para services
- Mover queries de controllers para repositories
- Refatorar services pesados
- Adicionar validações faltantes
- Melhorar tratamento de erros
- Padronizar responses

**Integração:**

- Sincronizar DTOs entre front e back
- Corrigir contratos HTTP
- Ajustar CORS

### Proibido

- Criar novas funcionalidades
- Alterar escopo do Passaporte
- Modificar regras de negócio
- Adicionar novas páginas
- Remover funcionalidades existentes
- Misturar código frontend com backend
- Conectar a serviços externos (Fase MOC)

---

## 4. Violações Comuns e Correções

### 4.1 Frontend: Fetch Direto

❌ **Violação:**

```typescript
// Componente fazendo fetch direto
const users = await fetch("/api/users");
```

✅ **Correção:**

```typescript
// Usar service + apiClient
const users = await userService.getAll();
```

### 4.2 Frontend: Lógica em Componente

❌ **Violação:**

```typescript
// Lógica complexa no componente
const handleSubmit = async () => {
  const hashedPassword = await bcrypt.hash(password, 10);
  // ...
};
```

✅ **Correção:**

```typescript
// Extrair para hook ou service
const { handleLogin } = useAuth();
const handleSubmit = () => handleLogin(email, password);
```

### 4.3 Backend: Lógica em Controller

❌ **Violação:**

```typescript
// Controller com lógica de negócio
export async function register(req, res) {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = await UserModel.create({
    ...req.body,
    password: hashedPassword,
  });
  res.json(user);
}
```

✅ **Correção:**

```typescript
// Extrair para service
export async function register(req, res, next) {
  try {
    const { email, name, password } = req.body;
    const result = await authService.register(email, name, password);
    res.status(201).json(successResponse(result));
  } catch (error) {
    next(error);
  }
}
```

### 4.4 Backend: Query em Controller

❌ **Violação:**

```typescript
// Query direto no controller
const users = await UserModel.find({});
```

✅ **Correção:**

```typescript
// Usar repository
const users = await userRepository.findAll();
```

### 4.5 Componente em Pasta Errada

❌ **Violação:**

```
src/components/UserCard.tsx  // componente específico em shared
```

✅ **Correção:**

```
src/features/users/components/UserCard.tsx
```

---

## 5. Processo de Refatoração

### 5.1 Análise

1. Ler relatório de auditoria
2. Identificar todas as violações
3. Classificar por prioridade:
   - Críticas (bloqueiam)
   - Importantes (degradam)
   - Menores (melhorias)

### 5.2 Planejamento

1. Listar correções necessárias
2. Verificar dependências entre correções
3. Definir ordem de execução

### 5.3 Execução

Para cada violação:

1. Localizar código problemático
2. Aplicar correção conforme dossiês
3. Verificar que não quebrou funcionalidade
4. Testar localmente

### 5.4 Validação

1. Rodar builds (frontend e backend)
2. Verificar que não há erros de compilação
3. Testar funcionalidades afetadas

---

## 6. Checklist de Refatoração

### Frontend

- [ ] Todos os fetches usam apiClient
- [ ] Componentes shared vs feature corretos
- [ ] Lógica complexa extraída para hooks
- [ ] Error handling padronizado
- [ ] States gerenciados adequadamente
- [ ] Build limpo

### Backend

- [ ] Camadas separadas (routes → controllers → services → repositories)
- [ ] Controllers apenas tratam HTTP
- [ ] Services contêm lógica
- [ ] Repositories acessam dados
- [ ] Validação de entrada presente
- [ ] Error handling centralizado
- [ ] Compila sem erros

### Integração

- [ ] Contratos HTTP consistentes
- [ ] DTOs sincronizados
- [ ] CORS configurado
- [ ] Autenticação funcional

---

## 7. Testes Pós-Refatoração

### Frontend

```bash
npm run build
npm run dev
```

- [ ] Compila sem erros
- [ ] Aplicação abre
- [ ] Login funciona
- [ ] Navegação funciona

### Backend

```bash
npm run build
npm run dev
```

- [ ] Compila sem erros
- [ ] Servidor inicia
- [ ] `/health` responde
- [ ] Auth endpoints funcionam

---

## 8. Relatório de Refatoração

Documentar em:

`002_03-passaporte_de_criacao/RELATORIO_REFATORACAO_[DATA].md`

```markdown
# Relatório de Refatoração — Stack 002

**Data:** [DATA]
**Violações Corrigidas:** [NÚMERO]

## Correções Frontend

### Estrutura

- [Lista de correções]

### ApiClient

- [Lista de correções]

### Componentização

- [Lista de correções]

## Correções Backend

### Camadas

- [Lista de correções]

### Validação

- [Lista de correções]

### Error Handling

- [Lista de correções]

## Correções de Integração

- [Lista de correções]

## Verificações

- [ ] Frontend compila
- [ ] Backend compila
- [ ] Funcionalidades testadas
- [ ] Auditoria revalidada
```

---

## 9. Após Refatoração

1. Executar **PLAYBOOK_F_DESIGNER** novamente
2. Executar **PLAYBOOK_AUDITOR** novamente
3. Se aprovado: prosseguir
4. Se ainda bloqueado: reportar para decisão humana

---

## 10. Regras de Bloqueio

Parar refatoração e solicitar intervenção humana se:

- Violação exige decisão de produto
- Correção quebraria funcionalidade crítica
- Violação envolve decisão arquitetural major
- Não há caminho claro de correção

---

**Governança Técnica**  
Engenharia de Software — Stack 002 — v1.0

© 2026 - Documentação Institucional Oficial
