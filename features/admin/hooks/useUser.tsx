import { UpdateUserData } from "@/types";
import { Role } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  deleteUser,
  getUsers,
  toggleUserRole,
  updateUser,
} from "@/features/admin/lib/userApi";

export const useUser = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const users = await getUsers();
      return users;
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  const updateUserMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateUserData }) => {
      return await updateUser(id, data);
    },
    onMutate: () => {
      const toastId = toast.loading("Updating user, please wait...");
      return { toastId };
    },
    onSuccess: (_, __, context) => {
      if (context?.toastId) {
        toast.dismiss(context.toastId);
      }
      toast.success("User updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error: Error, _, context) => {
      if (context?.toastId) {
        toast.dismiss(context.toastId);
      }
      toast.error("Error updating user");
      console.error("Error updating user:", error);
    },
  });
  return {
    updateUser: updateUserMutation.mutate,
  };
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  const deleteUserMutation = useMutation({
    mutationFn: async (id: string) => {
      return await deleteUser(id);
    },
    onMutate: () => {
      const toastId = toast.loading("Deleting user, please wait...");
      return { toastId };
    },
    onSuccess: (_, __, context) => {
      if (context?.toastId) {
        toast.dismiss(context.toastId);
      }

      toast.success("User deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error: Error, _, context) => {
      if (context?.toastId) {
        toast.dismiss(context.toastId);
      }
      toast.error("Error deleting user");
      console.error("Error deleting user:", error);
    },
  });

  return {
    deleteUser: deleteUserMutation.mutate,
  };
};

export const useToggleUserRole = () => {
  const queryClient = useQueryClient();

  const toggleUserRoleMutation = useMutation({
    mutationFn: async ({
      id,
      currentRole,
    }: {
      id: string;
      currentRole: Role;
    }) => {
      return await toggleUserRole(id, currentRole);
    },
    onMutate: () => {
      const toastId = toast.loading("Toggling user role, please wait...");
      return { toastId };
    },
    onSuccess: (_, __, context) => {
      if (context?.toastId) {
        toast.dismiss(context.toastId);
      }
      toast.success("User role toggled successfully!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error: Error, _, context) => {
      if (context?.toastId) {
        toast.dismiss(context.toastId);
      }
      toast.error("Error toggling user role");
      console.error("Error toggling user role:", error);
    },
  });

  return {
    toggleUserRole: toggleUserRoleMutation.mutate,
  };
};
