import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginArgs } from "./LoginForm";
import Button from "../reusable/Button";

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
          minLength={3}
          maxLength={20}
          type="text"
          id="username"
          placeholder=""
          className="w-full border-black border-[1px] rounded-md p-1"
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
          className="w-full border-black border-[1px] rounded-md p-1"
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
          className="w-full border-black border-[1px] rounded-md p-1"
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          value={confirmNewPassword}
          required
        />
      </div>
      <div className="flex justify-between">
        <Button
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
          style="DANGER"
        >
          Cancel
        </Button>
        <Button type="submit">Change</Button>
      </div>
    </form>
  );
};

export default EditAuthForm;
