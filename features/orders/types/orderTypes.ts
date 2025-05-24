import { OrderStatus } from "@prisma/client";

export interface OrderDetails {
  id: string;
  status: OrderStatus;
  amount: number;
  createdAt: Date;
  orderItems: {
    id: string;
    quantity: number;
    product: {
      id: string;
      name: string;
      price: number;
      image: string;
    };
  }[];
}
