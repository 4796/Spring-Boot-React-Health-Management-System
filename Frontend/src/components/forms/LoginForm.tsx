import { FormEvent, useRef, useState } from "react";
import { LoginResponse } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import { startSession } from "../../services/session";
import Button from "../reusable/Button";
import { toast, ToastContainer } from "react-toastify";

export type LoginArgs = { username?: string; password?: string };
const LoginForm = ({
  sendData,
  className,
}: {
  sendData: (args: LoginArgs) => Promise<LoginResponse | null>;
  className?: string;
}) => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = { username, password };
    sendData(data).then((result: LoginResponse | null) => {
      if (result) {
        if (result.status === "SUCCESS") {
          toast.success("Logged in successfully.");
          navigate("/");
          startSession(result.token, result.role, result.id);
          console.log(result);
        } else {
          toast.error("Invalid credentials.");
          // setUsername("");
          // setPassword("");
          usernameRef.current?.focus();
        }
      } else {
        toast.error("Can't login.");
      }
    });
  };

  return (
    <form onSubmit={submitForm} className={className}>
      <ToastContainer />
      <input
        minLength={3}
        maxLength={20}
        autoCapitalize="none"
        type="text"
        id="username"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        ref={usernameRef}
      />

      <input
        minLength={3}
        type="password"
        id="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <Button type="submit">Login</Button>
    </form>
  );
};

export default LoginForm;
