import { getAllUsers } from "@/services/user.service";
import ManageUsersClient from "./ManageUsersClient";
export const revalidate = 0;

export default async function page() {
  const allUsers = await getAllUsers();

  return (
    <div>
      <h1 className="text-3xl max-sm:text-[1.7rem] lg:text-4xl">
        Manage Users
      </h1>
      <ManageUsersClient allUsers={allUsers} />
    </div>
  );
}
