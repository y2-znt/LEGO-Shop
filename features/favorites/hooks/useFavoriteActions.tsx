import { Product } from "@prisma/client";
import { toast } from "sonner";

import { FavoriteItem, useFavoriteStore } from "@/stores/FavoriteStore";

export const useFavoriteActions = () => {
  const { addToFavorites, removeFromFavorites } = useFavoriteStore();

  return {
    add: (product: Product) => {
      addToFavorites({ ...product, quantity: 1 });
      toast.success(`${product.name} added to favorites`);
    },
    remove: (item: Product | FavoriteItem) => {
      removeFromFavorites(item.id);
      toast.warning(`${item.name} removed from favorites`);
    },
  };
};
