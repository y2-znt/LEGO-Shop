"use client";
import ActionBtn from "@/components/ui/ActionBtn";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/shadcn/table";
import Status from "@/components/ui/Status";
import { Role, User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdCached, MdCheck, MdDelete, MdEdit } from "react-icons/md";
import { toast } from "sonner";

type ManageUsersClientType = {
  allUsers: User[];
};

export default function ManageUsersClient({ allUsers }: ManageUsersClientType) {
  const router = useRouter();
  const [editingId, setEditingId] = useState("");
  const [editValues, setEditValues] = useState({ name: "", email: "" });

  const handleToggleRole = async (id: string, currentRole: Role) => {
    toast("Update user role, please wait...");

    try {
      let newRole;
      if (currentRole === "USER") {
        newRole = "ADMIN";
      } else {
        newRole = "USER";
      }
      await axios.put("/api/users", {
        id,
        role: newRole,
      });

      toast.success("User role updated successfully!");
      router.refresh();
    } catch (error) {
      toast.error("Oops! Something went wrong");
    }
  };

  const handleDeleteUser = async (id: string) => {
    toast("Deleting user, please wait...");

    axios
      .delete(`/api/users/${id}`)
      .then((res) => {
        toast.success("User deleted successfully");
        router.refresh();
      })
      .catch((error) => {
        toast.error("Error deleting user");
        console.log("Error deleting user", error);
      });
  };

  const handleEditClick = (id: string, name: string | null, email: string) => {
    setEditingId(id);
    // Pre-filling fields with current product values
    setEditValues({ name: name ?? "", email });
  };

  const handleSaveClick = async (id: string) => {
    toast("Update user, please wait...");

    try {
      await axios.put(`/api/users/${id}`, {
        id,
        name: editValues.name,
        email: editValues.email,
      });

      toast.success("User updated successfully!");
      setEditingId("");
      router.refresh();
    } catch (error) {
      toast.error("Oops! Something went wrong");
    }
  };

  return (
    <div>
      <Table className="mt-10">
        <TableCaption>A list of your users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>email</TableHead>
            <TableHead>Update At</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allUsers &&
            allUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  {editingId === user.id ? (
                    <input
                      type="text"
                      value={editValues.name}
                      className="border p-1"
                      onChange={(e) =>
                        setEditValues({ ...editValues, name: e.target.value })
                      }
                    />
                  ) : (
                    user.name
                  )}
                </TableCell>
                <TableCell>
                  {editingId === user.id ? (
                    <input
                      type="text"
                      value={editValues.email}
                      className="border p-1"
                      onChange={(e) =>
                        setEditValues({ ...editValues, name: e.target.value })
                      }
                    />
                  ) : (
                    user.email
                  )}
                </TableCell>
                <TableCell>
                  {new Date(user.updatedAt).toLocaleDateString()} -
                  {new Date(user.updatedAt).toLocaleTimeString()}
                </TableCell>
                <TableCell>
                  {user.role === "ADMIN" ? (
                    <Status text="Admin" color="bg-blue-500" width="w-20" />
                  ) : (
                    <Status text="Client" color="bg-yellow-500" width="w-20" />
                  )}
                </TableCell>
                <TableCell className="flex gap-4 py-4">
                  <ActionBtn
                    icon={MdCached}
                    onClick={() => handleToggleRole(user.id, user.role)}
                  />
                  {editingId === user.id ? (
                    <ActionBtn
                      icon={MdCheck}
                      onClick={() => handleSaveClick(user.id)}
                    />
                  ) : (
                    <ActionBtn
                      icon={MdEdit}
                      onClick={() =>
                        handleEditClick(user.id, user.name, user.email)
                      }
                    />
                  )}
                  <ActionBtn
                    icon={MdDelete}
                    onClick={() => {
                      handleDeleteUser(user.id);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
