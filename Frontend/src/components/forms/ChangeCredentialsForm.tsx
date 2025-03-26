import { FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginArgs } from "./LoginForm";
import Button from "../reusable/Button";
import { toast } from "react-toastify";

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

  const formRef = useRef<HTMLFormElement>(null);
  const handleManualSubmit = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

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
    <form ref={formRef} onSubmit={submitForm} className={className}>
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
        <div>
          <Button type="submit" confirm={true} onClick={handleManualSubmit}>
            Change
          </Button>
        </div>
      </div>
    </form>
  );
};

export default EditAuthForm;
