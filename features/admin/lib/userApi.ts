import { Role, User } from "@prisma/client";

import {
  DeleteUserParams,
  DeleteUserSchema,
  UpdateUserData,
  UpdateUserSchema,
} from "../schemas/user.api.schema";

export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch("/api/users");
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching users", error);
    throw error;
  }
};

export const updateUser = async ({
  id,
  data,
}: {
  id: string;
  data: UpdateUserData;
}) => {
  try {
    const validatedData = UpdateUserSchema.shape.data.parse(data);
    const response = await fetch(`/api/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedData),
    });
    if (!response.ok) {
      throw new Error("Failed to update user");
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating user", error);
    throw error;
  }
};

export const deleteUser = async (params: DeleteUserParams) => {
  try {
    const { id } = DeleteUserSchema.parse(params);
    const response = await fetch(`/api/users/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete user");
    }
  } catch (error) {
    console.error("Error deleting user", error);
    throw error;
  }
};

export const toggleUserRole = async ({
  id,
  currentRole,
}: {
  id: string;
  currentRole: Role;
}) => {
  const newRole = currentRole === "USER" ? "ADMIN" : "USER";
  return updateUser({ id, data: { role: newRole } });
};
