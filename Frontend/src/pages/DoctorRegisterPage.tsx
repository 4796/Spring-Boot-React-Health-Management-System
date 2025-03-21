import { useOutletContext } from "react-router-dom";
import Container from "../components/reusable/Container";

import RegisterForm from "../components/forms/RegisterForm";

import { Admin } from "../roles/Admin";

const RegisterPage = () => {
  const globalParams: { user: Admin } = useOutletContext();
  return (
    <Container>
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl text-sky-700 font-bold my-4">
          Register Doctor
        </h1>
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
