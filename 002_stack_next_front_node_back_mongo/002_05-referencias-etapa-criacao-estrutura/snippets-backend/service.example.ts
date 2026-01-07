// service.example.ts
// Camada de lógica de negócio

import {
  productRepository,
  CreateProductData,
  UpdateProductData,
} from "../repositories/ProductRepository";
import { IProduct } from "../models/Product";

export class ProductService {
  async listProducts(): Promise<IProduct[]> {
    return productRepository.findAll();
  }

  async getProductById(id: string): Promise<IProduct> {
    const product = await productRepository.findById(id);

    if (!product) {
      throw new Error("Produto não encontrado");
    }

    return product;
  }

  async createProduct(data: CreateProductData): Promise<IProduct> {
    // Validação de negócio
    const existingProduct = await productRepository.findByName(data.name);

    if (existingProduct) {
      throw new Error("Já existe um produto com este nome");
    }

    if (data.price < 0) {
      throw new Error("Preço não pode ser negativo");
    }

    return productRepository.create(data);
  }

  async updateProduct(id: string, data: UpdateProductData): Promise<IProduct> {
    // Verificar se produto existe
    const existingProduct = await productRepository.findById(id);

    if (!existingProduct) {
      throw new Error("Produto não encontrado");
    }

    // Validar nome único (se alterando nome)
    if (data.name && data.name !== existingProduct.name) {
      const duplicateName = await productRepository.findByName(data.name);
      if (duplicateName) {
        throw new Error("Já existe um produto com este nome");
      }
    }

    // Validar preço
    if (data.price !== undefined && data.price < 0) {
      throw new Error("Preço não pode ser negativo");
    }

    const updatedProduct = await productRepository.update(id, data);

    if (!updatedProduct) {
      throw new Error("Erro ao atualizar produto");
    }

    return updatedProduct;
  }

  async deleteProduct(id: string): Promise<void> {
    const product = await productRepository.findById(id);

    if (!product) {
      throw new Error("Produto não encontrado");
    }

    const deleted = await productRepository.delete(id);

    if (!deleted) {
      throw new Error("Erro ao deletar produto");
    }
  }

  async getProductCount(): Promise<number> {
    return productRepository.count();
  }
}

// Instância única
export const productService = new ProductService();
