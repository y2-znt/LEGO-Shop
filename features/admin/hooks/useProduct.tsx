import { useToastMutation } from "@/hooks/useToastMutation";
import { Product } from "@prisma/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createProduct,
  deleteProduct,
  deleteProductImage,
  getAllProducts,
  toggleStock,
  updateProduct,
} from "@/features/admin/lib/productApi";

export const useProducts = () => {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  const createProductMutation = useToastMutation({
    mutationFn: createProduct,
    loadingMessage: "Creating LEGO, please wait...",
    successMessage: "LEGO created successfully",
    errorMessage: "Error creating LEGO",
    options: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["products"] });
      },
    },
  });

  return {
    createProduct: createProductMutation.mutate,
    isLoading: createProductMutation.isPending,
  };
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  const updateProductMutation = useToastMutation({
    mutationFn: updateProduct,
    loadingMessage: "Updating LEGO, please wait...",
    successMessage: "LEGO updated successfully!",
    errorMessage: "Error updating LEGO",
    options: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["products"] });
      },
    },
  });

  return {
    updateProduct: updateProductMutation.mutate,
  };
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  const deleteProductMutation = useToastMutation({
    mutationFn: deleteProduct,
    loadingMessage: "Deleting LEGO, please wait...",
    successMessage: "LEGO deleted successfully",
    errorMessage: "Error deleting LEGO",
    options: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["products"] });
      },
    },
  });

  return {
    deleteProduct: deleteProductMutation.mutate,
  };
};

export const useToggleStock = () => {
  const queryClient = useQueryClient();

  const toggleStockMutation = useToastMutation({
    mutationFn: toggleStock,
    loadingMessage: "Toggling stock, please wait...",
    successMessage: "Stock toggled successfully!",
    errorMessage: "Error toggling stock",
    options: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["products"] });
      },
    },
  });

  return {
    toggleStock: toggleStockMutation.mutate,
  };
};

export const useDeleteProductImage = () => {
  const deleteProductImageMutation = useToastMutation({
    mutationFn: deleteProductImage,
    loadingMessage: "Deleting image, please wait...",
    successMessage: "Image deleted successfully",
    errorMessage: "Error deleting image",
  });

  return {
    deleteProductImage: deleteProductImageMutation.mutate,
  };
};
