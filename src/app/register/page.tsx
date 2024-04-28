import { getCurrentUser } from "../../pages/api/auth/getCurrentUser";
import Header from "../components/Nav/Header";
import RegisterForm from "./RegisterForm";

export default async function page() {
  const currentUser = await getCurrentUser();
  return (
    <div>
      <Header />
      <RegisterForm currentUser={currentUser} />
    </div>
  );
}
