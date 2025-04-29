import { z } from "zod";

export const AddProductFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  price: z.string().min(1, { message: "Price is required" }),
  inStock: z.boolean(),
  image: z.instanceof(File, { message: "Une image est requise" }).nullable(),
});

// prettier-ignore
export type AddProductFormData = z.infer<typeof AddProductFormSchema>;
