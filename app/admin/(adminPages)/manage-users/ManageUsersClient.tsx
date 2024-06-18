"use client";
import { Role, User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { MdCached } from "react-icons/md";
import { toast } from "sonner";
import ActionBtn from "../../../../components/ui/ActionBtn";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/shadcn/table";

type ManageUsersClientType = {
  allUsers: User[];
};

export default function ManageUsersClient({ allUsers }: ManageUsersClientType) {
  const router = useRouter();

  const handleToggleRole = async (id: string, currentRole: Role) => {
    try {
      let newRole;
      if (currentRole === "USER") {
        newRole = "ADMIN";
      } else {
        newRole = "USER";
      }
      await axios.put("/api/user", {
        id,
        role: newRole,
      });

      toast.success("User role updated successfully!");
      router.refresh();
    } catch (error) {
      toast.error("Oops! Something went wrong");
    }
  };
  return (
    <div>
      <Table className="mt-10">
        <TableCaption>A list of your products.</TableCaption>
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
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {new Date(user.updatedAt).toLocaleDateString()} -
                  {new Date(user.updatedAt).toLocaleTimeString()}
                </TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell className="flex gap-4 pt-5">
                  <ActionBtn
                    icon={MdCached}
                    onClick={() => handleToggleRole(user.id, user.role)}
                  />
                  {/* {editingId === user.id ? (
                    <ActionBtn
                      icon={MdCheck}
                      onClick={() => handleSaveClick(user.id)}
                    />
                  ) : (
                    <ActionBtn
                      icon={MdEdit}
                      onClick={() =>
                        handleEditClick(user.id, user.name)
                      }
                    />
                  )}
                  <ActionBtn
                    icon={MdDelete}
                    onClick={() => {
                      handleDeleteUser(user.id);
                    }} */}
                  {/* /> */}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
