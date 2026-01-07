# Dossiê Institucional

## Arquitetura de Backend — Python/FastAPI — Stack 003

---

**Versão:** v1.1  
**Stack:** 003_next_front_python_back_mongo  
**Status:** Padrão Institucional (backend Python separado)

---

## 📑 Sumário

1. [Objetivo](#1-objetivo)
2. [Princípios](#2-princípios)
3. [Estrutura](#3-estrutura)
4. [Camadas](#4-camadas)
5. [Configuração](#5-configuração)
6. [Banco de Dados](#6-banco-de-dados)
7. [Models](#7-models)
8. [Schemas (Pydantic)](#8-schemas-pydantic)
9. [Repositories](#9-repositories)
10. [Services](#10-services)
11. [Routers (API)](#11-routers-api)
12. [Dependencies](#12-dependencies)
13. [Autenticação](#13-autenticação)
14. [Validação](#14-validação)
15. [Fluxo de Execução](#15-fluxo-de-execução)
16. [Regras Obrigatórias](#16-regras-obrigatórias)

---

## 1. Objetivo

Este dossiê define o padrão de backend Python/FastAPI como aplicação **separada** do frontend, na Stack 003.

---

## 2. Princípios

- Separação de camadas (routers → services → repositories → models)
- Backend como aplicação independente
- API REST com OpenAPI (autodocumentada)
- Validação automática via Pydantic
- Type hints obrigatórios
- MongoDB (Motor para async) ou banco definido no Brief

---

## 3. Estrutura

```plaintext
backend/
  app/
    api/
      routes/
        auth.py       # Routers FastAPI
        users.py
      __init__.py
    controllers/      # Opcional: handlers finos
      __init__.py
    services/
      auth_service.py
      user_service.py
      __init__.py
    repositories/
      user_repository.py
      __init__.py
    models/
      user.py         # Modelos de domínio
      __init__.py
    schemas/
      user.py         # DTOs Pydantic
      auth.py
      __init__.py
    core/
      config.py       # Configuração (pydantic-settings)
      security.py     # JWT, password hashing
      __init__.py
    database/
      client.py       # Conexão MongoDB
      __init__.py
    utils/
      errors.py
      response.py
      logger.py
      __init__.py
    dependencies.py   # FastAPI Dependencies
  tests/
  main.py            # Bootstrap FastAPI
  requirements.txt
  .env
```

---

## 4. Camadas

### Hierarquia

```
HTTP Request → Router → Service → Repository → Model → MongoDB
```

**Cada camada tem responsabilidade única.**

---

## 5. Configuração

### `app/core/config.py`

```python
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    app_name: str = "API Backend"
    mongo_uri: str = "mongodb://localhost:27017"
    database_name: str = "mydb"

    jwt_secret: str
    jwt_algorithm: str = "HS256"
    jwt_expire_minutes: int = 15

    jwt_refresh_secret: str
    jwt_refresh_expire_days: int = 7

    cors_origins: list[str] = ["http://localhost:3000"]

    class Config:
        env_file = ".env"

settings = Settings()
```

---

## 6. Banco de Dados

### `app/database/client.py`

```python
from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import settings

class Database:
    client: AsyncIOMotorClient = None

db = Database()

async def connect_db():
    db.client = AsyncIOMotorClient(settings.mongo_uri)
    print("MongoDB connected")

async def close_db():
    db.client.close()
    print("MongoDB disconnected")

def get_database():
    return db.client[settings.database_name]
```

**Nota:** Durante Fase MOC, não chamar `connect_db()`. MOCs no frontend são fonte de verdade.

---

## 7. Models

### `app/models/user.py`

```python
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr

class User(BaseModel):
    id: Optional[str] = None
    email: EmailStr
    name: str
    password_hash: str
    created_at: datetime = datetime.utcnow()
    updated_at: datetime = datetime.utcnow()

    class Config:
        json_schema_extra = {
            "example": {
                "email": "user@example.com",
                "name": "User Name"
            }
        }
```

---

## 8. Schemas (Pydantic)

### `app/schemas/user.py`

```python
from pydantic import BaseModel, EmailStr
from datetime import datetime

class UserCreate(BaseModel):
    email: EmailStr
    name: str
    password: str

class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None

class UserResponse(BaseModel):
    id: str
    email: str
    name: str
    created_at: datetime

    class Config:
        from_attributes = True
```

### `app/schemas/auth.py`

```python
from pydantic import BaseModel

class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"

class LoginRequest(BaseModel):
    email: str
    password: str

class RegisterRequest(BaseModel):
    email: str
    name: str
    password: str
```

---

## 9. Repositories

### `app/repositories/user_repository.py`

```python
from typing import Optional
from app.database.client import get_database
from app.models.user import User
from bson import ObjectId

class UserRepository:
    def __init__(self):
        self.collection = get_database()["users"]

    async def find_by_email(self, email: str) -> Optional[User]:
        doc = await self.collection.find_one({"email": email})
        if doc:
            doc["id"] = str(doc.pop("_id"))
            return User(**doc)
        return None

    async def create(self, user: User) -> User:
        doc = user.model_dump(exclude={"id"})
        result = await self.collection.insert_one(doc)
        user.id = str(result.inserted_id)
        return user

    async def find_by_id(self, user_id: str) -> Optional[User]:
        doc = await self.collection.find_one({"_id": ObjectId(user_id)})
        if doc:
            doc["id"] = str(doc.pop("_id"))
            return User(**doc)
        return None

user_repository = UserRepository()
```

---

## 10. Services

### `app/services/auth_service.py`

```python
from datetime import datetime, timedelta
from typing import Optional
from fastapi import HTTPException, status
from app.repositories.user_repository import user_repository
from app.schemas.auth import Token, RegisterRequest, LoginRequest
from app.schemas.user import UserResponse
from app.core.security import hash_password, verify_password, create_access_token
from app.models.user import User

class AuthService:
    async def register(self, request: RegisterRequest) -> dict:
        # Verificar se email já existe
        existing = await user_repository.find_by_email(request.email)
        if existing:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )

        # Criar usuário
        user = User(
            email=request.email,
            name=request.name,
            password_hash=hash_password(request.password)
        )

        created_user = await user_repository.create(user)

        # Gerar tokens
        tokens = self._generate_tokens(created_user.id)

        return {
            "user": UserResponse(
                id=created_user.id,
                email=created_user.email,
                name=created_user.name,
                created_at=created_user.created_at
            ),
            **tokens.model_dump()
        }

    async def login(self, request: LoginRequest) -> dict:
        user = await user_repository.find_by_email(request.email)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid credentials"
            )

        if not verify_password(request.password, user.password_hash):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid credentials"
            )

        tokens = self._generate_tokens(user.id)

        return {
            "user": UserResponse(
                id=user.id,
                email=user.email,
                name=user.name,
                created_at=user.created_at
            ),
            **tokens.model_dump()
        }

    def _generate_tokens(self, user_id: str) -> Token:
        access_token = create_access_token(
            data={"sub": user_id},
            expires_delta=timedelta(minutes=15)
        )
        refresh_token = create_access_token(
            data={"sub": user_id},
            expires_delta=timedelta(days=7),
            token_type="refresh"
        )

        return Token(
            access_token=access_token,
            refresh_token=refresh_token
        )

auth_service = AuthService()
```

---

## 11. Routers (API)

### `app/api/routes/auth.py`

```python
from fastapi import APIRouter, Depends
from app.schemas.auth import RegisterRequest, LoginRequest, Token
from app.services.auth_service import auth_service
from app.dependencies import get_current_user

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", response_model=dict)
async def register(request: RegisterRequest):
    return await auth_service.register(request)

@router.post("/login", response_model=dict)
async def login(request: LoginRequest):
    return await auth_service.login(request)

@router.get("/me")
async def get_current_user_info(current_user = Depends(get_current_user)):
    return current_user

@router.post("/logout")
async def logout():
    # Implementar lógica de logout (blacklist token, etc.)
    return {"message": "Logged out successfully"}
```

---

## 12. Dependencies

### `app/dependencies.py`

```python
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError, jwt
from app.core.config import settings
from app.repositories.user_repository import user_repository

security = HTTPBearer()

async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    token = credentials.credentials

    try:
        payload = jwt.decode(
            token,
            settings.jwt_secret,
            algorithms=[settings.jwt_algorithm]
        )
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token"
            )
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        )

    user = await user_repository.find_by_id(user_id)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found"
        )

    return user
```

---

## 13. Autenticação

### `app/core/security.py`

```python
from datetime import datetime, timedelta
from passlib.context import CryptContext
from jose import jwt
from app.core.config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(
    data: dict,
    expires_delta: timedelta,
    token_type: str = "access"
) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire, "type": token_type})

    secret = settings.jwt_secret if token_type == "access" else settings.jwt_refresh_secret

    return jwt.encode(to_encode, secret, algorithm=settings.jwt_algorithm)
```

---

## 14. Validação

Validação automática via **Pydantic**:

```python
@router.post("/users")
async def create_user(user: UserCreate):  # ← Validação automática
    # Se chegar aqui, o user já foi validado pelo Pydantic
    return await user_service.create(user)
```

---

## 15. Fluxo de Execução

```
1. Cliente faz request → FastAPI
2. Router recebe request
3. Pydantic valida automaticamente (schemas)
4. Dependencies executam (ex: get_current_user)
5. Service executa lógica de negócio
6. Repository acessa MongoDB
7. Resposta serializada por Pydantic
8. Response enviado ao cliente
9. OpenAPI docs atualizado automaticamente
```

---

## 16. Regras Obrigatórias

### ✅ OBRIGATÓRIO

- Python 3.11+
- Type hints em todo código
- Pydantic schemas para validação
- Separação de camadas
- Async/await para I/O
- JWT para autenticação
- Password hashing (passlib)
- CORS configurado
- OpenAPI docs gerado automaticamente
- ENV para configurações (pydantic-settings)
- Logger estruturado

### ❌ PROIBIDO

- Código sem type hints
- Lógica de negócio em routers
- Queries diretas em routers
- Expor senhas em responses
- Sync code para I/O
- Ignorar validações Pydantic
- Logs com dados sensíveis

---

## 17. Bootstrap (main.py)

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.database.client import connect_db, close_db
from app.api.routes import auth

app = FastAPI(
    title=settings.app_name,
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Events
@app.on_event("startup")
async def startup():
    await connect_db()

@app.on_event("shutdown")
async def shutdown():
    await close_db()

# Routers
app.include_router(auth.router, prefix="/api")

# Health check
@app.get("/health")
async def health():
    return {"status": "healthy"}
```

---

**Governança Técnica**  
Engenharia de Software — Stack 003 — Backend Python/FastAPI — v1.1

---

© 2026 - Documentação Institucional Oficial
