import { FormEvent, useState } from "react";
import { LoginResponse } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { startSession } from "../services/session";

export type LoginArgs = { username: string; password: string };
const LoginForm = ({
  sendData,
  className,
}: {
  sendData: (args: LoginArgs) => Promise<LoginResponse | null>;
  className?: string;
}) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = { username, password };
    sendData(data).then((result: LoginResponse | null) => {
      if (result) {
        if (result.status === "SUCCESS") {
          navigate("/");
          startSession(result.token, result.role, result.id);
          console.log(result);
        } else {
          alert("Invalid credentials.");
          setUsername("");
          setPassword("");
        }
      } else {
        console.error("Can't login.");
      }
    });
  };

  return (
    <form onSubmit={submitForm} className={className}>
      <input
        type="text"
        id="username"
        placeholder="Username"
        className="w-full border-black border-[1px] rounded-md p-1"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />

      <input
        type="password"
        id="password"
        placeholder="Password"
        className="w-full border-black border-[1px] rounded-md p-1"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <button
        type="submit"
        className="bg-sky-600 text-white px-4 py-1 rounded-md"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
