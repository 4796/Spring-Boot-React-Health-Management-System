import Container from "../components/Container";
import { destroySession } from "../services/session";

const ProfilePage = () => {
  return (
    <Container styleCssOverride=" ">
      <div>ProfilePage</div>
      <button
        onClick={destroySession}
        className="bg-red-600 text-white px-4 py-1 rounded-md"
      >
        Logout
      </button>
    </Container>
  );
};

export default ProfilePage;
