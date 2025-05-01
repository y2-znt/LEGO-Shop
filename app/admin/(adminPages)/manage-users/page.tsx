import ManageUsersClient from "./ManageUsersClient";

export default async function page() {
  return (
    <div>
      <h1 className="text-3xl max-sm:text-[1.7rem] lg:text-4xl">
        Manage Users
      </h1>
      <ManageUsersClient />
    </div>
  );
}
