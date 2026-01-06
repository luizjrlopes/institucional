# Codigo do arquivo app/api/health/route.ts

```typescript
import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "@/server/utils/response";
import { connectDB } from "@/server/db/client";
import { logger } from "@/server/utils/logger";

/**
 * Endpoint de health check
 * Verifica se a aplicação e suas dependências estão funcionando
 */
export async function GET(request: NextRequest) {
  try {
    const startTime = Date.now();

    // Verifica conexão com banco de dados
    let dbStatus = "disconnected";
    let dbError = null;

    try {
      await connectDB();
      dbStatus = "connected";
    } catch (error) {
      dbError = error instanceof Error ? error.message : "Unknown error";
      dbStatus = "error";
    }

    const duration = Date.now() - startTime;

    const healthData = {
      status: dbStatus === "connected" ? "healthy" : "unhealthy",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV,
      database: {
        status: dbStatus,
        error: dbError,
      },
      responseTime: `${duration}ms`,
    };

    logger.info("Health check executado", "Health", healthData);

    if (dbStatus === "connected") {
      return successResponse(healthData, "Aplicação saudável");
    } else {
      return errorResponse(
        "Unhealthy",
        "Falha na conexão com banco de dados",
        503,
        healthData
      );
    }
  } catch (error) {
    logger.error("Erro no health check", error as Error, "Health");

    return errorResponse(
      "Health check failed",
      "Erro ao verificar saúde da aplicação",
      500
    );
  }
}
```
