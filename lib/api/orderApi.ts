import { OrderDetails } from "@/types";

export const getAllOrders = async (): Promise<OrderDetails[]> => {
  try {
    const response = await fetch("/api/orders/me");
    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching orders", error);
    throw new Error("An error occurred while fetching orders");
  }
};

export const deleteOrderForCurrentUser = async (orderId: string) => {
  try {
    const response = await fetch(`/api/orders/me/${orderId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete order");
    }
    return await response.json();
  } catch (error) {
    console.error("Error deleting order", error);
  }
};
