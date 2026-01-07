# PLAYBOOK_EVOLUTOR.md

Playbook Institucional — Evolução do Produto — Stack 002

Versão: v1.0 — Playbook de Construção

**Stack:** 002_next_front_node_back_mongo

---

## 1. Objetivo

Este playbook define o processo de **criação de páginas do produto** (após a estrutura base estar pronta).

Ele é responsável por implementar as funcionalidades definidas no **PASSAPORTE_DO_PRODUTO**, página por página, com dados simulados (MOCs).

---

## 2. Pré-condições

Antes de executar este playbook:

- [ ] PLAYBOOK_CRIADOR concluído
- [ ] PLAYBOOK_PIPELINE executado (estrutura base aprovada)
- [ ] PASSAPORTE_DO_PRODUTO gerado e validado
- [ ] Referências visuais disponíveis em `area_produto/referencias-etapa-mock/`

---

## 3. Entradas Obrigatórias

- [PASSAPORTE_DO_PRODUTO](../../area_produto/passaporte_do_produto/PASSAPORTE_DO_PRODUTO.md)
- [DOSSIE_REGRAS_DE_CRIACAO](../002_01-identidades_estrutura/002_DOSSIE_REGRAS_DE_CRIACAO.md)
- [DOSSIE_NEXT_FRONTEND](../002_01-identidades_estrutura/002_DOSSIE_NEXT_FRONTEND.md)
- [DOSSIE_NODE_BACKEND](../002_01-identidades_estrutura/002_DOSSIE_NODE_BACKEND.md)
- [Referências Visuais](../../area_produto/referencias-etapa-mock/)

---

## 4. Ordem de Execução (Por Página)

Este playbook é executado **uma vez para cada página** do Passaporte.

### 4.1 Seleção da Página

1. Consultar PASSAPORTE_DO_PRODUTO
2. Selecionar próxima página não implementada
3. Verificar dependências (outras páginas necessárias)

### 4.2 Backend PRIMEIRO

⚠️ **REGRA OBRIGATÓRIA:** Sempre implementar o backend antes do frontend.

#### Etapa B1 — Schemas (se necessário)

Se a página manipula dados:

1. Definir model Mongoose
2. Definir DTOs TypeScript para comunicação

Exemplo:

```typescript
// backend/src/models/Product.model.ts
// backend/src/@types/product.d.ts
```

#### Etapa B2 — Repository

1. Criar repository para acesso a dados
2. Implementar métodos CRUD necessários

Durante Fase MOC:

- Repository pode retornar MOCs
- Não conectar a MongoDB real ainda

```typescript
// backend/src/repositories/Product.repository.ts
export class ProductRepository {
  async findAll() {
    // Durante MOC, pode retornar mock
    return mockProducts;
  }
}
```

#### Etapa B3 — Service

1. Criar service com lógica de negócio
2. Implementar regras e validações

```typescript
// backend/src/services/Product.service.ts
export class ProductService {
  async getProducts(filters) {
    // Lógica de negócio
    const products = await productRepository.findAll();
    return products.filter(/* filtros */);
  }
}
```

#### Etapa B4 — Controller

1. Criar controller para tratar HTTP
2. Extrair dados do request
3. Chamar service
4. Formatar response

```typescript
// backend/src/controllers/Product.controller.ts
export class ProductController {
  async list(req, res, next) {
    try {
      const filters = req.query;
      const products = await productService.getProducts(filters);
      res.json(successResponse(products));
    } catch (error) {
      next(error);
    }
  }
}
```

#### Etapa B5 — Routes

1. Definir rotas Express
2. Adicionar validação
3. Adicionar autenticação (se necessário)

```typescript
// backend/src/routes/product.route.ts
router.get("/", authenticate, productController.list);
router.get("/:id", authenticate, productController.getById);
router.post("/", authenticate, validateProduct, productController.create);
```

#### Etapa B6 — Testes Backend

1. Testar endpoints via Postman/Insomnia
2. Verificar responses
3. Verificar error handling

---

### 4.3 Frontend DEPOIS

#### Etapa F1 — Service

1. Criar service para comunicação com backend
2. Usar apiClient

```typescript
// frontend/src/services/product.service.ts
import api from "@/lib/api";

export const productService = {
  getAll: async () => {
    const { data } = await api.get("/products");
    return data;
  },

  getById: async (id: string) => {
    const { data } = await api.get(`/products/${id}`);
    return data;
  },
};
```

#### Etapa F2 — Hook (se necessário)

1. Criar hook para gerenciar estado
2. Chamar service
3. Gerenciar loading/erro

```typescript
// frontend/src/features/products/hooks/useProducts.ts
export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    productService
      .getAll()
      .then(setProducts)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { products, loading, error };
}
```

#### Etapa F3 — Componentes Feature

1. Criar pasta `features/<dominio>/components/`
2. Criar componentes específicos da página
3. Usar hooks para dados

```typescript
// frontend/src/features/products/components/ProductList.tsx
export function ProductList() {
  const { products, loading, error } = useProducts();

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <div>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

#### Etapa F4 — Página

1. Criar rota em `app/<pagina>/page.tsx`
2. Compor com components
3. Adicionar layout

```typescript
// frontend/src/app/products/page.tsx
import { ProductList } from "@/features/products/components/ProductList";

export default function ProductsPage() {
  return (
    <div>
      <h1>Produtos</h1>
      <ProductList />
    </div>
  );
}
```

#### Etapa F5 — Ajustes Visuais

1. Aplicar estilos conforme referências
2. Adicionar estados visuais (loading, erro, vazio)
3. Garantir responsividade

---

### 4.4 Integração e Teste

1. Iniciar backend (`npm run dev`)
2. Iniciar frontend (`npm run dev`)
3. Testar fluxo completo:
   - Navegação
   - Carregamento de dados
   - Interações
   - Estados de erro
   - Estados vazios

---

### 4.5 Pipeline Automático

Após completar a página:

1. Executar **PLAYBOOK_PIPELINE**
   - F-Designer
   - Auditor
   - Refatorador (se necessário)
2. Validar aprovação
3. Registrar em histórico

---

## 5. Regras de Componentização

### Shared vs Feature

- **Shared:** Usado em 2+ páginas diferentes
- **Feature:** Específico de um domínio

Exemplo:

```
src/components/Button.tsx        # shared (usado em várias páginas)
src/features/products/components/ProductCard.tsx  # feature (específico)
```

### Promoção para Shared

Componente só pode ser promovido para shared após uso confirmado em 2+ páginas.

---

## 6. Fase MOC (Dados Simulados)

Durante a implementação das páginas:

- ✅ Usar MOCs no frontend (`src/data/`)
- ✅ Backend pode retornar MOCs (repositories)
- ❌ Não conectar a MongoDB real
- ❌ Não usar APIs externas

Exemplo:

```typescript
// frontend/src/data/products.mock.ts
export const mockProducts = [
  { id: "1", name: "Produto 1", price: 100 },
  { id: "2", name: "Produto 2", price: 200 },
];
```

---

## 7. Checklist por Página

### Backend

- [ ] Model criado (se necessário)
- [ ] Repository implementado
- [ ] Service implementado
- [ ] Controller implementado
- [ ] Routes definidas
- [ ] Validação presente
- [ ] Error handling adequado
- [ ] Endpoints testados

### Frontend

- [ ] Service criado
- [ ] Hook criado (se necessário)
- [ ] Componentes feature criados
- [ ] Página criada
- [ ] Rota configurada
- [ ] Estados loading/erro tratados
- [ ] Visual conforme referências
- [ ] Responsivo

### Integração

- [ ] Frontend chama backend via apiClient
- [ ] Contratos HTTP respeitados
- [ ] Autenticação funcional
- [ ] Dados fluem corretamente

---

## 8. Critérios de "Página Concluída"

Uma página é considerada concluída quando:

- ✅ Backend implementado e testado
- ✅ Frontend implementado e visual correto
- ✅ Integração funcionando
- ✅ Estados (loading/erro/vazio) tratados
- ✅ Pipeline aprovado (F-Designer + Auditor)
- ✅ Documentado no histórico

---

## 9. Próxima Iteração

Após concluir uma página:

1. Selecionar próxima página do Passaporte
2. Repetir processo
3. Continuar até todas as páginas estarem implementadas

---

## 10. Regras de Bloqueio

Bloquear se:

- Página não está no Passaporte
- Referências não disponíveis
- Pré-condições não atendidas
- Backend dentro do Next.js (Stack errada)
- Frontend acessa banco diretamente
- Contratos HTTP não respeitados

---

**Governança Técnica**  
Engenharia de Software — Stack 002 — v1.0

© 2026 - Documentação Institucional Oficial
