import AccesDenied from "../../../../components/ui/AccesDenied";
import { getCurrentUser } from "../../../../pages/api/auth/getCurrentUser";
export const revalidate = 0;

export default async function page() {
  const currentUser = await getCurrentUser();

  // Check if the current user is not authenticated or is not an admin
  if (!currentUser || currentUser.role !== "ADMIN") {
    return <AccesDenied title="Oops! Acces denied" />;
  }
  return (
    <div>
      <h1 className="pt-10 text-3xl max-sm:text-[1.7rem] lg:text-4xl">
        Manage Users
      </h1>
    </div>
  );
}
