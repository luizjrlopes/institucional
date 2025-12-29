# Codigo do arquivo server/db/client.ts

```typescript
import mongoose from "mongoose";
import { env } from "../config/env";

declare global {
  var mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

// Cache da conexão para evitar múltiplas conexões em desenvolvimento
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  // Se já existe uma conexão ativa, retorna
  if (cached.conn) {
    return cached.conn;
  }

  // Se não existe uma promise de conexão, cria uma
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    cached.promise = mongoose
      .connect(env.MONGODB_URI, opts)
      .then((mongoose) => {
        console.log("✅ MongoDB conectado com sucesso!");
        return mongoose;
      })
      .catch((error) => {
        console.error("❌ Erro ao conectar ao MongoDB:", error);
        cached.promise = null;
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export async function disconnectDB() {
  if (cached.conn) {
    await mongoose.disconnect();
    cached.conn = null;
    cached.promise = null;
    console.log("🔌 MongoDB desconectado");
  }
}

// Exporta a instância do mongoose para uso direto quando necessário
export { mongoose };
```
