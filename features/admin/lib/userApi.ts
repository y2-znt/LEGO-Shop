import { Role, User } from "@prisma/client";

import { UpdateUserData } from "../types/adminTypes";

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
    const response = await fetch(`/api/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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

export const deleteUser = async ({ id }: { id: string }) => {
  try {
    const response = await fetch(`/api/users/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete user");
    }
    return await response.json();
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
