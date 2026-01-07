# service.example.py
# Camada de lógica de negócio (async)

from typing import List
from app.repositories.product_repository import ProductRepository
from app.schemas.product import ProductCreate, ProductUpdate, ProductResponse
from app.models.product import ProductModel
from fastapi import HTTPException, status

class ProductService:
    def __init__(self, repository: ProductRepository):
        self.repository = repository
    
    async def list_products(self) -> List[ProductResponse]:
        """Lista todos os produtos"""
        products = await self.repository.find_all()
        return [
            ProductResponse(**ProductModel.to_response(p))
            for p in products
        ]
    
    async def get_product_by_id(self, product_id: str) -> ProductResponse:
        """Busca produto por ID"""
        product = await self.repository.find_by_id(product_id)
        
        if not product:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Produto não encontrado"
            )
        
        return ProductResponse(**ProductModel.to_response(product))
    
    async def create_product(self, data: ProductCreate) -> ProductResponse:
        """Cria novo produto"""
        # Validação de negócio: nome único
        existing = await self.repository.find_by_name(data.name)
        if existing:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Já existe um produto com este nome"
            )
        
        # Validação de negócio: preço positivo
        if data.price < 0:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Preço não pode ser negativo"
            )
        
        product_doc = ProductModel.create_document(
            name=data.name,
            description=data.description,
            price=data.price
        )
        
        created = await self.repository.create(product_doc)
        return ProductResponse(**ProductModel.to_response(created))
    
    async def update_product(
        self,
        product_id: str,
        data: ProductUpdate
    ) -> ProductResponse:
        """Atualiza produto"""
        # Verificar se existe
        existing = await self.repository.find_by_id(product_id)
        if not existing:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Produto não encontrado"
            )
        
        # Validar nome único (se alterando)
        if data.name and data.name != existing.get("name"):
            duplicate = await self.repository.find_by_name(data.name)
            if duplicate:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Já existe um produto com este nome"
                )
        
        # Validar preço
        if data.price is not None and data.price < 0:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Preço não pode ser negativo"
            )
        
        update_dict = data.model_dump(exclude_unset=True)
        updated = await self.repository.update(product_id, update_dict)
        
        if not updated:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Erro ao atualizar produto"
            )
        
        return ProductResponse(**ProductModel.to_response(updated))
    
    async def delete_product(self, product_id: str) -> None:
        """Deleta produto (soft delete)"""
        existing = await self.repository.find_by_id(product_id)
        if not existing:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Produto não encontrado"
            )
        
        deleted = await self.repository.delete(product_id)
        if not deleted:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Erro ao deletar produto"
            )
