import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface FavoriteItem {
  id: string;
  name: string;
  price: number;
  image: string;
  inStock: boolean;
  quantity: number;
}

export interface FavoriteState {
  items: FavoriteItem[];
  addToFavorites: (item: FavoriteItem) => void;
  removeFromFavorites: (id: string) => void;
  getTotalQuantity: () => number;
}

export const useFavoriteStore = create<FavoriteState>()(
  persist(
    (set, get) => ({
      items: [],
      addToFavorites: (item) =>
        set((state) => ({ items: [...state.items, item] })),
      removeFromFavorites: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      getTotalQuantity: () =>
        get().items.reduce((total, item) => total + item.quantity, 0),
    }),
    {
      name: "favorite-items",
      partialize: (state) => ({ items: state.items }),
    }
  )
);
