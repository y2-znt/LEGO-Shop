import FormWrap from "../components/FormWrap";
import Header from "../components/Header";
import RegisterForm from "./RegisterForm";

export default function page() {
  return (
    <div>
      <Header />
      <FormWrap>
        <RegisterForm />
      </FormWrap>
    </div>
  );
}
