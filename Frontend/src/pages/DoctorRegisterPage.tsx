import { useOutletContext } from "react-router-dom";
import Container from "../components/reusable/Container";

import RegisterForm from "../components/forms/RegisterForm";

import { Admin } from "../roles/Admin";
import H1 from "../components/reusable/h/H1";

const RegisterPage = () => {
  const globalParams: { user: Admin } = useOutletContext();
  return (
    <Container>
      <div className="flex flex-col gap-4">
        <H1>Register Doctor</H1>
        <RegisterForm
          sendData={globalParams.user.registerDoctor.bind(globalParams.user)}
          className="flex flex-col items-center gap-4 "
          registerDoctor={true}
        />
      </div>
    </Container>
  );
};

export default RegisterPage;
