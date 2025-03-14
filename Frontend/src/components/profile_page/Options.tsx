import { useNavigate } from "react-router-dom";
import { destroySession } from "../../services/session";
import Button from "../reusable/Button";

const Options = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1 className="text-4xl text-sky-700 font-bold my-4">Options</h1>
      <div className="flex flex-col  gap-2">
        <div>
          <Button
            onClick={(e) => {
              e.preventDefault();
              navigate("/change-credentials");
            }}
          >
            Change Login Credentials
          </Button>
        </div>
        <div>
          <Button onClick={destroySession} style="DANGER">
            Logout
          </Button>
        </div>
      </div>
    </>
  );
};

export default Options;
