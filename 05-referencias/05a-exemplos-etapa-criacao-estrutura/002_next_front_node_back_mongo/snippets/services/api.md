# Codigo do arquivo services/api.ts

```typescript
import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from "axios";

// Configuração base da API
const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor de requisição - adiciona token automaticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Interceptor de resposta - trata erros globalmente
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      // Erro com resposta do servidor
      const status = error.response.status;
      const message = error.response.data || "Erro desconhecido";

      if (status === 401) {
        // Token expirado ou inválido
        localStorage.clear();
        window.location.href = "/login";
      } else if (status === 403) {
        // Sem permissão
        console.error("Acesso negado:", message);
      } else if (status === 500) {
        // Erro interno do servidor
        console.error("Erro no servidor:", message);
      }
    } else if (error.request) {
      // Requisição feita mas sem resposta
      console.error("Sem resposta do servidor");
    } else {
      // Erro ao configurar a requisição
      console.error("Erro na requisição:", error.message);
    }

    return Promise.reject(error);
  }
);

// Funções auxiliares para requisições
export const get = async <T = any>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await api.get<T>(url, config);
  return response.data;
};

export const post = async <T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await api.post<T>(url, data, config);
  return response.data;
};

export const put = async <T = any>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await api.put<T>(url, data, config);
  return response.data;
};

export const del = async <T = any>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await api.delete<T>(url, config);
  return response.data;
};

export default api;
```
