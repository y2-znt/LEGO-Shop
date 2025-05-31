import { Order as PrismaOrder, User } from "@prisma/client";

import {
  UpdateOrderData,
  UpdateOrderSchema,
} from "../validations/api/orders.api.schema";

export interface Order extends PrismaOrder {
  user: User;
}

export interface OrdersResponse {
  orders: Order[];
  stats: {
    totalOrders: number;
    pendingOrders: number;
    paidOrders: number;
    cancelledOrders: number;
    totalRevenue: number;
  };
}

export const getAllOrders = async (): Promise<OrdersResponse> => {
  try {
    const response = await fetch("/api/orders");
    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw new Error("An error occurred while fetching orders");
  }
};

export const updateOrderStatus = async (params: UpdateOrderData) => {
  try {
    const { orderId, status } = UpdateOrderSchema.parse(params);
    const response = await fetch(`/api/orders/${orderId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      throw new Error("Failed to update order status");
    }

    return response.json();
  } catch (error) {
    console.error("Error updating order status:", error);
    throw new Error("An error occurred while updating order status");
  }
};
