import AccesDenied from "@/components/ui/AccesDenied";
import { getCurrentUser } from "@/pages/api/auth/getCurrentUser";

export default async function page() {
  const currentUser = await getCurrentUser();

  // Check if the current user is not authenticated or is not an admin
  if (!currentUser || currentUser.role !== "ADMIN") {
    return <AccesDenied title="Oops! Acces denied" />;
  }
  return (
    <div>
      <h1 className="text-3xl lg:text-4xl pt-10 max-sm:text-[1.7rem]">
        Manage Products
      </h1>
    </div>
  );
}
