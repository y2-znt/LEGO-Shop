import { getAllOrders } from "@/lib/api/orderApi";
import { OrderDetails } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useOrder = () => {
  return useQuery<OrderDetails[]>({
    queryKey: ["me/orders"],
    queryFn: async () => {
      const orders = await getAllOrders();
      return orders;
    },
  });
};
