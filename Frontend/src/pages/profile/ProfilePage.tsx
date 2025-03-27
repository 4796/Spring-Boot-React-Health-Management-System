import { useOutletContext } from "react-router-dom";
import Container from "../../components/reusable/Container";
import Options from "../../components/profile_page/Options";
import YourProfile from "../../components/profile_page/YourProfile";
import { All } from "../../roles/All";

const ProfilePage = () => {
  const globalParams: { user: All } = useOutletContext();
  return (
    <Container>
      <div className="flex flex-col ">
        {globalParams.user.getRole() !== "ROLE_ADMIN" && <YourProfile />}
        <Options />
      </div>
    </Container>
  );
};

export default ProfilePage;
