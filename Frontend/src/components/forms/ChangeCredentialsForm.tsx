import { FormEvent, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { LoginArgs } from "./LoginForm";
import Button from "../reusable/Button";
import { toast } from "react-toastify";
import confirmToast from "../reusable/ConfirmToast";

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
  const globalParams: {
    setBlockingOverlay: React.Dispatch<React.SetStateAction<boolean>>;
  } = useOutletContext();

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      toast.error(
        "New Password and Confirm New Password fields must be the same!"
      );
      return;
    }

    globalParams.setBlockingOverlay(true);
    confirmToast(
      "Are you sure you want to apply these changes?",
      () => {
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
        globalParams.setBlockingOverlay(false);
      },
      () => {
        globalParams.setBlockingOverlay(false);
      }
    );
  };

  return (
    <form onSubmit={submitForm} className={className}>
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
        <Button type="submit">Change</Button>
      </div>
    </form>
  );
};

export default EditAuthForm;
