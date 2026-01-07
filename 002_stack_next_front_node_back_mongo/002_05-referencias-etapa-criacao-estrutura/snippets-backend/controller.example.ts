// controller.example.ts
// Camada de controle HTTP

import { Request, Response, NextFunction } from "express";
import { productService } from "../services/ProductService";

export class ProductController {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await productService.listProducts();

      return res.status(200).json({
        success: true,
        products,
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const product = await productService.getProductById(id);

      return res.status(200).json({
        success: true,
        product,
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, description, price } = req.body;

      const product = await productService.createProduct({
        name,
        description,
        price,
      });

      return res.status(201).json({
        success: true,
        product,
        message: "Produto criado com sucesso",
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { name, description, price } = req.body;

      const product = await productService.updateProduct(id, {
        name,
        description,
        price,
      });

      return res.status(200).json({
        success: true,
        product,
        message: "Produto atualizado com sucesso",
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      await productService.deleteProduct(id);

      return res.status(200).json({
        success: true,
        message: "Produto deletado com sucesso",
      });
    } catch (error) {
      next(error);
    }
  }
}

// Instância única
export const productController = new ProductController();
