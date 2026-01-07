// service.example.ts
// Serviço de domínio para comunicação com backend

import { apiClient } from "@/services/apiClient";

// DTOs (mesmos do backend)
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  createdAt: string;
}

export interface CreateProductDTO {
  name: string;
  description: string;
  price: number;
}

export interface UpdateProductDTO {
  name?: string;
  description?: string;
  price?: number;
}

// Service
export class ProductService {
  private readonly basePath = "/products";

  async list(): Promise<Product[]> {
    const response = await apiClient.get<{ products: Product[] }>(
      this.basePath
    );
    return response.products;
  }

  async getById(id: string): Promise<Product> {
    const response = await apiClient.get<{ product: Product }>(
      `${this.basePath}/${id}`
    );
    return response.product;
  }

  async create(data: CreateProductDTO): Promise<Product> {
    const response = await apiClient.post<{ product: Product }>(
      this.basePath,
      data
    );
    return response.product;
  }

  async update(id: string, data: UpdateProductDTO): Promise<Product> {
    const response = await apiClient.put<{ product: Product }>(
      `${this.basePath}/${id}`,
      data
    );
    return response.product;
  }

  async delete(id: string): Promise<void> {
    await apiClient.delete(`${this.basePath}/${id}`);
  }
}

// Instância única
export const productService = new ProductService();
