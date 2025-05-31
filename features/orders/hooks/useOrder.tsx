import { useToastMutation } from "@/hooks/useToastMutation";
import { OrderDetails } from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import {
  deleteOrderForCurrentUser,
  getAllOrdersForCurrentUser,
} from "@/features/orders/lib/orderApi";

export const useOrderForCurrentUser = () => {
  return useQuery<OrderDetails[]>({
    queryKey: ["me/orders"],
    queryFn: getAllOrdersForCurrentUser,
  });
};

export const useDeleteOrderForCurrentUser = () => {
  const queryClient = useQueryClient();

  const deleteOrderMutation = useToastMutation({
    mutationFn: (orderId: string) => deleteOrderForCurrentUser(orderId),
    loadingMessage: "Deleting order, please wait...",
    successMessage: "Order deleted successfully",
    errorMessage: "Error deleting order",
    options: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["me/orders"] });
      },
    },
  });

  return {
    deleteOrder: deleteOrderMutation.mutate,
  };
};
