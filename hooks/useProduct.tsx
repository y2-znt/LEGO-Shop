import {
  deleteProduct,
  deleteProductImage,
  getAllProducts,
  toggleStock,
  updateProduct,
} from "@/lib/api/productApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface UpdateProductData {
  name: string;
  price: number;
  inStock?: boolean;
}

export const useProduct = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const products = await getAllProducts();
      return products;
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  const updateProductMutation = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: UpdateProductData;
    }) => {
      return await updateProduct(id, data);
    },
    onMutate: () => {
      const toastId = toast.loading("Updating LEGO, please wait...");
      return { toastId };
    },
    onSuccess: (_, __, context) => {
      if (context?.toastId) {
        toast.dismiss(context.toastId);
      }
      toast.success("LEGO updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error: Error, _, context) => {
      if (context?.toastId) {
        toast.dismiss(context.toastId);
      }
      toast.error("Error updating LEGO");
      console.error("Error updating LEGO:", error);
    },
  });

  return {
    updateProduct: updateProductMutation.mutate,
  };
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  const deleteProductMutation = useMutation({
    mutationFn: async (id: string) => {
      return await deleteProduct(id);
    },
    onMutate: () => {
      const toastId = toast.loading("Deleting LEGO, please wait...");
      return { toastId };
    },
    onSuccess: (_, __, context) => {
      if (context?.toastId) {
        toast.dismiss(context.toastId);
      }

      toast.success("LEGO deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error: Error, _, context) => {
      if (context?.toastId) {
        toast.dismiss(context.toastId);
      }
      toast.error("Error deleting LEGO");
      console.error("Error deleting LEGO:", error);
    },
  });

  return {
    deleteProduct: deleteProductMutation.mutate,
  };
};

export const useToggleStock = () => {
  const queryClient = useQueryClient();

  const toggleStockMutation = useMutation({
    mutationFn: async ({ id, inStock }: { id: string; inStock: boolean }) => {
      return await toggleStock(id, inStock);
    },
    onMutate: () => {
      const toastId = toast.loading("Toggling stock, please wait...");
      return { toastId };
    },
    onSuccess: (_, __, context) => {
      if (context?.toastId) {
        toast.dismiss(context.toastId);
      }
      toast.success("Stock toggled successfully!");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error: Error, _, context) => {
      if (context?.toastId) {
        toast.dismiss(context.toastId);
      }
      toast.error("Error toggling stock");
      console.error("Error toggling stock:", error);
    },
  });

  return {
    toggleStock: toggleStockMutation.mutate,
  };
};

export const useDeleteProductImage = () => {
  const deleteProductImageMutation = useMutation({
    mutationFn: async (imageUrl: string) => {
      return await deleteProductImage(imageUrl);
    },
  });

  return {
    deleteProductImage: deleteProductImageMutation.mutate,
  };
};
