# Codigo do arquivo server/config/env.ts

```typescript
/**
 * Configuração centralizada de variáveis de ambiente
 * REGRA INSTITUCIONAL: Este é o ÚNICO arquivo que deve acessar process.env
 */

interface EnvConfig {
  // Ambiente
  NODE_ENV: string;
  PORT: number;

  // Database
  MONGODB_URI: string;
  DATABASE_NAME: string;

  // Auth
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  SESSION_SECRET: string;

  // URLs
  API_URL: string;
  FRONTEND_URL: string;

  // Email (opcional)
  SMTP_HOST?: string;
  SMTP_PORT?: number;
  SMTP_USER?: string;
  SMTP_PASS?: string;
}

function validateEnv(): EnvConfig {
  const requiredVars = ["MONGODB_URI", "JWT_SECRET", "SESSION_SECRET"];

  const missing = requiredVars.filter((varName) => !process.env[varName]);

  if (missing.length > 0) {
    throw new Error(
      `❌ Variáveis de ambiente obrigatórias não definidas: ${missing.join(
        ", "
      )}`
    );
  }

  return {
    NODE_ENV: process.env.NODE_ENV || "development",
    PORT: parseInt(process.env.PORT || "3000", 10),

    MONGODB_URI: process.env.MONGODB_URI!,
    DATABASE_NAME: process.env.DATABASE_NAME || "app_database",

    JWT_SECRET: process.env.JWT_SECRET!,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",
    SESSION_SECRET: process.env.SESSION_SECRET!,

    API_URL: process.env.API_URL || "http://localhost:3000/api",
    FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:3000",

    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT
      ? parseInt(process.env.SMTP_PORT, 10)
      : undefined,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
  };
}

export const env = validateEnv();

// Helper para verificar ambiente
export const isDevelopment = env.NODE_ENV === "development";
export const isProduction = env.NODE_ENV === "production";
export const isTest = env.NODE_ENV === "test";
```
