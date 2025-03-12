import { Link, useNavigate } from "react-router-dom";
import Container from "../components/Container";
import LoginForm from "../components/LoginForm";
import { login } from "../services/auth";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { isLoggedIn } from "../services/session";

const LoginPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  useEffect(() => {
    // redirect user if already logged in
    if (isLoggedIn()) navigate(-1);
    setLoading(false);
  }, []);
  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <Container
      styleCssOverride="xl:px-32 px-16 bg-white"
      containerCssAdd="min-h-[100vh] flex flex-col items-center justify-center gap-4"
    >
      <h1 className="font-bold xl:text-4xl text-3xl w-full text-center">
        Login
      </h1>
      <LoginForm
        sendData={login}
        className="flex flex-col items-center gap-4 "
      />
      <Link
        to="/register"
        className="px-4 py-1 rounded-md underline text-center"
      >
        Don't have an account? Register.
      </Link>
    </Container>
  );
};

export default LoginPage;
