"use client";
import ActionBtn from "@/components/shared/admin/ActionBtn";
import Status from "@/components/shared/admin/Status";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useDeleteUser,
  useToggleUserRole,
  useUpdateUser,
  useUser,
} from "@/hooks/useUser";
import { Role } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdCached, MdCheck, MdDelete, MdEdit } from "react-icons/md";

export default function ManageUsersClient() {
  const router = useRouter();
  const [editingId, setEditingId] = useState("");
  const [editValues, setEditValues] = useState({ name: "" });
  const { data: allUsers } = useUser();
  const { updateUser } = useUpdateUser();
  const { deleteUser } = useDeleteUser();
  const { toggleUserRole } = useToggleUserRole();

  const handleToggleRole = (id: string, currentRole: Role) => {
    toggleUserRole({ id, currentRole });
    router.refresh();
  };

  const handleDeleteUser = (id: string) => {
    deleteUser(id);
  };

  const handleEditClick = (id: string, name: string | null) => {
    setEditingId(id);
    setEditValues({ name: name ?? "" });
  };

  const handleSaveClick = (id: string) => {
    updateUser({ id, data: { name: editValues.name } });
    router.refresh();
  };

  return (
    <div>
      <h1 className="text-3xl max-sm:text-[1.7rem] lg:text-4xl">
        Manage Users
      </h1>
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
                <TableCell>{user.email}</TableCell>
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
                      onClick={() => handleEditClick(user.id, user.name)}
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
