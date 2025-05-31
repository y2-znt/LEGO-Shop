import { OrderStatus } from "@prisma/client";
import { z } from "zod";

export const UpdateOrderSchema = z.object({
  orderId: z.string().min(1),
  status: z.nativeEnum(OrderStatus),
});

export type UpdateOrderData = z.infer<typeof UpdateOrderSchema>;
