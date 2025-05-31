import { z } from "zod";

export const CreateProductSchema = z.object({
  name: z.string().min(1),
  price: z.number().min(1),
  inStock: z.boolean(),
  image: z.instanceof(File),
});

export const UpdateProductSchema = z.object({
  id: z.string().min(1),
  data: CreateProductSchema.partial(),
});

export const DeleteProductSchema = z.object({
  id: z.string().min(1),
});

export const ToggleStockSchema = z.object({
  id: z.string().min(1),
  inStock: z.boolean(),
});

export const DeleteProductImageSchema = z.object({
  imageUrl: z.string().url(),
});

export type CreateProductData = z.infer<typeof CreateProductSchema>;
export type UpdateProductData = z.infer<typeof UpdateProductSchema>["data"];
export type DeleteProductParams = z.infer<typeof DeleteProductSchema>;
export type ToggleStockParams = z.infer<typeof ToggleStockSchema>;
export type DeleteProductImageParams = z.infer<typeof DeleteProductImageSchema>;
