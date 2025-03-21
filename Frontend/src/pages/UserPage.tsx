import { Link, useParams } from "react-router-dom";
import Container from "../components/reusable/Container";
import { Role } from "../services/auth";
import YourProfile from "../components/profile_page/YourProfile";
import { All } from "../roles/All";
import { getToken } from "../services/session";
import { Admin } from "../roles/Admin";
import { Doctor } from "../roles/Doctor";
import { Patient } from "../roles/Patient";
import Button from "../components/reusable/Button";

const UserPage = () => {
  const { id, role } = useParams<{ id: string; role: Role }>();
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
      <div className="flex flex-col gap-4">
        <YourProfile user={userObj} />
        {role === "ROLE_DOCTOR" && (
          <Link to={`/users/ROLE_DOCTOR/${id}/edit`}>
            <Button>Change Salary</Button>
          </Link>
        )}
      </div>
    </Container>
  );
};

export default UserPage;
