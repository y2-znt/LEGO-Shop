import { useToastMutation } from "@/hooks/useToastMutation";
import { Product } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createProduct,
  deleteProduct,
  deleteProductImage,
  getAllProducts,
  toggleStock,
  updateProduct,
} from "@/features/admin/lib/productApi";

import { CreateProductData, UpdateProductData } from "../types/adminTypes";

export const useProduct = () => {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  const createProductMutation = useToastMutation({
    mutationFn: (data: CreateProductData) => createProduct(data),
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
    mutationFn: ({ id, data }: { id: string; data: UpdateProductData }) =>
      updateProduct(id, data),
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
    mutationFn: (id: string) => deleteProduct(id),
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
    mutationFn: ({ id, inStock }: { id: string; inStock: boolean }) =>
      toggleStock(id, inStock),
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
  const deleteProductImageMutation = useMutation({
    mutationFn: (imageUrl: string) => deleteProductImage(imageUrl),
  });

  return {
    deleteProductImage: deleteProductImageMutation.mutate,
  };
};
