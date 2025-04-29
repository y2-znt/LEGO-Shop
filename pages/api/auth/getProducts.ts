import prisma from "@/prisma/prismadb";

export default async function getProducts() {
  const products = await prisma.product.findMany({
    orderBy: [{ inStock: "desc" }, { updatedAt: "desc" }],
  });
  return products;
}
