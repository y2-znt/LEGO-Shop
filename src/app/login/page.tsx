import { getCurrentUser } from "../components/getCurrentUser";
import Header from "../components/Nav/Header";
import LoginForm from "./LoginForm";

export default async function Login() {
  const currentUser = await getCurrentUser();
  return (
    <div>
      <Header />
      <LoginForm currentUser={currentUser} />
    </div>
  );
}
