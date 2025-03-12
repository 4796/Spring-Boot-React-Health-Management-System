import { FormEvent, useState } from "react";
import { LoginResponse, RegisterResponse, Role } from "../services/auth";
import { RegisterArgs } from "./RegisterForm";
import { useNavigate, useOutletContext } from "react-router-dom";
import { getToken } from "../services/session";
import { LoginArgs } from "./LoginForm";

const EditAuthForm = ({
  sendData,
  oldUsername,
  className,
}: {
  sendData: (
    args: LoginArgs,
    id: string,
    token: string
  ) => Promise<LoginResponse | null>;
  oldUsername: string;
  className?: string;
}) => {
  const [username, setUsername] = useState<string>(oldUsername);
  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
  const globalParams: { id: string; role: Role } = useOutletContext();

  const navigate = useNavigate();
  // submiting

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      alert("New Password and Confirm New Password fields must be the same!");
      return;
    }
    if (confirm("Are you sure you want to apply these changes?")) {
      const data: LoginArgs = {
        username,
        password,
      };
      sendData(data, globalParams.id, getToken());
      navigate(-1);
    }
  };

  return (
    <form onSubmit={submitForm} className={className}>
      <div>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          id="username"
          placeholder="Username"
          className="w-full border-black border-[1px] rounded-md p-1"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Current Password: </label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="w-full border-black border-[1px] rounded-md p-1"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
      </div>
      <div>
        <label htmlFor="newPassword">New Password: </label>
        <input
          type="password"
          id="newPassword"
          placeholder="New Password"
          className="w-full border-black border-[1px] rounded-md p-1"
          onChange={(e) => setNewPassword(e.target.value)}
          value={newPassword}
          required
        />
      </div>
      <div>
        <label htmlFor="newPasswordConfirm">Confirm New Password: </label>
        <input
          type="password"
          id="newPasswordConfirm"
          placeholder="Confirm New Password"
          className="w-full border-black border-[1px] rounded-md p-1"
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          value={confirmNewPassword}
          required
        />
      </div>
      <div className="flex justify-between">
        <button
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
          className="bg-red-600 text-white px-4 py-1 rounded-md"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-sky-600 text-white px-4 py-1 rounded-md"
        >
          Change
        </button>
      </div>
    </form>
  );
};

export default EditAuthForm;
