import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "../components/reusable/Container";

import Spinner from "../components/reusable/Spinner";

import { isLoggedIn } from "../services/session";
import RegisterForm from "../components/forms/RegisterForm";
import { register } from "../services/auth";

const RegisterPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  useEffect(() => {
    // redirect user if already logged in
    if (isLoggedIn()) navigate("/");
    setLoading(false);
  }, []);

  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <Container
      styleCssOverride="xl:px-32 px-16 bg-white"
      containerCssAdd="min-h-[100dvh] flex flex-col items-center justify-center gap-4"
    >
      <h1 className="font-bold xl:text-4xl text-3xl w-full text-center">
        Register
      </h1>
      <RegisterForm
        sendData={register}
        className="flex flex-col items-center gap-4 "
      />
      <Link to="/login" className="px-4 py-1 rounded-md underline text-center">
        Already have an account? Login.
      </Link>
    </Container>
  );
};

export default RegisterPage;
