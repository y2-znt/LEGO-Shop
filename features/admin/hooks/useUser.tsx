import { useToastMutation } from "@/hooks/useToastMutation";
import { User } from "@prisma/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import {
  deleteUser,
  getUsers,
  toggleUserRole,
  updateUser,
} from "@/features/admin/lib/userApi";

export const useUsers = () => {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: getUsers,
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  const updateUserMutation = useToastMutation({
    mutationFn: updateUser,
    loadingMessage: "Updating user, please wait...",
    successMessage: "User updated successfully!",
    errorMessage: "Error updating user",
    options: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
      },
    },
  });
  return {
    updateUser: updateUserMutation.mutate,
  };
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  const deleteUserMutation = useToastMutation({
    mutationFn: deleteUser,
    loadingMessage: "Deleting user, please wait...",
    successMessage: "User deleted successfully!",
    errorMessage: "Error deleting user",
    options: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
      },
    },
  });

  return {
    deleteUser: deleteUserMutation.mutate,
  };
};

export const useToggleUserRole = () => {
  const queryClient = useQueryClient();

  const toggleUserRoleMutation = useToastMutation({
    mutationFn: toggleUserRole,
    loadingMessage: "Toggling user role, please wait...",
    successMessage: "User role toggled successfully!",
    errorMessage: "Error toggling user role",
    options: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
      },
    },
  });

  return {
    toggleUserRole: toggleUserRoleMutation.mutate,
  };
};
