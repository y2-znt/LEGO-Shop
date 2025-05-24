import { OrderDetails } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  deleteOrderForCurrentUser,
  getAllOrdersForCurrentUser,
} from "@/features/orders/lib/orderApi";

export const useOrderForCurrentUser = () => {
  return useQuery<OrderDetails[]>({
    queryKey: ["me/orders"],
    queryFn: async () => {
      const orders = await getAllOrdersForCurrentUser();
      return orders;
    },
  });
};

export const useDeleteOrderForCurrentUser = () => {
  const queryClient = useQueryClient();

  const deleteOrderMutation = useMutation({
    mutationFn: async (orderId: string) => {
      return await deleteOrderForCurrentUser(orderId);
    },
    onMutate: () => {
      const toastId = toast.loading("Deleting order, please wait...");
      return { toastId };
    },
    onSuccess: (_, __, context) => {
      if (context?.toastId) {
        toast.dismiss(context.toastId);
      }
      toast.success("Order deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["me/orders"] });
    },
    onError: (error: Error, _, context) => {
      if (context?.toastId) {
        toast.dismiss(context.toastId);
      }
      toast.error("Error deleting order");
      console.error("Error deleting order:", error);
    },
  });

  return {
    deleteOrder: deleteOrderMutation.mutate,
  };
};
