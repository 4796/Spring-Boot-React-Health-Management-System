import {
  Link,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import Container from "../components/reusable/Container";
import { Role } from "../services/auth";
import YourProfile from "../components/profile_page/YourProfile";
import { All } from "../roles/All";
import { getToken } from "../services/session";
import { Admin } from "../roles/Admin";
import { Doctor } from "../roles/Doctor";
import { Patient } from "../roles/Patient";
import Button from "../components/reusable/Button";
import H1 from "../components/reusable/h/H1";

const UserPage = () => {
  const { id, role } = useParams<{ id: string; role: Role }>();
  const { user }: { user: Admin } = useOutletContext();
  const navigate = useNavigate();
  let userObj: All | null = null;
  switch (role) {
    case "ROLE_PATIENT":
      userObj = new Patient(id ? id : "", getToken());
      break;
    case "ROLE_DOCTOR":
      userObj = new Doctor(id ? id : "", getToken());
      break;
    case "ROLE_ADMIN":
      userObj = new Admin(id ? id : "", getToken());
      break;
    default:
      userObj = new Patient(id ? id : "", getToken());
  }
  return (
    <Container>
      <div className="flex flex-col">
        <H1>User Profile</H1>
        <YourProfile user={userObj} />

        <H1>Edit Account</H1>
        <div className="flex flex-col  gap-2">
          {role === "ROLE_DOCTOR" && (
            <Link to={`/users/ROLE_DOCTOR/${id}/edit`} className="block">
              <Button>Change Salary</Button>
            </Link>
          )}
          <div>
            <Button
              onClick={() => {
                if (confirm("Are you sure you want to delete this account?")) {
                  user.deleteUser(id ? id : "");
                  navigate(-1);
                }
              }}
              style="DANGER"
            >
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default UserPage;
