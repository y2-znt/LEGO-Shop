import prisma from "@/lib/prisma";

export const getOrdersByCurrentUser = async (userId: string) => {
  const orders = await prisma.order.findMany({
    where: {
      userId: userId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return orders;
};
