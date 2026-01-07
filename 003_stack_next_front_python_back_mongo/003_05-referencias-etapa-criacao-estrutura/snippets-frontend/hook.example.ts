// hook.example.ts
// Hook customizado para gerenciar estado de feature

"use client";

import { useState, useEffect } from "react";
import { productService, Product } from "@/services/productService";

interface UseProductsReturn {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useProducts(): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadProducts() {
    try {
      setIsLoading(true);
      setError(null);
      const data = await productService.list();
      setProducts(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao carregar produtos"
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  return {
    products,
    isLoading,
    error,
    refetch: loadProducts,
  };
}

// Hook para produto único
interface UseProductReturn {
  product: Product | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useProduct(id: string): UseProductReturn {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadProduct() {
    try {
      setIsLoading(true);
      setError(null);
      const data = await productService.getById(id);
      setProduct(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar produto");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (id) {
      loadProduct();
    }
  }, [id]);

  return {
    product,
    isLoading,
    error,
    refetch: loadProduct,
  };
}
