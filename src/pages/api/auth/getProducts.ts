import prisma from "../../../../prisma/prismadb";

export default async function getProducts() {
  const products = await prisma.product.findMany({
    orderBy: [{ inStock: "desc" }, { createdAt: "asc" }],
  });
  return products;
}
