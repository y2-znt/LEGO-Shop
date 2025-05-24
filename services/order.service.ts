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

export const deleteOrderForCurrentUser = async (
  orderId: string,
  userId: string
) => {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
  });

  if (!order) {
    throw new Error("Order not found");
  }

  if (order.userId !== userId) {
    throw new Error("Unauthorized: This order belongs to another user");
  }

  await prisma.order.delete({
    where: { id: orderId },
  });
};
