# schema.example.py
# Validação Pydantic

from pydantic import BaseModel, Field, validator
from typing import Optional
from datetime import datetime

class ProductBase(BaseModel):
    """Schema base do produto"""
    name: str = Field(..., min_length=3, max_length=100)
    description: str = Field(..., max_length=500)
    price: float = Field(..., ge=0)
    
    @validator('price')
    def validate_price(cls, v):
        if v < 0:
            raise ValueError('Preço não pode ser negativo')
        return round(v, 2)

class ProductCreate(ProductBase):
    """Schema para criação de produto"""
    pass

class ProductUpdate(BaseModel):
    """Schema para atualização de produto"""
    name: Optional[str] = Field(None, min_length=3, max_length=100)
    description: Optional[str] = Field(None, max_length=500)
    price: Optional[float] = Field(None, ge=0)
    is_active: Optional[bool] = None

class ProductResponse(ProductBase):
    """Schema de resposta do produto"""
    id: str
    is_active: bool
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True  # Pydantic v2
        # orm_mode = True  # Pydantic v1

class ProductListResponse(BaseModel):
    """Schema de resposta para lista de produtos"""
    products: list[ProductResponse]
    total: int
