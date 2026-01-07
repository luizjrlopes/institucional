# route.example.py
# Definição de rotas FastAPI

from fastapi import APIRouter, Depends, status
from typing import List
from app.schemas.product import (
    ProductCreate,
    ProductUpdate,
    ProductResponse,
    ProductListResponse
)
from app.services.product_service import ProductService
from app.repositories.product_repository import ProductRepository
from app.core.dependencies import get_db, get_current_user
from motor.motor_asyncio import AsyncIOMotorDatabase

router = APIRouter(prefix="/products", tags=["products"])

# Dependency para instanciar service
def get_product_service(db: AsyncIOMotorDatabase = Depends(get_db)) -> ProductService:
    repository = ProductRepository(db)
    return ProductService(repository)

@router.get("/", response_model=ProductListResponse)
async def list_products(
    service: ProductService = Depends(get_product_service)
):
    """Lista todos os produtos (rota pública)"""
    products = await service.list_products()
    return ProductListResponse(products=products, total=len(products))

@router.get("/{product_id}", response_model=ProductResponse)
async def get_product(
    product_id: str,
    service: ProductService = Depends(get_product_service)
):
    """Busca produto por ID (rota pública)"""
    return await service.get_product_by_id(product_id)

@router.post(
    "/",
    response_model=ProductResponse,
    status_code=status.HTTP_201_CREATED
)
async def create_product(
    data: ProductCreate,
    service: ProductService = Depends(get_product_service),
    current_user: dict = Depends(get_current_user)  # Rota protegida
):
    """Cria novo produto (rota protegida)"""
    return await service.create_product(data)

@router.put("/{product_id}", response_model=ProductResponse)
async def update_product(
    product_id: str,
    data: ProductUpdate,
    service: ProductService = Depends(get_product_service),
    current_user: dict = Depends(get_current_user)  # Rota protegida
):
    """Atualiza produto (rota protegida)"""
    return await service.update_product(product_id, data)

@router.delete("/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_product(
    product_id: str,
    service: ProductService = Depends(get_product_service),
    current_user: dict = Depends(get_current_user)  # Rota protegida
):
    """Deleta produto (rota protegida)"""
    await service.delete_product(product_id)
    return None
