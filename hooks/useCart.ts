import { cartApi } from "@/lib/api/cartApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCart = (userId: string) => {
  const queryClient = useQueryClient();

  const { data: cart, isLoading } = useQuery({
    queryKey: ["cart", userId],
    queryFn: () => cartApi.getCart(userId),
  });

  const addToCart = useMutation({
    mutationFn: async ({
      productId,
      quantity,
    }: {
      productId: string;
      quantity: number;
    }) => {
      return cartApi.addToCart(userId, productId, quantity);
    },
    onMutate: () => {
      const toastId = toast.loading("Adding to cart...");
      return { toastId };
    },
    onSuccess: (_, __, context) => {
      if (context?.toastId) {
        toast.dismiss(context.toastId);
      }
      queryClient.invalidateQueries({ queryKey: ["cart", userId] });
      toast.success("Item added to cart");
    },
  });

  const updateQuantity = useMutation({
    mutationFn: async ({
      productId,
      quantity,
    }: {
      productId: string;
      quantity: number;
    }) => {
      return cartApi.updateQuantity(userId, productId, quantity);
    },
    onMutate: () => {
      const toastId = toast.loading("Updating quantity...");
      return { toastId };
    },
    onSuccess: (_, __, context) => {
      if (context?.toastId) {
        toast.dismiss(context.toastId);
      }
      queryClient.invalidateQueries({ queryKey: ["cart", userId] });
      toast.success("Quantity updated");
    },
  });

  const removeFromCart = useMutation({
    mutationFn: async (productId: string) => {
      return cartApi.removeFromCart(userId, productId);
    },
    onMutate: () => {
      const toastId = toast.loading("Removing from cart...");
      return { toastId };
    },
    onSuccess: (_, __, context) => {
      if (context?.toastId) {
        toast.dismiss(context.toastId);
      }
      queryClient.invalidateQueries({ queryKey: ["cart", userId] });
      toast.success("Item removed from cart");
    },
  });

  const clearCart = useMutation({
    mutationFn: async () => {
      return cartApi.clearCart(userId);
    },
    onMutate: () => {
      const toastId = toast.loading("Clearing cart...");
      return { toastId };
    },
    onSuccess: (_, __, context) => {
      if (context?.toastId) {
        toast.dismiss(context.toastId);
      }
      queryClient.invalidateQueries({ queryKey: ["cart", userId] });
      toast.success("Cart cleared");
    },
  });

  return {
    cart,
    isLoading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  };
};
