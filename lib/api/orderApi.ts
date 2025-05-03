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
