import { useToastMutation } from "@/hooks/useToastMutation";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import type { OrdersResponse } from "../lib/ordersAPI";
import { getAllOrders, updateOrderStatus } from "../lib/ordersAPI";

export const useGetOrders = () => {
  const { data } = useQuery<OrdersResponse>({
    queryKey: ["admin-orders"],
    queryFn: getAllOrders,
  });

  return {
    orders: data?.orders || [],
    stats: data?.stats,
  };
};

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();

  const updateOrderStatusMutation = useToastMutation({
    mutationFn: updateOrderStatus,
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
    updateOrderStatus: updateOrderStatusMutation.mutate,
    isUpdating: updateOrderStatusMutation.isPending,
  };
};
