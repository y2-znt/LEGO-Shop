import { Role } from "@prisma/client";

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
