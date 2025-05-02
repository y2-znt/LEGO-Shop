import { CartItem, useCartStore } from "@/stores/CartStore";
import { Product } from "@prisma/client";
import { toast } from "sonner";

export const useCartActions = () => {
  const { removeFromCart, increaseQty, decreaseQty, clearCart, addToCart } =
    useCartStore();

  return {
    add: (product: Product) => {
      addToCart({ ...product, quantity: 1 });
      toast.success(`${product.name} added to cart 🧺`);
    },
    remove: (item: CartItem) => {
      removeFromCart(item.id);
      toast.warning(`${item.name} removed from cart`);
    },
    increase: (item: CartItem) => {
      increaseQty(item.id, item.quantity + 1);
      toast.info(`${item.name} increased in cart`);
    },
    decrease: (item: CartItem) => {
      decreaseQty(item.id, 1);
      toast.info(`${item.name} decreased in cart`);
    },
    clear: () => {
      clearCart();
      toast.error("Cart cleared");
    },
    clearOnSuccess: () => {
      clearCart();
    },
  };
};
