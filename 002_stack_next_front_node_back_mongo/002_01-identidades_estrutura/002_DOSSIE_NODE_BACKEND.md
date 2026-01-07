# Dossiê Institucional

## Arquitetura de Backend — Node.js/Express — Stack 002

---

**Versão:** v1.0  
**Stack:** 002_next_front_node_back_mongo  
**Status:** Padrão Institucional (backend Node.js separado)

---

## 📑 Sumário

1. [Objetivo](#1-objetivo)
2. [Princípios](#2-princípios)
3. [Estrutura](#3-estrutura)
4. [Camadas](#4-camadas)
5. [Configuração](#5-configuração)
6. [Banco de Dados](#6-banco-de-dados)
7. [Models](#7-models)
8. [Repositories](#8-repositories)
9. [Services](#9-services)
10. [Controllers](#10-controllers)
11. [Routes](#11-routes)
12. [Middlewares](#12-middlewares)
13. [Validação](#13-validação)
14. [Autenticação](#14-autenticação)
15. [Fluxo de Execução](#15-fluxo-de-execução)
16. [Regras Obrigatórias](#16-regras-obrigatórias)

---

## 1. Objetivo

Este dossiê define o padrão de backend Node.js/Express como aplicação **separada** do frontend, na Stack 002.

---

## 2. Princípios

- Separação de camadas (routes → controllers → services → repositories → models)
- Backend como aplicação independente
- API REST com contratos tipados
- TypeScript obrigatório
- MongoDB + Mongoose

---

## 3. Estrutura

```plaintext
backend/
  src/
    routes/           # Definição de rotas Express
    controllers/      # Handlers HTTP
    services/         # Lógica de negócio
    repositories/     # Acesso a dados
    models/           # Schemas Mongoose
    middlewares/      # Auth, CORS, validação
    validators/       # Validação de entrada
    database/
      client.ts       # Conexão MongoDB
    config/
      env.ts          # Variáveis de ambiente
    utils/
      errors.ts       # Classes de erro
      response.ts     # Padronização de responses
      logger.ts       # Winston/Pino
    server.ts         # Bootstrap da aplicação
  tests/
  .env
  package.json
  tsconfig.json
```

---

## 4. Camadas

### Hierarquia

```
HTTP Request → Route → Controller → Service → Repository → Model → MongoDB
```

**Cada camada tem responsabilidade única e bem definida.**

---

## 5. Configuração

### `src/config/env.ts`

```typescript
import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT || 4000,
  mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017/db",
  jwtSecret: process.env.JWT_SECRET!,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET!,
  jwtExpires: process.env.JWT_EXPIRES || "15m",
  jwtRefreshExpires: process.env.JWT_REFRESH_EXPIRES || "7d",
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:3000",
  nodeEnv: process.env.NODE_ENV || "development",
};
```

---

## 6. Banco de Dados

### `src/database/client.ts`

```typescript
import mongoose from "mongoose";
import { config } from "../config/env";
import { logger } from "../utils/logger";

export async function connectDatabase() {
  try {
    await mongoose.connect(config.mongoUri);
    logger.info("MongoDB connected");
  } catch (error) {
    logger.error("MongoDB connection error:", error);
    process.exit(1);
  }
}

export default mongoose;
```

**Nota:** Durante Fase MOC, esta conexão NÃO deve ser chamada. MOCs em `frontend/src/data/` são a fonte de verdade.

---

## 7. Models

### `src/models/User.model.ts`

```typescript
import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model<IUser>("User", UserSchema);
```

---

## 8. Repositories

### `src/repositories/User.repository.ts`

```typescript
import { UserModel, IUser } from "../models/User.model";

export class UserRepository {
  async findByEmail(email: string): Promise<IUser | null> {
    return UserModel.findOne({ email });
  }

  async create(userData: Partial<IUser>): Promise<IUser> {
    const user = new UserModel(userData);
    return user.save();
  }

  async findById(id: string): Promise<IUser | null> {
    return UserModel.findById(id);
  }

  async update(id: string, data: Partial<IUser>): Promise<IUser | null> {
    return UserModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<void> {
    await UserModel.findByIdAndDelete(id);
  }
}

export const userRepository = new UserRepository();
```

---

## 9. Services

### `src/services/Auth.service.ts`

```typescript
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { userRepository } from "../repositories/User.repository";
import { config } from "../config/env";
import { AppError } from "../utils/errors";

export class AuthService {
  async register(email: string, name: string, password: string) {
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new AppError("Email already registered", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userRepository.create({
      email,
      name,
      password: hashedPassword,
    });

    const tokens = this.generateTokens(user.id);
    return { user: this.sanitizeUser(user), ...tokens };
  }

  async login(email: string, password: string) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new AppError("Invalid credentials", 401);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new AppError("Invalid credentials", 401);
    }

    const tokens = this.generateTokens(user.id);
    return { user: this.sanitizeUser(user), ...tokens };
  }

  private generateTokens(userId: string) {
    const accessToken = jwt.sign({ userId }, config.jwtSecret, {
      expiresIn: config.jwtExpires,
    });

    const refreshToken = jwt.sign({ userId }, config.jwtRefreshSecret, {
      expiresIn: config.jwtRefreshExpires,
    });

    return { accessToken, refreshToken };
  }

  private sanitizeUser(user: any) {
    const { password, ...userWithoutPassword } = user.toObject();
    return userWithoutPassword;
  }
}

export const authService = new AuthService();
```

---

## 10. Controllers

### `src/controllers/Auth.controller.ts`

```typescript
import { Request, Response, NextFunction } from "express";
import { authService } from "../services/Auth.service";
import { successResponse } from "../utils/response";

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, name, password } = req.body;
      const result = await authService.register(email, name, password);
      res
        .status(201)
        .json(successResponse(result, "User registered successfully"));
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);
      res.json(successResponse(result, "Login successful"));
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();
```

---

## 11. Routes

### `src/routes/auth.route.ts`

```typescript
import { Router } from "express";
import { authController } from "../controllers/Auth.controller";
import { validateRegister, validateLogin } from "../validators/auth.validator";

const router = Router();

router.post("/register", validateRegister, authController.register);
router.post("/login", validateLogin, authController.login);
router.post("/logout", authController.logout);
router.get("/me", authenticate, authController.me);

export default router;
```

### `src/routes/index.ts`

```typescript
import { Router } from "express";
import authRoutes from "./auth.route";

const router = Router();

router.use("/auth", authRoutes);

export default router;
```

---

## 12. Middlewares

### `src/middlewares/authenticate.ts`

```typescript
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { config } from "../config/env";
import { AppError } from "../utils/errors";

export interface AuthRequest extends Request {
  userId?: string;
}

export function authenticate(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    throw new AppError("No token provided", 401);
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as { userId: string };
    req.userId = decoded.userId;
    next();
  } catch (error) {
    throw new AppError("Invalid token", 401);
  }
}
```

### `src/middlewares/errorHandler.ts`

```typescript
import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/errors";
import { logger } from "../utils/logger";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.error(err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
}
```

---

## 13. Validação

### `src/validators/auth.validator.ts`

```typescript
import { body } from "express-validator";
import { validate } from "./validate";

export const validateRegister = [
  body("email").isEmail().withMessage("Invalid email"),
  body("name").notEmpty().withMessage("Name is required"),
  body("password").isLength({ min: 6 }).withMessage("Password min 6 chars"),
  validate,
];

export const validateLogin = [
  body("email").isEmail().withMessage("Invalid email"),
  body("password").notEmpty().withMessage("Password is required"),
  validate,
];
```

---

## 14. Autenticação

- JWT (access + refresh tokens)
- Access token: 15 minutos
- Refresh token: 7 dias
- Middleware `authenticate` protege rotas
- Password hashing com bcryptjs

---

## 15. Fluxo de Execução

```
1. Cliente faz request → Express
2. Route recebe request
3. Middleware de validação
4. Controller extrai dados do request
5. Controller chama Service
6. Service executa lógica de negócio
7. Service chama Repository
8. Repository acessa MongoDB
9. Resposta sobe a pilha
10. Controller formata response
11. Response enviado ao cliente
```

---

## 16. Regras Obrigatórias

### ✅ OBRIGATÓRIO

- TypeScript em todo código
- Separação de camadas
- Validação de entrada (express-validator)
- Tratamento de erros centralizado
- Logger estruturado
- CORS configurado
- ENV para configurações
- JWT para autenticação
- Password hashing
- Sanitização de dados sensíveis

### ❌ PROIBIDO

- Lógica de negócio em controllers
- Queries diretas em controllers
- Expor senhas em responses
- Ignorar validações
- Logs com dados sensíveis
- Conexões sem tratamento de erro

---

**Governança Técnica**  
Engenharia de Software — Stack 002 — Backend Node.js — v1.0

---

© 2026 - Documentação Institucional Oficial
