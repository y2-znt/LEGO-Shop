import { OrderStatus } from "@prisma/client";

export interface UpdateOrderData {
  orderId: string;
  status: OrderStatus;
}
