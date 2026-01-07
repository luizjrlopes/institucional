// model.example.ts
// Schema Mongoose

import mongoose, { Schema, Document } from "mongoose";

// Interface TypeScript
export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Schema Mongoose
const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, "Nome é obrigatório"],
      trim: true,
      minlength: [3, "Nome deve ter no mínimo 3 caracteres"],
      maxlength: [100, "Nome deve ter no máximo 100 caracteres"],
    },
    description: {
      type: String,
      required: [true, "Descrição é obrigatória"],
      trim: true,
      maxlength: [500, "Descrição deve ter no máximo 500 caracteres"],
    },
    price: {
      type: Number,
      required: [true, "Preço é obrigatório"],
      min: [0, "Preço não pode ser negativo"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // cria createdAt e updatedAt automaticamente
  }
);

// Indexes
ProductSchema.index({ name: 1 });
ProductSchema.index({ isActive: 1 });

// Métodos virtuais (opcional)
ProductSchema.virtual("formattedPrice").get(function () {
  return `R$ ${this.price.toFixed(2)}`;
});

// Model
export const Product =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
