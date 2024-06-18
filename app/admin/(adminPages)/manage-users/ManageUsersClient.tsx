import { User } from "@prisma/client";

type ManageUsersClientType = {
  allUsers: User[];
};
export default function ManageUsersClient({ allUsers }: ManageUsersClientType) {
  return <div>ManageUsersClient</div>;
}
