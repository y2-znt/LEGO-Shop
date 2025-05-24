import { OrderStatus } from "@prisma/client";

import { prisma } from "@/lib/prisma";

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

export const getAllOrders = async () => {
  const orders = await prisma.order.findMany({
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

export const updateOrderStatus = async (
  orderId: string,
  status: OrderStatus
) => {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
  });

  if (!order) {
    throw new Error("Order not found");
  }

  return await prisma.order.update({
    where: { id: orderId },
    data: { status },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
      user: true,
    },
  });
};

export const getOrderStats = async () => {
  const [
    totalOrders,
    pendingOrders,
    paidOrders,
    cancelledOrders,
    totalRevenue,
  ] = await Promise.all([
    prisma.order.count(),
    prisma.order.count({ where: { status: "PENDING" } }),
    prisma.order.count({ where: { status: "PAID" } }),
    prisma.order.count({ where: { status: "CANCELLED" } }),
    prisma.order.aggregate({
      where: { status: "PAID" },
      _sum: { amount: true },
    }),
  ]);

  return {
    totalOrders,
    pendingOrders,
    paidOrders,
    cancelledOrders,
    totalRevenue: totalRevenue._sum.amount || 0,
  };
};
