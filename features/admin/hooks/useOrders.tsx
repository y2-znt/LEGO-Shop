import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

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

  const updateOrderStatus = useMutation({
    mutationFn: (data: UpdateOrderData) =>
      updateOrderStatusAPI(data.orderId, data.status),
    onMutate: () => {
      const toastId = toast.loading("Updating order status...");
      return { toastId };
    },
    onSuccess: (_, __, context) => {
      if (context?.toastId) {
        toast.dismiss(context.toastId);
      }
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
      toast.success("Order status updated successfully");
    },
    onError: (error, _, context) => {
      if (context?.toastId) {
        toast.dismiss(context.toastId);
      }
      console.error(error);
      toast.error("Failed to update order status");
    },
  });

  return {
    updateOrderStatus: updateOrderStatus.mutate,
    isUpdating: updateOrderStatus.isPending,
  };
};
