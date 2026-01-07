// route.example.ts
// Definição de rotas

import { Router } from "express";
import { productController } from "../controllers/ProductController";
import { authMiddleware } from "../middlewares/auth";
import { validateBody } from "../middlewares/validation";
import {
  createProductSchema,
  updateProductSchema,
} from "../validators/productValidator";

const router = Router();

// Rotas públicas (sem autenticação)
router.get("/products", productController.list);
router.get("/products/:id", productController.getById);

// Rotas protegidas (com autenticação)
router.post(
  "/products",
  authMiddleware,
  validateBody(createProductSchema),
  productController.create
);

router.put(
  "/products/:id",
  authMiddleware,
  validateBody(updateProductSchema),
  productController.update
);

router.delete("/products/:id", authMiddleware, productController.delete);

export { router as productRoutes };

// ---

// validators/productValidator.ts (exemplo complementar)
import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(3).max(100),
  description: z.string().max(500),
  price: z.number().min(0),
});

export const updateProductSchema = z.object({
  name: z.string().min(3).max(100).optional(),
  description: z.string().max(500).optional(),
  price: z.number().min(0).optional(),
});
