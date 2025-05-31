import { useToastMutation } from "@/hooks/useToastMutation";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import type { OrdersResponse } from "../lib/ordersAPI";
import {
  getAllOrders,
  updateOrderStatus as updateOrderStatusAPI,
} from "../lib/ordersAPI";
import { UpdateOrderData } from "../types/adminTypes";

export const useGetOrders = () => {
  const { data, isLoading } = useQuery<OrdersResponse>({
    queryKey: ["admin-orders"],
    queryFn: getAllOrders,
  });

  return {
    orders: data?.orders || [],
    stats: data?.stats,
    isLoading,
  };
};

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();

  const updateOrderStatus = useToastMutation({
    mutationFn: (data: UpdateOrderData) =>
      updateOrderStatusAPI(data.orderId, data.status),
    loadingMessage: "Updating order status...",
    successMessage: "Order status updated successfully",
    errorMessage: "Failed to update order status",
    options: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
      },
    },
  });

  return {
    updateOrderStatus: updateOrderStatus.mutate,
    isUpdating: updateOrderStatus.isPending,
  };
};
