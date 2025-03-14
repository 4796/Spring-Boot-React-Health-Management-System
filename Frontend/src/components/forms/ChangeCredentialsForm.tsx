import { FormEvent, useState } from "react";

import { useNavigate, useOutletContext } from "react-router-dom";
import { getToken } from "../../services/session";
import { LoginArgs } from "./LoginForm";
import { All } from "../../roles/All";

const EditAuthForm = ({
  sendData,
  className,
}: {
  sendData: (args: LoginArgs) => Promise<boolean>;

  className?: string;
}) => {
  const globalParams: { user: All } = useOutletContext();
  const [username, setUsername] = useState<string>("");

  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");

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
        password: newPassword,
      };

      sendData(data);
      navigate(-1);
    }
  };

  return (
    <form onSubmit={submitForm} className={className}>
      <div>
        <label htmlFor="username">New Username: </label>
        <input
          type="text"
          id="username"
          placeholder="New Username"
          className="w-full border-black border-[1px] rounded-md p-1"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
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
          type="button"
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
