# Codigo do arquivo server/utils/logger.ts

```typescript
import { env, isDevelopment } from "../config/env";

/**
 * Sistema de logging estruturado
 */

type LogLevel = "info" | "warn" | "error" | "debug";

interface LogData {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: string;
  data?: any;
  error?: Error;
}

class Logger {
  private formatLog(logData: LogData): string {
    const { level, message, timestamp, context, data, error } = logData;

    let logMessage = `[${timestamp}] [${level.toUpperCase()}]`;

    if (context) {
      logMessage += ` [${context}]`;
    }

    logMessage += ` ${message}`;

    if (data) {
      logMessage += `\n${JSON.stringify(data, null, 2)}`;
    }

    if (error) {
      logMessage += `\n${error.stack}`;
    }

    return logMessage;
  }

  private log(level: LogLevel, message: string, context?: string, data?: any) {
    const logData: LogData = {
      level,
      message,
      timestamp: new Date().toISOString(),
      context,
      data,
    };

    const formattedLog = this.formatLog(logData);

    switch (level) {
      case "error":
        console.error(formattedLog);
        break;
      case "warn":
        console.warn(formattedLog);
        break;
      case "debug":
        if (isDevelopment) {
          console.debug(formattedLog);
        }
        break;
      default:
        console.log(formattedLog);
    }
  }

  info(message: string, context?: string, data?: any) {
    this.log("info", message, context, data);
  }

  warn(message: string, context?: string, data?: any) {
    this.log("warn", message, context, data);
  }

  error(message: string, error?: Error, context?: string, data?: any) {
    const logData: LogData = {
      level: "error",
      message,
      timestamp: new Date().toISOString(),
      context,
      data,
      error,
    };

    const formattedLog = this.formatLog(logData);
    console.error(formattedLog);
  }

  debug(message: string, context?: string, data?: any) {
    this.log("debug", message, context, data);
  }

  /**
   * Log específico para requisições HTTP
   */
  http(method: string, url: string, status: number, duration?: number) {
    const message = `${method} ${url} ${status}`;
    const data = duration ? { duration: `${duration}ms` } : undefined;
    this.info(message, "HTTP", data);
  }

  /**
   * Log específico para operações de banco de dados
   */
  database(operation: string, collection: string, duration?: number) {
    const message = `${operation} on ${collection}`;
    const data = duration ? { duration: `${duration}ms` } : undefined;
    this.info(message, "Database", data);
  }
}

// Exporta instância única
export const logger = new Logger();
```
