import { OrderStatus, Role } from "@prisma/client";

export interface UpdateUserData {
  name?: string;
  role?: Role;
}

export interface UpdateProductData {
  name?: string;
  price?: number;
  inStock?: boolean;
}

export interface CreateProductData {
  name: string;
  price: string | number;
  inStock: boolean;
  image: File;
}

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
