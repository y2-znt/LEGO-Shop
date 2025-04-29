import AccesDenied from "@/components/ui/AccesDenied";
import { getAllUsers, getCurrentUser } from "@/services/user.service";
import ManageUsersClient from "./ManageUsersClient";
export const revalidate = 0;

export default async function page() {
  const currentUser = await getCurrentUser();
  const allUsers = await getAllUsers();

  // Check if the current user is not authenticated or is not an admin
  if (!currentUser || currentUser.role !== "ADMIN") {
    return <AccesDenied title="Oops! Acces denied" />;
  }
  return (
    <div>
      <h1 className="text-3xl max-sm:text-[1.7rem] lg:text-4xl">
        Manage Users
      </h1>
      <ManageUsersClient allUsers={allUsers} />
    </div>
  );
}
