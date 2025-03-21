import { useNavigate } from "react-router-dom";
import { destroySession } from "../../services/session";
import Button from "../reusable/Button";
import H1 from "../reusable/h/H1";

const Options = () => {
  const navigate = useNavigate();
  return (
    <>
      <H1>Options</H1>
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
