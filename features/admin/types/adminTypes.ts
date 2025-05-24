import { OrderStatus, Role } from "@prisma/client";

export interface CreateProductData {
  name: string;
  price: string | number;
  inStock: boolean;
  image: File;
}

export interface UpdateProductData {
  name?: string;
  price?: number;
  inStock?: boolean;
}

export interface UpdateOrderData {
  orderId: string;
  status: OrderStatus;
}

export interface UpdateUserData {
  name?: string;
  role?: Role;
}
