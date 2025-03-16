import { useParams } from "react-router-dom";
import Container from "../components/reusable/Container";
import { Role } from "../services/auth";
import YourProfile from "../components/profile_page/YourProfile";
import { All } from "../roles/All";
import { getToken } from "../services/session";
import { Admin } from "../roles/Admin";
import { Doctor } from "../roles/Doctor";
import { Patient } from "../roles/Patient";

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
      </div>
    </Container>
  );
};

export default UserPage;
