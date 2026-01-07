# repository.example.py
# Camada de acesso a dados (async)

from motor.motor_asyncio import AsyncIOMotorDatabase
from bson import ObjectId
from typing import List, Optional
from datetime import datetime

class ProductRepository:
    def __init__(self, db: AsyncIOMotorDatabase):
        self.collection = db.products
    
    async def find_all(self) -> List[dict]:
        """Busca todos os produtos ativos"""
        cursor = self.collection.find({"is_active": True})
        products = await cursor.to_list(length=100)
        return products
    
    async def find_by_id(self, product_id: str) -> Optional[dict]:
        """Busca produto por ID"""
        try:
            product = await self.collection.find_one({"_id": ObjectId(product_id)})
            return product
        except Exception:
            return None
    
    async def find_by_name(self, name: str) -> Optional[dict]:
        """Busca produto por nome"""
        product = await self.collection.find_one({
            "name": name,
            "is_active": True
        })
        return product
    
    async def create(self, product_data: dict) -> dict:
        """Cria novo produto"""
        product_data["created_at"] = datetime.utcnow()
        product_data["updated_at"] = datetime.utcnow()
        product_data["is_active"] = True
        
        result = await self.collection.insert_one(product_data)
        product_data["_id"] = result.inserted_id
        return product_data
    
    async def update(self, product_id: str, update_data: dict) -> Optional[dict]:
        """Atualiza produto"""
        update_data["updated_at"] = datetime.utcnow()
        
        try:
            result = await self.collection.find_one_and_update(
                {"_id": ObjectId(product_id)},
                {"$set": update_data},
                return_document=True
            )
            return result
        except Exception:
            return None
    
    async def delete(self, product_id: str) -> bool:
        """Soft delete (marca como inativo)"""
        try:
            result = await self.collection.update_one(
                {"_id": ObjectId(product_id)},
                {"$set": {"is_active": False, "updated_at": datetime.utcnow()}}
            )
            return result.modified_count > 0
        except Exception:
            return False
    
    async def count(self) -> int:
        """Conta produtos ativos"""
        return await self.collection.count_documents({"is_active": True})
