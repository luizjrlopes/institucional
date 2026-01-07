# PLAYBOOK_EVOLUTOR.md

Playbook Institucional — Evolução do Produto — Stack 003

Versão: v1.0 — Playbook de Construção

**Stack:** 003_next_front_python_back_mongo

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
- [DOSSIE_REGRAS_DE_CRIACAO](../003_01-identidades_estrutura/003_DOSSIE_REGRAS_DE_CRIACAO.md)
- [DOSSIE_NEXT_FRONTEND](../003_01-identidades_estrutura/003_DOSSIE_NEXT_FRONTEND.md)
- [DOSSIE_PYTHON_BACKEND](../003_01-identidades_estrutura/003_DOSSIE_PYTHON_BACKEND.md)
- [Referências Visuais](../../area_produto/referencias-etapa-mock/)

---

## 4. Ordem de Execução (Por Página)

Este playbook é executado **uma vez para cada página** do Passaporte.

### 4.1 Seleção da Página

1. Consultar PASSAPORTE_DO_PRODUTO
2. Selecionar próxima página não implementada
3. Verificar dependências (outras páginas necessárias)

### 4.2 Backend PRIMEIRO (Python/FastAPI)

⚠️ **REGRA OBRIGATÓRIA:** Sempre implementar o backend antes do frontend.

#### Etapa B1 — Models e Schemas

Se a página manipula dados:

**1. Model MongoDB (estrutura dict):**

```python
# app/models/product.py
# Estrutura MongoDB:
{
    "_id": ObjectId,
    "name": str,
    "description": str,
    "price": float,
    "category_id": str,
    "stock": int,
    "is_active": bool,
    "created_at": datetime,
    "updated_at": datetime
}
```

**2. Schemas Pydantic (validação):**

```python
# app/schemas/product.py
from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class ProductBase(BaseModel):
    name: str = Field(..., min_length=3, max_length=100)
    description: str
    price: float = Field(..., gt=0)
    category_id: str
    stock: int = Field(..., ge=0)
    is_active: bool = True

class ProductCreate(ProductBase):
    pass

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    category_id: Optional[str] = None
    stock: Optional[int] = None
    is_active: Optional[bool] = None

class ProductResponse(ProductBase):
    id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
```

#### Etapa B2 — Repository

1. Criar repository para acesso a dados (Motor async)
2. Implementar métodos CRUD necessários

Durante Fase MOC:

- Repository pode retornar MOCs
- Não conectar a MongoDB real ainda

```python
# app/repositories/product_repository.py
from typing import List, Optional
from motor.motor_asyncio import AsyncIOMotorDatabase
from bson import ObjectId
from datetime import datetime

class ProductRepository:
    def __init__(self, db: AsyncIOMotorDatabase):
        self.collection = db.products

    async def find_all(self, skip: int = 0, limit: int = 100) -> List[dict]:
        """Busca todos os produtos com paginação"""
        # Durante MOC, pode retornar mock:
        # return mock_products

        cursor = self.collection.find().skip(skip).limit(limit)
        products = await cursor.to_list(length=limit)
        return products

    async def find_by_id(self, product_id: str) -> Optional[dict]:
        """Busca produto por ID"""
        product = await self.collection.find_one({"_id": ObjectId(product_id)})
        return product

    async def create(self, product_data: dict) -> dict:
        """Cria novo produto"""
        product_data["created_at"] = datetime.utcnow()
        product_data["updated_at"] = datetime.utcnow()
        result = await self.collection.insert_one(product_data)
        product_data["_id"] = result.inserted_id
        return product_data

    async def update(self, product_id: str, update_data: dict) -> Optional[dict]:
        """Atualiza produto existente"""
        update_data["updated_at"] = datetime.utcnow()
        result = await self.collection.find_one_and_update(
            {"_id": ObjectId(product_id)},
            {"$set": update_data},
            return_document=True
        )
        return result

    async def delete(self, product_id: str) -> bool:
        """Remove produto"""
        result = await self.collection.delete_one({"_id": ObjectId(product_id)})
        return result.deleted_count > 0

    async def count(self) -> int:
        """Conta total de produtos"""
        return await self.collection.count_documents({})
```

#### Etapa B3 — Service

1. Criar service com lógica de negócio
2. Implementar regras e validações

```python
# app/services/product_service.py
from typing import List
from app.repositories.product_repository import ProductRepository
from app.schemas.product import ProductCreate, ProductUpdate, ProductResponse
from fastapi import HTTPException, status

class ProductService:
    def __init__(self, repository: ProductRepository):
        self.repository = repository

    async def get_all_products(self, skip: int = 0, limit: int = 100) -> List[ProductResponse]:
        """Retorna todos os produtos com paginação"""
        products = await self.repository.find_all(skip, limit)

        # Converte ObjectId para str
        return [
            ProductResponse(
                id=str(p["_id"]),
                name=p["name"],
                description=p["description"],
                price=p["price"],
                category_id=p["category_id"],
                stock=p["stock"],
                is_active=p["is_active"],
                created_at=p["created_at"],
                updated_at=p["updated_at"]
            )
            for p in products
        ]

    async def get_product_by_id(self, product_id: str) -> ProductResponse:
        """Retorna produto específico"""
        product = await self.repository.find_by_id(product_id)

        if not product:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Produto {product_id} não encontrado"
            )

        return ProductResponse(
            id=str(product["_id"]),
            **{k: v for k, v in product.items() if k != "_id"}
        )

    async def create_product(self, product_data: ProductCreate) -> ProductResponse:
        """Cria novo produto"""
        # Validações de negócio
        if product_data.price < 0:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Preço não pode ser negativo"
            )

        product_dict = product_data.model_dump()
        created = await self.repository.create(product_dict)

        return ProductResponse(
            id=str(created["_id"]),
            **{k: v for k, v in created.items() if k != "_id"}
        )

    async def update_product(self, product_id: str, update_data: ProductUpdate) -> ProductResponse:
        """Atualiza produto existente"""
        # Verifica se produto existe
        await self.get_product_by_id(product_id)

        # Remove campos None
        update_dict = {k: v for k, v in update_data.model_dump().items() if v is not None}

        updated = await self.repository.update(product_id, update_dict)

        return ProductResponse(
            id=str(updated["_id"]),
            **{k: v for k, v in updated.items() if k != "_id"}
        )

    async def delete_product(self, product_id: str) -> dict:
        """Remove produto"""
        # Verifica se produto existe
        await self.get_product_by_id(product_id)

        success = await self.repository.delete(product_id)

        if not success:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Erro ao remover produto"
            )

        return {"message": "Produto removido com sucesso"}
```

#### Etapa B4 — Routes

1. Definir rotas FastAPI
2. Adicionar validação (Pydantic automático)
3. Adicionar autenticação (se necessário)

```python
# app/api/routes/products.py
from fastapi import APIRouter, Depends, Query, status
from typing import List
from app.schemas.product import ProductCreate, ProductUpdate, ProductResponse
from app.services.product_service import ProductService
from app.core.dependencies import get_product_service, get_current_user

router = APIRouter(prefix="/products", tags=["Products"])

@router.get("/", response_model=List[ProductResponse])
async def list_products(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    service: ProductService = Depends(get_product_service),
    current_user = Depends(get_current_user)  # Protegido
):
    """Lista todos os produtos com paginação"""
    return await service.get_all_products(skip, limit)

@router.get("/{product_id}", response_model=ProductResponse)
async def get_product(
    product_id: str,
    service: ProductService = Depends(get_product_service),
    current_user = Depends(get_current_user)
):
    """Retorna produto específico"""
    return await service.get_product_by_id(product_id)

@router.post("/", response_model=ProductResponse, status_code=status.HTTP_201_CREATED)
async def create_product(
    product_data: ProductCreate,
    service: ProductService = Depends(get_product_service),
    current_user = Depends(get_current_user)
):
    """Cria novo produto"""
    return await service.create_product(product_data)

@router.put("/{product_id}", response_model=ProductResponse)
async def update_product(
    product_id: str,
    update_data: ProductUpdate,
    service: ProductService = Depends(get_product_service),
    current_user = Depends(get_current_user)
):
    """Atualiza produto existente"""
    return await service.update_product(product_id, update_data)

@router.delete("/{product_id}", status_code=status.HTTP_200_OK)
async def delete_product(
    product_id: str,
    service: ProductService = Depends(get_product_service),
    current_user = Depends(get_current_user)
):
    """Remove produto"""
    return await service.delete_product(product_id)
```

#### Etapa B5 — Testes Backend

1. Testar endpoints via Swagger (<http://localhost:8000/docs>)
2. Verificar responses seguem schemas Pydantic
3. Verificar error handling (404, 400, 401, etc)
4. Verificar autenticação funciona

**Checklist Backend:**

- [ ] GET /products retorna lista
- [ ] GET /products/{id} retorna produto
- [ ] POST /products cria produto
- [ ] PUT /products/{id} atualiza produto
- [ ] DELETE /products/{id} remove produto
- [ ] Validação Pydantic funciona
- [ ] Erros retornam HTTPException adequados
- [ ] Autenticação JWT obrigatória

---

### 4.3 Frontend DEPOIS (Next.js)

#### Etapa F1 — Service

1. Criar service para comunicação com backend
2. Usar apiClient configurado

```typescript
// frontend/src/services/product.service.ts
import { apiClient } from "@/lib/apiClient";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category_id: string;
  stock: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductCreate {
  name: string;
  description: string;
  price: number;
  category_id: string;
  stock: number;
  is_active?: boolean;
}

export const productService = {
  getAll: async (skip: number = 0, limit: number = 100): Promise<Product[]> => {
    const { data } = await apiClient.get("/products", {
      params: { skip, limit },
    });
    return data;
  },

  getById: async (id: string): Promise<Product> => {
    const { data } = await apiClient.get(`/products/${id}`);
    return data;
  },

  create: async (productData: ProductCreate): Promise<Product> => {
    const { data } = await apiClient.post("/products", productData);
    return data;
  },

  update: async (
    id: string,
    updateData: Partial<ProductCreate>
  ): Promise<Product> => {
    const { data } = await apiClient.put(`/products/${id}`, updateData);
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/products/${id}`);
  },
};
```

#### Etapa F2 — Hook (se necessário)

1. Criar hook para gerenciar estado
2. Chamar service
3. Gerenciar loading/erro/retry

```typescript
// frontend/src/features/products/hooks/useProducts.ts
import { useState, useEffect } from "react";
import { productService, Product } from "@/services/product.service";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productService.getAll();
      setProducts(data);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Erro ao carregar produtos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const refetch = () => fetchProducts();

  return { products, loading, error, refetch };
}

export function useProduct(id: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await productService.getById(id);
        setProduct(data);
      } catch (err: any) {
        setError(err.response?.data?.detail || "Erro ao carregar produto");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  return { product, loading, error };
}
```

#### Etapa F3 — Componentes Feature

1. Criar pasta `features/<dominio>/components/`
2. Criar componentes específicos da página
3. Usar hooks para dados

```typescript
// frontend/src/features/products/components/ProductCard.tsx
import React from "react";
import { Card, Button, Typography } from "@/components/shared";
import { Product } from "@/services/product.service";

interface ProductCardProps {
  product: Product;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  return (
    <Card>
      <Typography variant="h3">{product.name}</Typography>
      <Typography variant="body">{product.description}</Typography>
      <Typography variant="body">
        Preço: R$ {product.price.toFixed(2)}
      </Typography>
      <Typography variant="body">Estoque: {product.stock}</Typography>

      <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
        {onEdit && (
          <Button onClick={() => onEdit(product.id)} variant="secondary">
            Editar
          </Button>
        )}
        {onDelete && (
          <Button onClick={() => onDelete(product.id)} variant="danger">
            Excluir
          </Button>
        )}
      </div>
    </Card>
  );
}
```

```typescript
// frontend/src/features/products/components/ProductList.tsx
import React from "react";
import { useProducts } from "../hooks/useProducts";
import { ProductCard } from "./ProductCard";
import { Loading, ErrorMessage } from "@/components/shared";

interface ProductListProps {
  onEditProduct: (id: string) => void;
  onDeleteProduct: (id: string) => void;
}

export function ProductList({
  onEditProduct,
  onDeleteProduct,
}: ProductListProps) {
  const { products, loading, error, refetch } = useProducts();

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;
  if (products.length === 0)
    return <p>Nenhum produto encontrado. Adicione o primeiro!</p>;

  return (
    <div style={{ display: "grid", gap: "16px" }}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={onEditProduct}
          onDelete={onDeleteProduct}
        />
      ))}
    </div>
  );
}
```

#### Etapa F4 — Página

1. Criar rota em `app/`
2. Compor componentes feature + shared
3. Gerenciar interações

```typescript
// frontend/src/app/products/page.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ProductList } from "@/features/products/components/ProductList";
import { Button, Container, Typography } from "@/components/shared";
import { productService } from "@/services/product.service";

export default function ProductsPage() {
  const router = useRouter();

  const handleEdit = (id: string) => {
    router.push(`/products/${id}/edit`);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Deseja realmente excluir este produto?")) {
      try {
        await productService.delete(id);
        alert("Produto excluído com sucesso!");
        router.refresh(); // Atualiza a página
      } catch (error: any) {
        alert(error.response?.data?.detail || "Erro ao excluir produto");
      }
    }
  };

  return (
    <Container>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <Typography variant="h1">Produtos</Typography>
        <Button onClick={() => router.push("/products/new")}>
          Adicionar Produto
        </Button>
      </div>

      <ProductList onEditProduct={handleEdit} onDeleteProduct={handleDelete} />
    </Container>
  );
}
```

#### Etapa F5 — Visual e Estados

1. Aplicar estilos (styled-components ou CSS Modules)
2. Implementar estados de interface:
   - **Loading:** Spinner/skeleton enquanto carrega
   - **Erro:** Mensagem com botão retry
   - **Vazio:** Mensagem incentivando criação
   - **Sucesso:** Lista renderizada

```typescript
// Exemplo de estados:
{
  loading && <Skeleton count={3} />;
}
{
  error && <ErrorMessage message={error} onRetry={refetch} />;
}
{
  !loading && !error && products.length === 0 && <EmptyState />;
}
{
  !loading && !error && products.length > 0 && (
    <ProductList products={products} />
  );
}
```

#### Etapa F6 — Testes Frontend

1. Testar página abre sem erros
2. Verificar loading aparece
3. Verificar lista carrega após loading
4. Testar interações (editar, excluir)
5. Verificar navegação funciona

**Checklist Frontend:**

- [ ] Página renderiza corretamente
- [ ] Loading state funciona
- [ ] Produtos carregam da API
- [ ] Cards exibem dados corretos
- [ ] Botão "Adicionar" navega para form
- [ ] Botão "Editar" navega para edição
- [ ] Botão "Excluir" remove produto
- [ ] Erros são tratados e exibidos
- [ ] Estado vazio mostra mensagem adequada

---

### 4.4 Integração e Validação

#### Testes de Integração

1. **Fluxo Completo:**

   - Frontend carrega lista → Backend retorna MOCs
   - Frontend cria produto → Backend salva (ou retorna mock)
   - Frontend edita produto → Backend atualiza
   - Frontend exclui produto → Backend remove

2. **Verificações:**

   - [ ] CORS não bloqueia requisições
   - [ ] Token JWT enviado em todas requests protegidas
   - [ ] Erros backend aparecem no frontend
   - [ ] Loading states funcionam
   - [ ] Dados renderizam corretamente

3. **Checklist Final da Página:**
   - [ ] Backend completo (models, schemas, repository, service, routes)
   - [ ] Frontend completo (service, hooks, components, page)
   - [ ] Integração funcional
   - [ ] Código segue dossiês
   - [ ] Nenhum erro de console
   - [ ] Pronto para próxima página

---

## 5. Repetição para Próximas Páginas

Após concluir uma página:

1. Marcar como concluída no PASSAPORTE_DO_PRODUTO
2. Validar com PLAYBOOK_AUDITOR
3. Selecionar próxima página
4. Repetir processo (Backend → Frontend → Integração)

---

## 6. Regras de Ouro

### Backend Python/FastAPI

- ✅ **SEMPRE** async/await em repositories, services e routes
- ✅ **SEMPRE** validação Pydantic (schemas)
- ✅ **SEMPRE** converter ObjectId para str em responses
- ✅ **SEMPRE** lógica em services, nunca em routes
- ✅ **SEMPRE** acesso ao banco apenas via repositories
- 🚫 **NUNCA** lógica de negócio em routes
- 🚫 **NUNCA** código sync quando deve ser async
- 🚫 **NUNCA** expor hashed_password

### Frontend Next.js

- ✅ **SEMPRE** usar services para API calls
- ✅ **SEMPRE** criar hooks para estado compartilhado
- ✅ **SEMPRE** components feature separados de shared
- ✅ **SEMPRE** mostrar loading, erro e vazio
- ✅ **SEMPRE** usar TypeScript strict
- 🚫 **NUNCA** fetch direto nas páginas
- 🚫 **NUNCA** misturar shared com feature components
- 🚫 **NUNCA** hardcodar URLs (usar .env)

### Integração

- ✅ **SEMPRE** Backend antes de Frontend
- ✅ **SEMPRE** validar fluxo completo
- ✅ **SEMPRE** testar error handling
- 🚫 **NUNCA** avançar sem validar critérios
- 🚫 **NUNCA** criar frontend sem backend pronto

---

## 7. Saídas

Ao final de cada página:

- [ ] Backend implementado e testado
- [ ] Frontend implementado e testado
- [ ] Integração validada
- [ ] Código commitado
- [ ] Página marcada como concluída no Passaporte

---

## 8. Governança

Este playbook deve ser seguido **exatamente** conforme especificado.

Qualquer desvio deve ser documentado e aprovado.

**Responsável:** AGENTE_EVOLUTOR

**Próximo Playbook:** PLAYBOOK_AUDITOR (para validação)

---

© 2026 - Documentação Institucional Oficial
