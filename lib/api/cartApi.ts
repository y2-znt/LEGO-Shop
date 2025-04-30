export const cartApi = {
  getCart: async (userId: string) => {
    try {
      const res = await fetch(`/api/cart/${userId}`);
      if (!res.ok) throw new Error("Erreur lors du chargement du panier");
      return res.json();
    } catch (error) {
      console.error("Failed to get cart:", error);
      throw error;
    }
  },

  addToCart: async (userId: string, productId: string, quantity: number) => {
    try {
      const res = await fetch(`/api/cart/${userId}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity }),
      });
      if (!res.ok) throw new Error("Erreur lors de l'ajout au panier");
      return res.json();
    } catch (error) {
      console.error("Failed to add to cart:", error);
      throw error;
    }
  },

  updateQuantity: async (
    userId: string,
    productId: string,
    quantity: number,
  ) => {
    try {
      const res = await fetch(`/api/cart/${userId}/items/${productId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity }),
      });
      if (!res.ok) throw new Error("Erreur lors de la mise à jour");
      return res.json();
    } catch (error) {
      console.error("Failed to update quantity:", error);
      throw error;
    }
  },

  removeFromCart: async (userId: string, productId: string) => {
    try {
      const res = await fetch(`/api/cart/${userId}/items/${productId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Erreur lors de la suppression");
    } catch (error) {
      console.error("Failed to remove from cart:", error);
      throw error;
    }
  },

  clearCart: async (userId: string) => {
    try {
      const res = await fetch(`/api/cart/${userId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Erreur lors du vidage du panier");
    } catch (error) {
      console.error("Failed to clear cart:", error);
      throw error;
    }
  },
};
