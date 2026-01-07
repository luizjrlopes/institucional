# model.example.py
# Estrutura MongoDB (dict-based)

from datetime import datetime
from typing import Optional
from bson import ObjectId

class ProductModel:
    """
    Representa a estrutura de um produto no MongoDB.
    Não use classes complexas, apenas dicts.
    """
    
    @staticmethod
    def create_document(
        name: str,
        description: str,
        price: float,
        is_active: bool = True
    ) -> dict:
        """
        Cria um documento para inserção no MongoDB.
        """
        return {
            "name": name,
            "description": description,
            "price": price,
            "is_active": is_active,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
        }
    
    @staticmethod
    def from_db(doc: dict) -> dict:
        """
        Converte documento MongoDB para dict Python
        (converte ObjectId para string)
        """
        if doc is None:
            return None
        
        doc["id"] = str(doc["_id"])
        del doc["_id"]
        return doc
    
    @staticmethod
    def to_response(doc: dict) -> dict:
        """
        Prepara documento para resposta HTTP
        """
        if doc is None:
            return None
        
        return {
            "id": str(doc.get("_id")),
            "name": doc.get("name"),
            "description": doc.get("description"),
            "price": doc.get("price"),
            "is_active": doc.get("is_active"),
            "created_at": doc.get("created_at").isoformat() if doc.get("created_at") else None,
            "updated_at": doc.get("updated_at").isoformat() if doc.get("updated_at") else None,
        }
