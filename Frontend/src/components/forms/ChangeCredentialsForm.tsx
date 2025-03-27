import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginArgs } from "./LoginForm";

import { toast } from "react-toastify";
import MyForm from "../reusable/forms/MyForm";

const EditAuthForm = ({
  sendData,
  className,
}: {
  sendData: (args: LoginArgs) => Promise<boolean>;

  className?: string;
}) => {
  const [username, setUsername] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
  const navigate = useNavigate();

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      toast.error(
        "New Password and Confirm New Password fields must be the same!"
      );
      return;
    }
    const data: LoginArgs = {
      username,
      password: newPassword,
    };
    sendData(data).then((d) => {
      if (d) {
        toast.success("Login credentials changed successfully.");
        navigate(-1);
      } else {
        toast.error("Invalid username.");
      }
    });
  };

  return (
    <MyForm submitText="Change" onSubmit={submitForm} className={className}>
      <div>
        <label htmlFor="username">New Username: </label>
        <input
          minLength={3}
          maxLength={20}
          type="text"
          autoCapitalize="none"
          id="username"
          placeholder=""
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          required
        />
      </div>
      <div>
        <label htmlFor="newPassword">New Password: </label>
        <input
          minLength={3}
          type="password"
          id="newPassword"
          placeholder=""
          onChange={(e) => setNewPassword(e.target.value)}
          value={newPassword}
          required
        />
      </div>
      <div>
        <label htmlFor="newPasswordConfirm">Confirm New Password: </label>
        <input
          minLength={3}
          type="password"
          id="newPasswordConfirm"
          placeholder=""
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          value={confirmNewPassword}
          required
        />
      </div>
    </MyForm>
  );
};

export default EditAuthForm;
