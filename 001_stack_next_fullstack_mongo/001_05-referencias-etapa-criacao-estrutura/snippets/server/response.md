# Codigo do arquivo server/utils/response.ts

```typescript
import { NextResponse } from "next/server";

/**
 * Helpers para respostas HTTP padronizadas
 */

interface SuccessResponseData<T = any> {
  success: true;
  data: T;
  message?: string;
}

interface ErrorResponseData {
  success: false;
  error: string;
  message?: string;
  details?: any;
}

/**
 * Resposta de sucesso padronizada
 */
export function successResponse<T = any>(
  data: T,
  message?: string,
  status: number = 200
): NextResponse<SuccessResponseData<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
      message,
    },
    { status }
  );
}

/**
 * Resposta de erro padronizada
 */
export function errorResponse(
  error: string,
  message?: string,
  status: number = 500,
  details?: any
): NextResponse<ErrorResponseData> {
  return NextResponse.json(
    {
      success: false,
      error,
      message,
      details,
    },
    { status }
  );
}

/**
 * Resposta de validação com erros específicos
 */
export function validationErrorResponse(
  errors: Record<string, string[]> | string
): NextResponse<ErrorResponseData> {
  return NextResponse.json(
    {
      success: false,
      error: "Erro de validação",
      message:
        typeof errors === "string"
          ? errors
          : "Verifique os campos e tente novamente",
      details: typeof errors === "string" ? undefined : errors,
    },
    { status: 400 }
  );
}

/**
 * Resposta de não autorizado
 */
export function unauthorizedResponse(
  message: string = "Não autenticado"
): NextResponse<ErrorResponseData> {
  return NextResponse.json(
    {
      success: false,
      error: "Unauthorized",
      message,
    },
    { status: 401 }
  );
}

/**
 * Resposta de acesso negado
 */
export function forbiddenResponse(
  message: string = "Sem permissão para acessar este recurso"
): NextResponse<ErrorResponseData> {
  return NextResponse.json(
    {
      success: false,
      error: "Forbidden",
      message,
    },
    { status: 403 }
  );
}

/**
 * Resposta de não encontrado
 */
export function notFoundResponse(
  resource: string = "Recurso"
): NextResponse<ErrorResponseData> {
  return NextResponse.json(
    {
      success: false,
      error: "Not Found",
      message: `${resource} não encontrado`,
    },
    { status: 404 }
  );
}

/**
 * Resposta de conflito (ex: email já cadastrado)
 */
export function conflictResponse(
  message: string
): NextResponse<ErrorResponseData> {
  return NextResponse.json(
    {
      success: false,
      error: "Conflict",
      message,
    },
    { status: 409 }
  );
}

/**
 * Resposta de erro interno do servidor
 */
export function serverErrorResponse(
  message: string = "Erro interno do servidor"
): NextResponse<ErrorResponseData> {
  return NextResponse.json(
    {
      success: false,
      error: "Internal Server Error",
      message,
    },
    { status: 500 }
  );
}
```
