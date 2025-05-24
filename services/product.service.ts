import { prisma } from "@/lib/prisma";

export const getProducts = async () => {
  const products = await prisma.product.findMany({
    orderBy: [{ inStock: "desc" }, { updatedAt: "desc" }],
  });
  return products;
};

export const createProduct = async (data: {
  name: string;
  price: string;
  inStock: boolean;
  image: string;
}) => {
  const { name, price, inStock, image } = data;
  return prisma.product.create({
    data: {
      name,
      price: parseFloat(price),
      inStock,
      image,
    },
  });
};

export const updateProduct = async (
  id: string,
  data: { name?: string; price?: string; inStock?: boolean }
) => {
  const { name, price, inStock } = data;
  return prisma.product.update({
    where: { id },
    data: {
      name,
      price: price ? parseFloat(price) : undefined,
      inStock,
    },
  });
};

export const deleteProduct = async (id: string) => {
  return prisma.product.delete({
    where: { id },
  });
};
