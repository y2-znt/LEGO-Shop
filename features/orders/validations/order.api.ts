import { z } from "zod";

export const DeleteOrderSchema = z.object({
  orderId: z.string().min(1),
});

export type DeleteOrderParams = z.infer<typeof DeleteOrderSchema>;
