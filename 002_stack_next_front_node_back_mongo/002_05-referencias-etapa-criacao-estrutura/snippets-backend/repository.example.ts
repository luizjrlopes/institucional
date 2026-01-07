// repository.example.ts
// Camada de acesso a dados

import { Product, IProduct } from "../models/Product";

export interface CreateProductData {
  name: string;
  description: string;
  price: number;
}

export interface UpdateProductData {
  name?: string;
  description?: string;
  price?: number;
  isActive?: boolean;
}

export class ProductRepository {
  async findAll(): Promise<IProduct[]> {
    return Product.find({ isActive: true }).sort({ createdAt: -1 });
  }

  async findById(id: string): Promise<IProduct | null> {
    return Product.findById(id);
  }

  async findByName(name: string): Promise<IProduct | null> {
    return Product.findOne({ name, isActive: true });
  }

  async create(data: CreateProductData): Promise<IProduct> {
    const product = new Product(data);
    return product.save();
  }

  async update(id: string, data: UpdateProductData): Promise<IProduct | null> {
    return Product.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true }
    );
  }

  async delete(id: string): Promise<boolean> {
    // Soft delete
    const result = await Product.findByIdAndUpdate(
      id,
      { $set: { isActive: false } },
      { new: true }
    );
    return !!result;
  }

  async hardDelete(id: string): Promise<boolean> {
    // Hard delete (use com cuidado)
    const result = await Product.findByIdAndDelete(id);
    return !!result;
  }

  async count(): Promise<number> {
    return Product.countDocuments({ isActive: true });
  }
}

// Instância única
export const productRepository = new ProductRepository();
